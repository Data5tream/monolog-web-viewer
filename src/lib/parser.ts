import { components, logData, rawData } from './store';
import { get } from 'svelte/store';

export interface LogEntry {
  timestamp: number,
  component: string,
  level: string,
  message: string,
  context: string
}


export interface Filter {
  name: string,
  active: boolean
}


/**
 * Parse a monolog log file
 *
 * @param {string} txt
 */
export const parseLog = (txt: string) => {
  const regex = /\[(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+\+\d{2}:\d{2})]\W(\w+)\.(\w+):\W(.*)\[(.*)]/gm;

  const log: Array<LogEntry> = [];
  const comps = [];

  txt.split('\n').forEach(entry => {
    let m;

    while ((m = regex.exec(entry)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      log.push({
        timestamp: Date.parse(m[1]),
        component: m[2],
        level: m[3],
        message: m[4],
        context: m[5],
      });
      comps.push(m[2]);
    }
  });

  components.set([...new Set(comps)].map(name => ({ name, active: true })));

  rawData.set(log);
  logData.set(log);
};


/**
 * Update filtered data
 */
export const updateFilteredData = () => {
  // Get an array with the names of currently active filters
  const activeComponents: Array<string> = get(components)
    .filter((comp) => comp.active)
    .map(comp => comp.name);

  // Only include data from active filters
  const filteredLogs = get(rawData).filter((entry) => activeComponents.includes(entry.component));

  logData.set(filteredLogs);
};


/**
 * Update the components filter store
 *
 * @param {string} name
 * @param {boolean} active
 */
export const setFilter = (name: string, active: boolean) => {
  components.update(comps => {
    let newComps = [];
    comps.forEach(comp => {
      if (comp.name === name) {
        comp.active = active;
      }
      newComps.push(comp);
    });

    return newComps;
  });
};

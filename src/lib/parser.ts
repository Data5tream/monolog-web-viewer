import { components, levels, logData, rawData } from './store';
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
  const lvls = [];

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
      lvls.push(m[3]);
    }
  });

  components.set([...new Set(comps)].map(name => ({ name, active: true })));
  levels.set([...new Set(lvls)].map(name => ({ name, active: true })));

  rawData.set(log);
  logData.set(log);
};


/**
 * Update filtered data
 */
export const updateFilteredData = () => {
  // Get an array with the names of currently active filters
  const getActiveFilterNames = (filters) => filters.filter((f) => f.active).map((f) => f.name);

  const activeComponents: Array<string> = getActiveFilterNames(get(components));
  const activeLevels: Array<string> = getActiveFilterNames(get(levels));

  // Only include data from active filters
  const filteredLogs = get(rawData).filter((entry) =>
    activeComponents.includes(entry.component) && activeLevels.includes(entry.level));

  logData.set(filteredLogs);
};


/**
 * Update the components filter store
 *
 * @param {string} filter
 * @param {string} name
 * @param {boolean} active
 */
export const setFilter = (filter: string, name: string, active: boolean) => {
  const updateFilter = (filters) => {
    let newFilters = [];
    filters.forEach(filter => {
      if (filter.name === name) {
        filter.active = active;
      }
      newFilters.push(filter);
    });

    return newFilters;
  }

  if (filter === 'components') {
    components.update(updateFilter);
  } else if (filter === 'levels') {
    levels.update(updateFilter);
  }
};

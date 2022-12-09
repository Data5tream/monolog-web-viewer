import { writable } from 'svelte/store';

import { Filter, LogEntry } from './parser';

export const rawData = writable([] as Array<LogEntry>);
export const logData = writable([] as Array<LogEntry>);
export const components = writable([] as Array<Filter>);
export const levels = writable([] as Array<Filter>);

export const popup = writable({
  isVisible: false,
  logEntry: undefined,
} as { isVisible: boolean, logEntry: LogEntry});

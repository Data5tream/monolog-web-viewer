import { writable } from 'svelte/store';

import { Filter, LogEntry } from './parser';

export const rawData = writable([] as Array<LogEntry>);
export const logData = writable([] as Array<LogEntry>);
export const components = writable([] as Array<Filter>);

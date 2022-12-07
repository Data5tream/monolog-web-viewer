import { writable } from 'svelte/store';

import { LogEntry } from './parser';

export const logData = writable([] as Array<LogEntry>);

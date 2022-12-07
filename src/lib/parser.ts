import { logData } from './store';

export interface LogEntry {
    timestamp: number,
    component: string,
    level: string,
    message: string,
    context: string
}


/**
 * Parse a monolog log file
 *
 * @param {string} txt
 */
export const parseLog = (txt: string) => {
    const regex = /\[(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+\+\d{2}:\d{2})]\W(\w+)\.(\w+):\W(.*)\[(.*)]/gm;

    const log: Array<LogEntry> = [];

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
        }
    })

    logData.set(log);
}

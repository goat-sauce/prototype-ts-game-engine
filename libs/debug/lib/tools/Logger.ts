/* eslint no-console: 0 */

export const Logger = {
    normalize: (message: any): string => {
        return JSON.parse(JSON.stringify(message))
    },
    log(message?: any, ...optionalParams: any[]): void {
        console.log(Logger.normalize(message), ...Logger.normalize(optionalParams))
    },
    info(message?: any, ...optionalParams: any[]): void {
        console.info(Logger.normalize(message), ...Logger.normalize(optionalParams))
    },
    warn(message?: any, ...optionalParams: any[]): void {
        console.warn(Logger.normalize(message), ...Logger.normalize(optionalParams))
    },
    error(message?: any, ...optionalParams: any[]): void {
        console.error(Logger.normalize(message), ...Logger.normalize(optionalParams))
    }
}

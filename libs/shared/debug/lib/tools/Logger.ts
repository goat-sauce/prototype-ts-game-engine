/* eslint no-console: 0 */

export const Logger = {
    normalize: (message: any): string => {
        return JSON.stringify(message)
    },
    log(message?: any, ...optionalParams: any[]): void {
        console.log(message, ...optionalParams)
    },
    info(message?: any, ...optionalParams: any[]): void {
        console.info(message, ...optionalParams)
    },
    warn(message?: any, ...optionalParams: any[]): void {
        console.warn(message, ...optionalParams)
    },
    error(message?: any, ...optionalParams: any[]): void {
        console.error(message, ...optionalParams)
    }
}

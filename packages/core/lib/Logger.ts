export class Logger {
  log(message?: any, ...optionalParams: any[]) {
    console.log(message, ...optionalParams)
  }
  error(message?: any, ...optionalParams: any[]) {
    console.log(message, ...optionalParams)
  }
}

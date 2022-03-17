export enum LogLevel {
  SEVERE = 'SEVERE',
  ERROR = ' ERROR',
  WARN = '  WARN',
  INFO = '  INFO',
  DEBUG = ' DEBUG',
}

export const logtime = () => new Date().toISOString().substring(11, 19)

export const log = (level: LogLevel, message: string) =>
  console.log(`${logtime()} ${level} ${message}`)

export const info = (message: string) => log(LogLevel.INFO, message)
export const warn = (message: string) => log(LogLevel.WARN, message)
export const error = (message: string) => log(LogLevel.ERROR, message)

const LogService = {
  LogLevel,
  logtime,
  log,
  info,
  warn,
  error,
}

export default LogService

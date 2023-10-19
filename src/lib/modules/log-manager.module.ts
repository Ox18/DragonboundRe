import log4js from "log4js"

log4js.configure({
  appenders: {
    file: { type: 'file', filename: 'logs/app.log' },
    console: { type: 'console' }
  },
  categories: {
    default: { appenders: ['file', 'console'], level: 'debug' }
  }
});

export const logManager = (name: string): log4js.Logger => {
    return log4js.getLogger(`[${name}]`);
}
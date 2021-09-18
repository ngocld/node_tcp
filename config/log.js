var log4js = require('log4js')

log4js.configure({
    appenders: {
        everything: {
            type: 'dateFile',
            filename: 'logs/all.log',
            maxLogSize: 31457280,
            backups: 30,
            compress: false
        }
    },
    categories: {
        default: {
            appenders: ['everything'],
            level: 'debug'
        }
    }
})

const logger = log4js.getLogger()
logger.level = 'debugs'

module.exports = {
    mylog: logger
}
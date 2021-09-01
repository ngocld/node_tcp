var net = require('net')
var fs = require('fs');
var deasync = require('deasync');
var log4js = require('log4js')

log4js.configure({
    appenders: {
        everything: {
            type: 'dateFile',
            filename: 'logs/all.log',
            maxLogSize: 10485760,
            backups: 30,
            compress: true
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

const socketSes = {
    connnect: false
}

const CheckService = (host, port) => {
    var done = false;

    var client = new net.Socket();
    console.log('Try to connect ' + host + ':' + port);
    client.setTimeout(3000)
    client.connect(port, host, function () {
        console.log('success');
        client.destroy();
        done = true
        socketSes.connnect = true
    });

    client.on('error', function (error) {
        if (error) {
            console.log('socket error')
            done = true
            socketSes.connnect = false
        }
    });

    client.on('timeout', () => {
        console.log('socket timeout');
        client.destroy();
        done = true
        socketSes.connnect = false
    });

    deasync.loopWhile(function () {
        return !done
    });
}

module.exports = {
    CheckService,
    socketSes,
    logger
}
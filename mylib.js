var net = require('net')
var fs = require('fs');
var deasync = require('deasync');
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

const ShowData = (responseData, view) => {
    let final = ''
    if (view == 'short')
    {
        final += `Running ${responseData.socket.running}\n`
        final += `Stopped ${responseData.socket.topped}\n`
    }

    else{
        final += `Running ${responseData.socket.running}\n`
        final += `Stopped ${responseData.socket.topped}\n\n`
        responseData.target.forEach(item => {
            final += `${item.socket} ${item.service} > ${item.connect}\n`
        })
    }

    return final
}

module.exports = {
    CheckService,
    socketSes,
    logger,
    ShowData
}
var net = require('net')
var deasync = require('deasync');

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
    if (view == 'short')
    {
        return responseData.socket
    }

    else{
        return responseData
    }

    return responseData
}

module.exports = {
    CheckService,
    socketSes,
    ShowData
}
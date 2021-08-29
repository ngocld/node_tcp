var net = require('net')
var fs = require('fs');

const lsService = JSON.parse(fs.readFileSync('./app-data/service.json', 'utf8'));

const CheckService = (host, port) => {
    var client = new net.Socket();

    client.setTimeout(3000)

    client.connect(port, host, function () {
        console.log('CONNECTED TO: ' + host + ':' + port);
        client.destroy();
    });

    client.on('error', function (error) {
        if (error) {
            console.log('Socket error');
        }
    });

    client.on('timeout', () => {
        console.log('socket timeout');
        client.destroy();
    });
}

const CheckService1 = async (host, port) => {
    var client = new net.Socket();

    client.setTimeout(3000)

    client.connect(port, host, async function () {
        console.log('CONNECTED TO: ' + host + ':' + port);
        client.destroy();
        return true
    });

    client.on('error', async function (error) {
        if (error) {
            console.log('Socket error')
            return false
        }
    });

    client.on('timeout', async () => {
        console.log('socket timeout');
        client.destroy();
        return false
    });
}

module.exports = {
    CheckService,
    lsService,
    CheckService1
}
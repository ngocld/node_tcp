var net = require('net');

var lsService = [{
        host: 'vnexpress.net',
        port: 443
    },
    {
        host: 'google.com',
        port: 443
    },
    {
        host: 'zingnews.vn',
        port: 443
    },
    {
        host: 'thanhnien.vn',
        port: 443
    },
    {
        host: 'tuoitre.vn',
        port: 443
    },
]

const CheckService = (host, port) => {
    var client = new net.Socket();
    
    client.connect(port, host, function () {
        console.log('CONNECTED TO: ' + host + ':' + port);
        client.destroy();
    });

    client.on('error', function (error) {
        if (error) {
            console.log('Socket error');
        }
    });
}

lsService.forEach(item => {
    console.log(`Try to connect ${item.host}:${item.port}`);
    CheckService(item.host, item.port)
})
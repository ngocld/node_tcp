var net = require('net');
const sleep = require('sleep-promise');


var HOST = 'vnexpress.net';
var PORT = 443;

var global = {
    connected : null
}

function info() {
    var client = new net.Socket();

    client.connect(PORT, HOST, function (data) {
        console.log('CONNECTED TO: ' + HOST + ':' + PORT)
        global.connected = true
        client.destroy()
        
    });

    client.on('error', function (error) {
        if (error) {
            console.log('Socket error');
            global.connected = false
        }
    });
}

info()

async function info1 () {
    console.log("This prints immediately");
    await sleep(2000);
    console.log("This prints 2 seconds later");
    console.log(global.connected);
};

info1()



// var client = new net.Socket();

// client.connect(PORT, HOST, function (data) {
//     console.log('CONNECTED TO: ' + HOST + ':' + PORT);
//     console.log(data);
//     client.destroy();
// });

// client.on('error', function (error) {
//     if (error) {
//         console.log('Socket error');
//     }
// });
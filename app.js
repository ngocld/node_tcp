var mylib = require('./mylib')
var express = require('express')
var net = require('net')
var deasync = require('deasync')

let result
const CheckService = (host, port) => {
    var done = false;

    var client = new net.Socket();
    console.log('Try to connect ' + host + ':' + port);
    client.setTimeout(3000)
    client.connect(port, host, function () {
        console.log('success');
        client.destroy();
        done = true
        result = true
    });

    client.on('error', function (error) {
        if (error) {
            console.log('socket error')
            done = true
            result = false
        }
    });

    client.on('timeout', () => {
        console.log('socket timeout');
        client.destroy();
        done = true
        result = false
    });

    deasync.loopWhile(function () {
        return !done
    });
}


// App
const port = 8080
const host = '0.0.0.0'
const app = express()

app.listen(port, host)
console.log(`starting service http://${host}:${port}`);

app.get('/check-service', (req, res) => {
    res.contentType = 'text/plain;charset=utf-8'
    var final = ''

    mylib.lsService.forEach(item => {
        CheckService(item.host, item.port)
        final += `${item.host}:${item.host} -> ${result} \n`
    })

    res.send(final)
})

app.get('/check-service-sum', (req, res) => {
    let temp = ''
    let success = 0
    let fails = 0

    mylib.lsService.forEach(item => {
        CheckService(item.host, item.port)
        if (result === true)
            success++
        else
            fails++

        temp += `${item.host}:${item.host} -> ${result} \n`
    })

    let final = `success ${success} \n fails ${fails} \n\n`
    final = final + temp
    res.contentType = 'text/plain;charset=utf-8'
    res.send(final)
})
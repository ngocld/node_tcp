var mylib = require('./mylib')
var express = require('express')
var basicAuth = require('express-basic-auth')
const { fromIp, host, port, services, users} = require('./config');


const app = express()

console.log(`starting service http://${host}:${port}`)
mylib.logger.info(`starting service http://${host}:${port}`)

app.use(basicAuth({
    users: users
}))

app.get('/check-service', (req, res) => {
    mylib.logger.info(req.url)
    res.contentType = 'text/plain;charset=utf-8'
    var final = ''

    services.forEach(item => {
        mylib.CheckService(item.host, item.port)
        final += `${fromIp} -> ${item.host}:${item.port} (${item.system}): ${mylib.socketSes.connnect} \n`
    })

    res.send(final)
})

app.get('/check-service-sum', (req, res) => {
    mylib.logger.info(req.url)
    let temp = ''
    let success = 0
    let fails = 0

    services.forEach(item => {
        mylib.CheckService(item.host, item.port)
        if (mylib.socketSes.connnect === true)
            success++
        else
            fails++

        temp += `${fromIp} -> ${item.host}:${item.port} (${item.system}): ${mylib.socketSes.connnect} \n`
    })

    let final = `success ${success} \n fails ${fails} \n\n`
    final = final + temp
    res.contentType = 'text/plain;charset=utf-8'
    res.send(final)
})

app.listen(port, host)
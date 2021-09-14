var mylib = require('./mylib')
var express = require('express')
var basicAuth = require('express-basic-auth')
var dateFormat = require('dateformat');
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
        final += `${item.host}:${item.port} (${item.system}): ${mylib.socketSes.connnect === true ? "ok" : "down"} \n`
    })

    let now = dateFormat(new Date(), "HHgMM dd/mm");
    final += `(${now})\n`

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

        temp += `${item.host}:${item.port} (${item.system}) ${mylib.socketSes.connnect === true ? "ok" : "down"} \n`
    })

    let now = dateFormat(new Date(), "HHgMM dd/mm");
    let final = `Running ${success}/${success + fails} \n Stopped ${fails}\n--------------------\n`
    final = final + temp + `(${now})`
    res.contentType = 'text/plain;charset=utf-8'
    res.send(final)
})

app.listen(port, host)
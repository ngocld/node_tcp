var mylib = require('./mylib')
var express = require('express')
const basicAuth = require('express-basic-auth')

// App
const port = 8080
const host = '0.0.0.0'
const app = express()

app.listen(port, host)
console.log(`starting service http://${host}:${port}`);

app.use(basicAuth({
    users: {
        'ngocld': 'ngocld',
        'hlv': 'ilovehanwha'
    }
}))


app.get('/check-service', (req, res) => {
    mylib.logger.info(req.url)
    res.contentType = 'text/plain;charset=utf-8'
    var final = ''

    mylib.lsService.forEach(item => {
        mylib.CheckService(item.host, item.port)
        final += `${item.system} ${item.group} ${item.host}:${item.host} -> ${mylib.socketSes.connnect} \n`
    })

    res.send(final)
})

app.get('/check-service-sum', (req, res) => {
    mylib.logger.info(req.url)
    let temp = ''
    let success = 0
    let fails = 0

    mylib.lsService.forEach(item => {
        mylib.CheckService(item.host, item.port)
        if (mylib.socketSes.connnect === true)
            success++
        else
            fails++

        temp += `${item.group} ${item.system} ${item.host}:${item.host} -> ${mylib.socketSes.connnect} \n`
    })

    let final = `success ${success} \n fails ${fails} \n\n`
    final = final + temp
    res.contentType = 'text/plain;charset=utf-8'
    res.send(final)
})
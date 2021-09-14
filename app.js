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



app.get('/check-service/', (req, res) => {
    mylib.logger.info(req.url)

    let query = req.query['query'] === undefined ? "" : req.query['query']
    let view = req.query['view']

    // Get list service from query
    let arr = query.split(',')

    let service1 = []
    services.forEach(item => {
        if (query == '')
            service1.push(item)
        else {
            if (arr.includes(item.id.toString()))
            service1.push(item)
        }
    })

    if (service1.length == 0)
    {
        res.send("Dont't find service")
        return
    }

    // Get Result
    let now = dateFormat(new Date(), "HHgMM dd/mm");
    let success = 0
    let fails = 0
    let responseData = {
        socket: {
            running: 0,
            topped: 0,
            uptime: now,
            from: fromIp,
        },
        target: []
    }

    let socketName = ''
    let socketConnect = ''
    service1.forEach(item => {
        mylib.CheckService(item.host, item.port)
        if (mylib.socketSes.connnect === true)
            success++
        else
            fails++

        socketName = `${item.host}:${item.port}`
        socketConnect = `${mylib.socketSes.connnect === true ? "ok" : "down"}`
        responseData.target.push({id: item.id, service: item.system, socket: socketName, connect: socketConnect})
    })

    responseData.socket.running = success;
    responseData.socket.topped = fails;
    
    // Show data
    let final = mylib.ShowData(responseData, view)
    res.send(final)
})

app.get('/check-all', (req, res) => {
    mylib.logger.info(req.url)
    let now = dateFormat(new Date(), "HHgMM dd/mm");
    let success = 0
    let fails = 0
    let responseData = {
        socket: {
            running: 0,
            topped: 0,
            uptime: now,
            from: fromIp,
        },
        target: []
    }

    let socketName = ''
    let socketConnect = ''
    services.forEach(item => {
        mylib.CheckService(item.host, item.port)
        if (mylib.socketSes.connnect === true)
            success++
        else
            fails++

        socketName = `${item.host}:${item.port}`
        socketConnect = `${mylib.socketSes.connnect === true ? "ok" : "down"}`
        responseData.target.push({id: item.id, service: item.system, socket: socketName, connect: socketConnect})
    })

    responseData.socket.running = success;
    responseData.socket.topped = fails;
    
    res.json(responseData)
})

app.listen(port, host)


/*
{
    
}
*/
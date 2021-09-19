var express = require('express')
var basicAuth = require('express-basic-auth')
var dateFormat = require('dateformat');
const mylib = require('./../mylib')
const {
    fromIp,
    host,
    port,
    services,
    users,
    mylog,
    getSocket,
    getSocketAll
} = require('./../config');

const app = express()

console.log(`starting service http://${host}:${port}`)
mylog.info(`starting service http://${host}:${port}`)

app.use(basicAuth({
    users: users
}))

app.get('/check-all', (req, res) => {
    mylog.info(req.url)
    let view = req.query['v'] === undefined ? "" : req.query['v']

    getSocketAll()

    let now = dateFormat(new Date(), "HHgMM dd/mm");
    let success = 0
    let fails = 0
    let responseData = {
        socket: {
            app: 'all',
            running: 0,
            topped: 0,
            uptime: now,
            from: fromIp,
        },
        target: []
    }

    let socketInfo = ''
    let socketConnect = ''
    services.forEach(item => {
        mylib.CheckService(item.host, item.port)
        if (mylib.socketSes.connnect === true)
            success++
        else
            fails++

        socketInfo = `${item.host}:${item.port}`
        socketConnect = `${mylib.socketSes.connnect === true ? "ok" : "down"}`
        responseData.target.push({
            socketName: item.socket,
            socketInfo: socketInfo,
            connect: socketConnect
        })
    })

    responseData.socket.running = success;
    responseData.socket.topped = fails;

    // Show data
    let final = mylib.ShowData(responseData, view)
    res.json(final)
})

app.get('/check-app', (req, res) => {
    let appName = req.query['q'] === undefined ? "" : req.query['q']
    let view = req.query['v'] === undefined ? "" : req.query['v']

    mylog.info(req.url)
    getSocket(appName)

    let now = dateFormat(new Date(), "HHgMM dd/mm");
    let success = 0
    let fails = 0
    let responseData = {
        socket: {
            app: appName,
            running: 0,
            topped: 0,
            uptime: now,
            from: fromIp,
        },
        target: []
    }

    let socketInfo = ''
    let socketConnect = ''

    if (services.length === 0) {
        responseData.socket.app = `App ${responseData.socket.app} is invalid`
    } else {
        services.forEach(item => {
            mylib.CheckService(item.host, item.port)
            if (mylib.socketSes.connnect === true)
                success++
            else
                fails++

            socketInfo = `${item.host}:${item.port}`
            socketConnect = `${mylib.socketSes.connnect === true ? "ok" : "down"}`
            responseData.target.push({
                socketName: item.socket,
                socketInfo: socketInfo,
                connect: socketConnect
            })
        })
    }


    responseData.socket.running = success;
    responseData.socket.topped = fails;

    // Show data
    let final = mylib.ShowData(responseData, view)
    res.json(final)
})



// app.get('/check-service/', (req, res) => {
//     mylog.info(req.url)

//     let query = req.query['query'] === undefined ? "" : req.query['query']
//     let view = req.query['view']

//     // Get list service from query
//     let arr = query.split(',')

//     let service1 = []
//     services.forEach(item => {
//         if (query == '')
//             service1.push(item)
//         else {
//             if (arr.includes(item.id.toString()))
//             service1.push(item)
//         }
//     })

//     if (service1.length == 0)
//     {
//         res.send("Dont't find service")
//         return
//     }

//     // Get Result
//     let now = dateFormat(new Date(), "HHgMM dd/mm");
//     let success = 0
//     let fails = 0
//     let responseData = {
//         socket: {
//             running: 0,
//             topped: 0,
//             uptime: now,
//             from: fromIp,
//         },
//         target: []
//     }

//     let socketInfo = ''
//     let socketConnect = ''
//     service1.forEach(item => {
//         mylib.CheckService(item.host, item.port)
//         if (mylib.socketSes.connnect === true)
//             success++
//         else
//             fails++

//         socketInfo = `${item.host}:${item.port}`
//         socketConnect = `${mylib.socketSes.connnect === true ? "ok" : "down"}`
//         responseData.target.push({id: item.id, service: item.system, socket: socketInfo, connect: socketConnect})
//     })

//     responseData.socket.running = success;
//     responseData.socket.topped = fails;

//     // Show data
//     let final = mylib.ShowData(responseData, view)
//     res.send(final)
// })

app.listen(port, host)

module.exports = {
    api: app
}
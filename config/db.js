// const deasync = require('deasync');
// const knex = require('knex')({
//     client: 'sqlite3',
//     connection: {
//         filename: './../data/socket.sqlite3',
//     },
//     useNullAsDefault: true
// })

// var socketResult = []

// const getSocket = () => {
//     var done = false;
//     knex('socket').select('id', 'host', 'port', 'name as system').then((rows) => {
//         done = true
//         rows.forEach(element => {
//             socketResult.push(element)
//         });
//     })
//     deasync.loopWhile(function () {
//         return !done
//     });
// }

// module.exports = {
//     socketResult: socketResult,
//     getSocket: getSocket
// }
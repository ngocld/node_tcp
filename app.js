// enable app
const app = require('./api/api')


// const knex = require('knex')({
//   client: 'sqlite3',
//   connection: {
//     filename: './data/socket.sqlite3',
//   },
//   useNullAsDefault: true
// });


// knex('app')
//     .innerJoin('app_socket', 'app_socket.app_id', '=', 'app.id')
//     .innerJoin('socket', 'socket.id', '=', 'app_socket.socket_id')
//     .select('app.name as AppName', 'socket.name as SocketName', 'socket.host', 'socket.port')
//     .where('app.name', 'search engine')
//     .then((rows) => {
//         console.log(rows);
//   })
const {
  appSetting
} = require("./config/setting");
const {
  mylog
} = require("./config/log");
const fromIp = "10.84.5.43";
const deasync = require('deasync');

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './data/socket.sqlite3',
  },
  useNullAsDefault: true
});


let services = []
const getSocketAll = () => {
  services.length = 0
  var done = false;
  knex('socket')
  .where('active', '1')
  .select('name as socket', 'host', 'port').then((rows) => {
    done = true
    rows.forEach(element => {
      services.push(element)
    });
  })

  deasync.loopWhile(function () {
    return !done
  });
}


const getSocketIp = (Ip) => {
  services.length = 0
  var done = false;
  knex('socket')
  .where('active', '1')
  .andWhere('ip', Ip)
  .orderBy('name', 'asc')
  .select('name as socket', 'host', 'port').then((rows) => {
    done = true
    rows.forEach(element => {
      services.push(element)
    });
  })

  deasync.loopWhile(function () {
    return !done
  });
}

const getSocket = (appName) => {
  services.length = 0
  var done = false;

  knex('app')
    .innerJoin('app_socket', 'app_socket.app_id', '=', 'app.id')
    .innerJoin('socket', 'socket.id', '=', 'app_socket.socket_id')
    .select('app.name as app', 'socket.name as socket', 'socket.host', 'socket.port')
    .where('app.name', appName)
    .andWhere('app.active', '1')
    .andWhere('app_socket.active', '1')
    .orderBy('app_socket.sort', 'asc')
    .then((rows) => {
      done = true
      rows.forEach(element => {
        services.push(element)
      });
    })

  deasync.loopWhile(function () {
    return !done
  });
}




const users = {
  ngocld: "ngocld",
  hlv: "ilovehanwha",
};

module.exports = {
  host: appSetting.host,
  port: appSetting.port,
  fromIp: fromIp,
  services: services,
  users: users,
  mylog: mylog,
  getSocketAll: getSocketAll,
  getSocket : getSocket,
  getSocketIp: getSocketIp
}
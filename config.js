const { appSetting } = require("./config/setting");
const { mylog } = require("./config/log");
const fromIp = "10.84.2.210";
const deasync = require('deasync');


const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './data/socket.sqlite3',
  },
  useNullAsDefault: true
});

let services = []
const getSocket = () => {
    services.length = 0
    var done = false;
    knex('socket').select('id', 'host', 'port', 'name').then((rows) => {
      done = true 
      rows.forEach(element => {
            services.push(element)
        });
    })
    deasync.loopWhile(function () {
        return !done
    });
}

// const services = [{
//     id: 1,
//     host: "svgw.hanwhalife.com.vn",
//     port: 443,
//     system: "svgw"
//   },
//   {
//     id: 2,
//     host: "vnexpress.net",
//     port: 443,
//     system: "vnexpress"
//   },
//   {
//     id: 3,
//     host: "news.zing.vn",
//     port: 443,
//     system: "zing"
//   }
// ];

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
  getSocket: getSocket
}
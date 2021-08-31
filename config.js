// config.js
const dotenv = require('dotenv')
dotenv.config()

const fromIp = '192.168.68.107'

const services = [
  {
      "host": "vnexpress.net",
      "port": 443,
      "system": "news"
  },
  {
      "host": "google.com",
      "port": 443,
      "system": "search"
  },
  {
      "host": "zingnews.vn",
      "port": 443,
      "system": "news"
  },
  {
      "host": "thanhnien.vn",
      "port": 443,
      "system": "news"
  },
  {
      "host": "tuoitre.vn",
      "port": 443,
      "system": "news"
  },
  {
      "host": "facebook.vn",
      "port": 443,
      "system": "news"
  }
]

const users = {
  'ngocld': 'ngocld',
  'hlv': 'ilovehanwha'
}

module.exports = {
  host: process.env.APP_HOST,
  port: process.env.APP_PORT,
  fromIp: fromIp,
  services: services,
  users: users
}
// config.js
const dotenv = require('dotenv')
dotenv.config()

const services = [
  {
      "host": "vnexpress.net",
      "port": 443,
      "system": "news",
      "group": "internet"
  },
  {
      "host": "google.com",
      "port": 443,
      "system": "search",
      "group": "internet"
  },
  {
      "host": "zingnews.vn",
      "port": 443,
      "system": "news",
      "group": "internet"
  },
  {
      "host": "thanhnien.vn",
      "port": 443,
      "system": "news",
      "group": "internet"
  },
  {
      "host": "tuoitre.vn",
      "port": 443,
      "system": "news",
      "group": "internet"
  },
  {
      "host": "facebook.vn",
      "port": 443,
      "system": "news",
      "group": "internet"
  }
]

const users = {
  'ngocld': 'ngocld',
  'hlv': 'ilovehanwha'
}

module.exports = {
  host: process.env.APP_HOST,
  port: process.env.APP_PORT,
  services: services,
  users: users
}
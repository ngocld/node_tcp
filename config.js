// config.js
const dotenv = require('dotenv')
dotenv.config()

const fromIp = '10.84.2.210'

const services = [
  {
      "host": "svgw.hanwhalife.com.vn",
      "port": 443,
      "system": "svgw"
  },
  {
      "host": "10.84.1.135",
      "port": 452,
      "system": "cpo-proxy"
  },
  {
    "host": "10.84.1.135",
    "port": 451,
    "system": "cpo-prod"
  },
  {
    "host": "10.84.1.135",
    "port": 453,
    "system": "cpo-uat"
  },

  {
      "host": "10.84.1.135",
      "port": 453,
      "system": "cms-proxy"
  },

  {
    "host": "10.84.1.115",
    "port": 51516,
    "system": "cms-cpo-prod"
  },

  {
    "host": "10.84.1.115",
    "port": 51517,
    "system": "cms-cpo-api-prod"
  },

  {
    "host": "10.84.1.219",
    "port": 51516,
    "system": "cms-cpo-uat"
  },
  
  {
    "host": "10.84.1.219",
    "port": 51517,
    "system": "cms-cpo-api-uat"
  },

  {
    "host": "10.84.1.135",
    "port": 453,
    "system": "payment-proxy"
  },

  {
    "host": "10.84.1.135",
    "port": 8086,
    "system": "urbox-prod"
  },

  {
    "host": "10.84.5.73",
    "port": 8086,
    "system": "urbox-uat"
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
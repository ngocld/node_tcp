// config.js
const dotenv = require("dotenv");
dotenv.config();

const fromIp = "10.84.2.210";

const services = [
  {
    id: 1,
    host: "svgw.hanwhalife.com.vn",
    port: 443,
    system: "svgw",
  },
  {
    id: 2,
    host: "10.84.1.135",
    port: 452,
    system: "cpo-proxy",
  },
  {
    id: 3,
    host: "10.84.1.135",
    port: 451,
    system: "cpo-prod",
  },
  {
    id: 4,
    host: "10.84.1.135",
    port: 453,
    system: "cpo-uat",
  },
  {
    id: 5,
    host: "10.84.1.238",
    port: 80,
    system: "cpo-epush",
  },
  {
    id: 6,
    host: "10.84.1.105",
    port: 6379,
    system: "cpo-redis-prod",
  },
  {
    id: 7,
    host: "10.84.5.51",
    port: 6379,
    system: "cpo-redis-uat",
  },

  {
    id: 8,
    host: "10.84.1.135",
    port: 453,
    system: "cms-proxy",
  },

  {
    id: 9,
    host: "10.84.1.115",
    port: 51516,
    system: "cms-cpo-prod",
  },

  {
    id: 10,
    host: "10.84.1.115",
    port: 51517,
    system: "cms-cpo-api-prod",
  },

  {
    id: 11,
    host: "10.84.1.219",
    port: 51516,
    system: "cms-cpo-uat",
  },

  {
    id: 12,
    host: "10.84.1.219",
    port: 51517,
    system: "cms-cpo-api-uat",
  },

  {
    id: 13,
    host: "10.84.1.135",
    port: 453,
    system: "payment-proxy",
  },

  {
    id: 14,
    host: "10.84.1.135",
    port: 8086,
    system: "urbox-prod",
  },

  {
    id: 15,
    host: "10.84.5.73",
    port: 8086,
    system: "urbox-uat",
  },
];

const users = {
  ngocld: "ngocld",
  hlv: "ilovehanwha",
};

module.exports = {
  host: process.env.APP_HOST,
  port: process.env.APP_PORT,
  fromIp: fromIp,
  services: services,
  users: users,
};

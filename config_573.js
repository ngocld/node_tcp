// config.js
const dotenv = require("dotenv");
dotenv.config();

const fromIp = "10.84.2.210";

const services = [
  {
    id: 1,
    host: "10.84.5.73",
    port: 80,
    system: "default web site",
  },
  {
    id: 2,
    host: "10.84.5.73",
    port: 444,
    system: "api gateway",
  },
  {
    id: 3,
    host: "10.84.5.73",
    port: 446,
    system: "identity",
  },
  {
    id: 4,
    host: "10.84.5.73",
    port: 8080,
    system: "channel",
  },
  {
    id: 5,
    host: "10.84.5.73",
    port: 450,
    system: "common",
  },
  {
    id: 5,
    host: "10.84.5.73",
    port: 443,
    system: "ebao",
  },
  {
    id: 6,
    host: "10.84.5.73",
    port: 80,
    system: "mcpo-epush",
  },
  {
    id: 7,
    host: "10.84.5.73",
    port: 453,
    system: "mcpo",
  },
  {
    id: 8,
    host: "10.84.5.73",
    port: 448,
    system: "paymentonline",
  },
  {
    id: 8,
    host: "10.84.5.73",
    port: 449,
    system: "premiumCollection",
  },
  {
    id: 8,
    host: "10.84.5.73",
    port: 8086,
    system: "urbox",
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

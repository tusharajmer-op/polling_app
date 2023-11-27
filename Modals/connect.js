const mysql = require('mysql2');
const env = require('dotenv').config().parsed
const connection = {
  host: env.DBHOST ,
  user: env.DBUSERNAME,
  password: env.DBPASSWORD,
  database: env.DBDATABASE,
  port: env.DBPORT,
};

const pool = mysql.createPool(connection)
const promisePool = pool.promise()


module.exports = { promisePool }

const mysql = require('mysql2');

const connection = {
  host: '127.0.0.1',
  user: 'polling_app',
  password: '12345',
  database: 'polling_app'
};

const pool = mysql.createPool(connection)
const promisePool = pool.promise()


module.exports = { promisePool }

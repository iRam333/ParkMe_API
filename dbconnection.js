var mysql = require('mysql');
var config = require('./config.js').get(process.env.NODE_ENV);

var connection = mysql.createPool({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.name
});

module.exports = connection;

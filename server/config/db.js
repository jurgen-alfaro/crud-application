// IMPORTANT
// It is not recommended using mysql, use mysql2 instead.
// See reason why: https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "db_crudapp",
});

module.exports = db;

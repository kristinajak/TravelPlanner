const mysql = require("mysql2/promise");
const config = require("./config");

const dbPassword = config.dbPassword;

const pool = mysql.createPool({
  host: "localhost",
  user: "kristinajak",
  password: dbPassword,
  database: "plantogo",
});

module.exports = pool;

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "board_test",
});

connection.connect();

module.exports =  {mysql,connection};
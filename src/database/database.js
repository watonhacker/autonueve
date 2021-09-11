const config = require('../../config/cfg.js');
const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
    host:config.host,
    user:config.user,
    password:config.password,
    database:config.database


})

mysqlConnection.connect(function(err) {
        if (err) console.log(err)
        console.log("Conectado a: ", config.database)
  });



module.exports = mysqlConnection;
const config = require('../../config/cfg');
const mysql = require('mysql');


    mysqlConnection = mysql.createConnection({
    host:config.host,
    user:config.user,
    password:config.password,
    database:config.database
    })



    mysqlConnection.connect((err) => {
        if (err) throw err;
        console.log("Conectado a la base de datos ", config.database)
    })


module.exports = mysqlConnection;
//const config = require('../config/cfg');
const mysql = require('mysql');
const mysqlConnection = mysql.createPool({
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    host:'uh1.hnc.cl',
    user:'mobalzen_keyzen',
    password:'keyzencl123',
    database:'mobalzen_autonueve',
    port:'3306',

})

mysqlConnection.connect(function(err) {
        if (err) console.log(err)
        console.log("Conectado a: ", 'mobalzen_autonueve')
  });



module.exports = mysqlConnection;
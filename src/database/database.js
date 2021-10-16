const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

console.log(process.env.HOST)
console.log(process.env.USER)
console.log(process.env.PASS)
console.log(process.env.DATABASE)
console.log("***")

const mysql = require('mysql');

mysqlConnection = mysql.createConnection({
    host:'uh1.hnc.cl',
    user:"mobalzen_keyzen",
    password:"keyzencl123",
    database:"mobalzen_autonueve"
})
/*     mysqlConnection = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASS,
    database:process.env.DATABASE
    }) */



    mysqlConnection.connect((err) => {
        if (err) throw err;
        console.log("Conectado a la base de datos ", process.env.DATABASE)
    })


module.exports = mysqlConnection;
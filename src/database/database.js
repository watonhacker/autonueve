const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

/* console.log(process.env.HOST)
console.log(process.env.USER)
console.log(process.env.PASS)
console.log(process.env.DATABASE)
console.log("***") */

const mysql = require('mysql');

    mysqlConnection = mysql.createConnection({
    host:'mobalzen-autonueve-do-user-9924163-0.b.db.ondigitalocean.com',
    user:"doadmin",
    password:"lNIFw7eUbjhpbisK",
    database:"autonueve",
    port:'25060'
    })



    mysqlConnection.connect((err) => {
        if (err) throw err;
        console.log("Conectado a la base de datos ", process.env.DATABASE)
    })


module.exports = mysqlConnection;
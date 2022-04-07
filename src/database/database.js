const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })


const mysql = require('mysql');
const host = '143.198.233.238' 
const password = "$Autonueve2022";


    const mysqlConnection = mysql.createConnection({
        host,
        user:"keyzen",
        password,
        database:"autonueve",
        port:'3306'
    })



    mysqlConnection.connect((err) => {
        if (err) throw err;
        console.log("Conectado a la base de datos ", host)
    })


module.exports = mysqlConnection;
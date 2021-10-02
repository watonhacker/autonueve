const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

console.log(process.env.HOST)
console.log(process.env.USER)
console.log(process.env.PASSWORD)
console.log(process.env.DATABASE)

const mysql = require('mysql');


    mysqlConnection = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
    })



    mysqlConnection.connect((err) => {
        if (err) throw err;
        console.log("Conectado a la base de datos ", config.database)
    })


module.exports = mysqlConnection;
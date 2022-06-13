const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })


const mysql = require('mysql');

    const mysqlConnection = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        port: process.env.DATABASE_PORT
    })


    mysqlConnection.connect((err) => {
        if (err) throw err;
        console.log("Conectado a la base de datos ", process.env.HOST)
    })


module.exports = mysqlConnection;
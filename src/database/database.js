const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })


const mysql = require('mysql');

    const mysqlConnection = mysql.createConnection({
        host: process.env.FTP_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.FTP_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    })


    mysqlConnection.connect((err) => {
        if (err) throw err;
        console.log("Conectado a la base de datos ", process.env.HOST)
    })


module.exports = mysqlConnection;
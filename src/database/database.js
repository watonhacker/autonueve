const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const { logError } = require('../errorHandler');


const mysql = require('mysql');

let mysqlPool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    connectionLimit: 200, // limita el número de conexiones en el pool
    acquireTimeout: 7000 // tiempo máximo de espera para adquirir una conexión (en milisegundos)

});

mysqlPool.on('error', function (err) {
    console.log('Error en la conexión a la base de datos: ', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNREFUSED') {
        console.log('Reconectando a la base de datos...');
        mysqlPool = mysql.createPool({
            host: process.env.HOST,
            user: process.env.DB_USERNAME,
            password: process.env.PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT,
            connectionLimit: 200,
            acquireTimeout: 7000
        });
    } else {
        console.log('Error desconocido en la conexión a la base de datos. No se reiniciará la conexión.');
        console.log('***** BDD REINICIADA *****');
        logError(err)
    }
});



module.exports = mysqlPool;
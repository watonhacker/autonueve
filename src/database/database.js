const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const { logError } = require('../errorHandler');


const mysql = require('mysql');

const mysqlPool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    connectionLimit: 200, // limita el número de conexiones en el pool a 10,
    acquireTimeout: 5000 // tiempo máximo de espera para adquirir una conexión (en milisegundos)

});

mysqlPool.on('error', function (err) {
    console.log('Error en la conexión a la base de datos: ', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('Reconectando a la base de datos...');
        mysqlPool = mysql.createPool({
            host: process.env.HOST,
            user: process.env.DB_USERNAME,
            password: process.env.PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT,
            connectionLimit: 200,
            acquireTimeout: 5000
        });
    } else {
        console.log('Error desconocido en la conexión a la base de datos. No se reiniciará la conexión.');
        console.log('***** BDD REINICIADA *****');
        logError(err)
    }
});



module.exports = mysqlPool;
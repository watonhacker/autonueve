const mysql = require('mysql')
const cfg = require('../../cfg.js')
const connection = mysql.createConnection({
    host:cfg.host,
    user:cfg.user,
    password:cfg.password,
    database:cfg.database,
    port:cfg.port
})

connection.connect(() => {
    console.log('Conectados a la database')
})

module.exports = connection;
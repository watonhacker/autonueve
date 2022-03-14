const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

/* console.log(process.env.HOST)
console.log(process.env.USER)
console.log(process.env.PASS)
console.log(process.env.DATABASE)
console.log("***") */

const mysql = require('mysql');
const host = '143.198.233.238' /* || 'mobalzen-autonueve-do-user-9924163-0.b.db.ondigitalocean.com' */

/*     mysqlConnection = mysql.createConnection({
    host,
    user:"doadmin",
    password:"lNIFw7eUbjhpbisK",
    database:"autonueve",
    port:'25060'
    })
 */
    mysqlConnection = mysql.createConnection({
        host,
        user:"keyzen",
        password:'$Autonueve2022',
        database:"autonueve",
        port:'3306'
        })



    mysqlConnection.connect((err) => {
        if (err) throw err;
        console.log("Conectado a la base de datos ", host)
    })


module.exports = mysqlConnection;
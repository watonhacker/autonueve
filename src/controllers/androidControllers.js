const mysqlPool = require('../database/database')

exports.getBrands = function () {
    try {

        return new Promise((resolve, reject) => {

            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    console.error(err) 
                    reject(err)
                }
                connection.query("SELECT * FROM producto LIMIT 5 AND estado='A'", (err, result) => {
                    if (err) { 
                        console.error(err) 
                        reject(err)
                    }
                    connection.release(); // Importante liberar la conexión
                    resolve(JSON.parse(JSON.stringify(result)))
                })
            })

        })


    } catch (err) {
        console.log(err);    }
}
const mysqlPool = require('../database/database')

exports.getPedidos = () => {

    let sql = `SELECT * FROM pedido`;

    return new Promise((resolve, reject) => {

        mysqlPool.getConnection((err, connection) => {
            if (err) { 
                console.error(err) 
                
            }
            connection.query(sql, (err, result) => {
                if (err) { 
                    console.error(err) 
                    
                }
                connection.release(); // Importante liberar la conexión
                resolve(JSON.parse(JSON.stringify(result)))
            })
        })

    })


};

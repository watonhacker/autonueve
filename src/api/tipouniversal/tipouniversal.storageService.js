const mysqlPool = require('../../database/database')

exports.getAllTipoUniversal = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM tipouniversal';
            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    mysqlPool.emit('error', err)
                    console.error(err) 
                    reject(err)
                }
                try {
                    connection.query(sql, (err, result) => {
                        if (err) { 
                            console.error(err) 
                            mysqlPool.emit('error', err)
                            reject(err)
                        }
                        connection.release(); // Importante liberar la conexión
                        resolve(JSON.parse(JSON.stringify(result)))
                    })
                } catch (error) {
                    mysqlPool.emit('error', err)
                    console.error(error);
                    reject(error);
                }
      
            })
        } catch (error) {
            reject(error)
            console.error(error.message)
            
        }
    })    
}

exports.getTipoUniversalById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT * FROM tipouniversal WHERE id = ${id}`;

            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    mysqlPool.emit('error', err)
                    console.error(err) 
                    reject(err)
                }
                try {
                    connection.query(sql, (err, result) => {
                        if (err) { 
                            console.error(err) 
                            mysqlPool.emit('error', err)
                            reject(err)
                        }
                        connection.release(); // Importante liberar la conexión
                        resolve(JSON.parse(JSON.stringify(result)))
                    })
                } catch (error) {
                    mysqlPool.emit('error', err)
                    console.error(error);
                    reject(error);
                }
      
            })
        } catch (error) {
            reject(error)
            console.error(error.message)
            
        }
    })    
}


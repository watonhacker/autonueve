const mysqlPool = require('../../database/database')

exports.getAllMetodoPago = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM metodopago';
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
            console.error(error.message);
        }
    })    
}

exports.createMetodoPago = (metodoPago) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'INSERT INTO metodopago SET ?';
            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    mysqlPool.emit('error', err)
                    console.error(err) 
                    reject(err)
                }
                try {
                    connection.query(sql, metodoPago, (err, result) => {
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

exports.getMetodoPagoById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT * FROM metodopago WHERE id = ${id}`;
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
            console.error(error.message);
        }
    })    
}


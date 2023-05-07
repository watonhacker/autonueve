const mysqlPool = require('../../database/database')


exports.getAllFabricacion = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM fabricacion';
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

exports.createFabricacion = (data) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'INSERT INTO fabricacion SET ?';
            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    mysqlPool.emit('error', err)
                    console.error(err) 
                    reject(err)
                }
                try {
                    connection.query(sql, data, (err, result) => {
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


exports.getFabricacionById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT * FROM fabricacion WHERE id = ${id}`;
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



exports.getFabricacionByFecha = (fecha) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT id FROM fabricacion WHERE fecha = ${fecha}`;

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
                        resolve(JSON.parse(JSON.stringify(result[0])))
                    })
                } catch (error) {
                    mysqlPool.emit('error', err)
                    console.error(error);
                    reject(error);
                }
      
            })
        } catch (error) {
            console.error(error.message);
        }
    })
}


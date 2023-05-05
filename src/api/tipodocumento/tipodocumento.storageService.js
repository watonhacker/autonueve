const mysqlConnection = require('../../database/database')

exports.getAllTipoDocumento = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM tipodocumento';
            mysqlConnection.query(sql, (err, result) => {
                if (err) { console.error(err) }
                resolve(result)
            })
        } catch (error) {
            reject(error)
            console.error(error.message)
            
        }
    })    
}

exports.getTipoDocumentoById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT * FROM tipodocumento WHERE id = ${id}`;
            mysqlConnection.query(sql, (err, result) => {
                if (err) { console.error(err) }
                resolve(result)
            })
        } catch (error) {
            reject(error)
            console.error(error.message)
            
        }
    })    
}


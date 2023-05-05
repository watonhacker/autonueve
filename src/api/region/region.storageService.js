const mysqlConnection = require('../../database/database')

exports.getAllRegion = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM region';
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

exports.getRegionById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT * FROM region WHERE id = ${id}`;
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


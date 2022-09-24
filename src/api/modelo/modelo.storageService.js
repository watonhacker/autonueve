const mysqlConnection = require('../../database/database')


exports.getAllModelo = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM modelo';
            mysqlConnection.query(sql, (err, result) => {
                if (err) throw err;
                resolve(result)
            })
        } catch (error) {
            reject(error)
            console.error(error.message)
            throw error;
        }
    })    
}

exports.createModelo = (modelo) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'INSERT INTO modelo SET ?';
            mysqlConnection.query(sql, modelo, (error, result) => {
                if (error) {
                    console.log(error.message);
                    resolve(error)
                }
                resolve(result)
            })
        } catch (error) {
            reject(error)
            console.error(error.message)
        }
    })    
}

exports.getModeloById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT * FROM modelo WHERE id = ${id}`;
            mysqlConnection.query(sql, (err, result) => {
                if (err) throw err;
                resolve(result)
            })
        } catch (error) {
            reject(error)
            console.error(error.message)
            throw error;
        }
    })    
}


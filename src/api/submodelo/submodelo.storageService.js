const mysqlConnection = require('../../database/database')


exports.getAllSubmodelo = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM submodelo';
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

exports.createSubmodelo = (submodelo) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'INSERT INTO submodelo SET ?';
            mysqlConnection.query(sql, submodelo, (error, result) => {
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

exports.getSubmodeloById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT * FROM submodelo WHERE id = ${id}`;
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

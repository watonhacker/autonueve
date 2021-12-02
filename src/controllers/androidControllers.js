const mysqlConnection = require('../database/database')

exports.getBrands = function () {
    try {

        return new Promise((resolve, reject) => {
            mysqlConnection.query("SELECT * FROM producto LIMIT 5", (err, results) => {
                results = JSON.parse(JSON.stringify(results))
                resolve({
                    results
                })
                
            } )

        })

    } catch (err) {
        throw err;
    }
}
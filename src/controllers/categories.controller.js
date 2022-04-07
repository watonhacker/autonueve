const mysqlConnection = require('../database/database')

exports.getCategories = () => {

    let sql = `SELECT * FROM categoria`;

    return new Promise((resolve, reject) => {

        mysqlConnection.query(sql, (err, results) => {

            if (err) {
                return [];
            }
    
            let parsedResults = JSON.parse(JSON.stringify(results));
    
            resolve (parsedResults)
    
        })

    })


};
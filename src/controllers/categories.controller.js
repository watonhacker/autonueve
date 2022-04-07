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


exports.getCategoryProducts = (categoryId) => {
    let sql = `SELECT * FROM producto WHERE producto.categoria_id = ${categoryId}`;

    return new Promise((resolve, reject) => {
        mysqlConnection.query(sql, (err, results, rows) => {
            results=JSON.parse(JSON.stringify(results))
            resolve(results)

            if (err) {
                console.error(err);
                return [];
            }
            
        })
    })
}
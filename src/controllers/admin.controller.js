const mysqlConnection = require('../database/database')
const globalControllers = require('./globalControllers')

exports.getPedidos = () => {

    let sql = `SELECT * FROM pedido`;

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

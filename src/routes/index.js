const router = require('express').Router();
const mysqlConnection = require('../database/database')

router.get('/', (req, res) => {
    let lastProducts;

    mysqlConnection.query("SELECT * FROM marca", (err, results, row) => {
            if (results !== undefined) {
                results=JSON.parse(JSON.stringify(results))
                resultados = results
                mysqlConnection.query(`SELECT * FROM producto ORDER BY id DESC LIMIT 12;`, (err, results, rows) => {
    
                    lastProducts = results
    
                    res.render('index', {
                        resultados,
                        lastProducts
                    })
                })
            }
        
    
    })
})


module.exports = router;
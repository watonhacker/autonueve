const router = require('express').Router();
const mysqlConnection = require('../database/database')

router.get('/', (req, res) => {
    let lastProducts;
    let resultados;

    mysqlConnection.query("SELECT * FROM marca", (err, results, row) => {
            if (results !== undefined) {
                results=JSON.parse(JSON.stringify(results))
                resultados = results
                mysqlConnection.query(`SELECT * FROM producto WHERE cantidad > 5 ORDER BY id DESC LIMIT 12;`, (err, results, rows) => {

                    lastProducts = results.map((result) => {
                        if (result.precio.toString().length == 4) {
                            result.precio = result.precio.toString().slice(0, 1) + "." + result.precio.toString().slice(1) 
                        } else if (result.precio.toString().length == 5) {
                            result.precio = result.precio.toString().slice(0, 2) + "." + result.precio.toString().slice(2)
                        } else if (result.precio.toString().length == 6){
                            result.precio = result.precio.toString().slice(0, 3) + "." + result.precio.toString().slice(3)
                        } else {
                            result.precio = result.precio;
                        }

                        return result
                    })
    
                    res.render('index', {
                        resultados,
                        lastProducts
                    })
                })
            }
        
    
    })
})


module.exports = router;
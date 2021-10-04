const router = require('express').Router();
const mysqlConnection = require('../database/database')

router.get('/', (req, res) => {

    let results;
    let lastProducts;

    mysqlConnection.query("SELECT * FROM marca", (err, results, row) => {
            results=JSON.parse(JSON.stringify(results))
            resultados = results
            mysqlConnection.query(`SELECT producto.nombre, producto.SKU, producto.precio, producto.descripcion,
            producto.marca FROM producto ORDER BY id DESC LIMIT 12;`, (err, results, rows) => {

                lastProducts = results

                console.log(lastProducts)
                res.render('index', {
                    resultados,
                    lastProducts
                })
            })
        
        

    /*  resultados = 1 */
    })
})


module.exports = router;
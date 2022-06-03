const router = require('express').Router();
const mysqlConnection = require('../database/database');


router.get('/:id', (req, res) => {
    let sql = `SELECT id, codigo, nombre, precio, SKU, marca, descripcion, cantidad, imagen, imagen_2, imagen_3 FROM producto WHERE producto.id = ${req.params.id}; `
    mysqlConnection.query(sql, (err, results) => {

        results = JSON.parse(JSON.stringify(results))
        results = results[0]
        res.render("single-product", {
            resultado:results
        })

    })

})


module.exports = router;
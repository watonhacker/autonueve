const router = require('express').Router()
const mysqlConnection = require('../database/database')

router.get('/', (req, res) => {
    console.log(req.query)

    const $submodeloId = req.query.submodel
    const $anyoId = req.query.year

    mysqlConnection.query(`SELECT listasubmodelo.id FROM listasubmodelo INNER JOIN submodelo ON submodelo.id = listasubmodelo.submodelo_id INNER JOIN fabricacion ON fabricacion.id = listasubmodelo.fabricacion_id WHERE submodelo.id = ${$submodeloId} AND fabricacion.id = ${$anyoId};`, (err, results, rows) => {

        let $listaSubmodeloId = results[0]['id']

        console.log($listaSubmodeloId, "listasubmodeloid")

        mysqlConnection.query(`SELECT producto.nombre, producto.SKU, producto.precio, producto.descripcion,
        producto.marca FROM listaproducto INNER JOIN producto ON producto.id = listaproducto.producto_id
        INNER JOIN listasubmodelo ON listasubmodelo.id = listaproducto.listasubmodelo_id WHERE listasubmodelo.id = ${$listaSubmodeloId};`, (err, results, rows) => {
            results=JSON.parse(JSON.stringify(results))
            console.log(results)
            console.log("productos")
            res.render('search', {
                results
            })
        })
    })

   

    


})



module.exports = router;
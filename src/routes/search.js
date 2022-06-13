const router = require('express').Router()
const mysqlConnection = require('../database/database')
const globalControllers = require('../controllers/globalControllers')
const categoriesControllers = require('../controllers/categories.controller')
const singleProductController = require('../controllers/singleProductController.js')

let page = 0
let posicionArrayProductos = 0
let $anyoName;
let $anyoId;
let $submodeloId;
let $listaSubmodeloId

router.get('/:busqueda/:page', async (req, res) => {
    const busqueda = req.params.busqueda;
    const page = req.params.page;

    const data = await globalControllers.globalSearch(busqueda, page)
    const resultados = data.results;
    const paginator = data.paginator;


    res.render("category-search", {
        resultados,
        paginator
    })

    
})

router.get('/:submodelo/:year/:page', async (req, res) => {


    $submodeloId = req.params.submodelo
    $anyoName = req.params.year
    page = req.params.page
    posicionArrayProductos = parseInt(page) - 1

      mysqlConnection.query(`SELECT id FROM fabricacion WHERE fecha = ${$anyoName}`, (err, results) => {
        
        $anyoId = results[0]['id']

        mysqlConnection.query("SELECT * FROM marca", (err, results) => {
            let brandResults = results;

             mysqlConnection.query(`SELECT listasubmodelo.id FROM listasubmodelo INNER JOIN submodelo ON submodelo.id = listasubmodelo.submodelo_id INNER JOIN fabricacion ON fabricacion.id = listasubmodelo.fabricacion_id WHERE submodelo.id = ${$submodeloId} AND fabricacion.id = ${$anyoId};`, (err, results, rows) => {
                
                if (results[0] == undefined || results.length == 0) {
                    res.render("search")
                } else {

                    $listaSubmodeloId = results[0]['id']
            
                    mysqlConnection.query(`SELECT producto.id, producto.imagen, producto.precio, producto.nombre, producto.SKU, producto.marca FROM listaproducto INNER JOIN producto ON producto.id = listaproducto.producto_id
                    INNER JOIN listasubmodelo ON listasubmodelo.id = listaproducto.listasubmodelo_id WHERE listasubmodelo.id = ${$listaSubmodeloId};`, (err, results, rows) => {
                            
                        results=JSON.parse(JSON.stringify(results))
                        
                        const busqueda = req.params.submodelo;
                        const year = req.params.year;
                        const data = categoriesControllers.getElementsByPageRender('submodel', {data:busqueda, year:req.params.year}, results, page)
                        const resultados = data.results;
                        const paginator = data.paginator;

                        
                        res.render('search', { 
                            brandResults,
                            resultados,
                            paginator
                        })
            
                    })

                }


            })
        

        })
    })

})



module.exports = router;
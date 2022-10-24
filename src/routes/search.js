const router = require('express').Router()
const mysqlConnection = require('../database/database')
const globalControllers = require('../controllers/globalControllers')
const categoriesControllers = require('../controllers/categories.controller')
const fabricacionService = require('../api/fabricacion/fabricacion.service')
const listaSubmodeloService = require('../api/listasubmodelo/listasubmodelo.service')
const productoService = require('../api/producto/producto.service')
const marcaService = require('../api/marca/marca.service')

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

    console.log("hello")
    $submodeloId = req.params.submodelo
    $anyoName = req.params.year
    page = req.params.page
    posicionArrayProductos = parseInt(page) - 1

    //Tengo que aplicar async await aca con promesas, agarrar todo lo del submodelo, agarrar todos los universales y hacer un array 
    // ese array despues puedo crear un Set y me quedara todo filtradito y ahi lo imprimo


    const fabricacionId = await fabricacionService.getFabricacionByFecha($anyoName);
    const brandResults = await marcaService.getAllMarca();
    const listaSubmodeloId = await listaSubmodeloService.getListaSubmodeloBySubmodelAndYear($submodeloId, fabricacionId)
    const resultsSubmodelo = await productoService.getProductoInfoByListaSubmodelo(listaSubmodeloId);
    const resultsUniversal = await productoService.getProductosUniversal();
    const results = [...resultsSubmodelo, ...resultsUniversal];  

    const busqueda = req.params.submodelo;
    const data = categoriesControllers.getElementsByPageRender('submodel', {data:busqueda, year:req.params.year}, results, page)
    const resultados = data.results;
    const paginator = data.paginator;

    
    res.render('search', { 
        brandResults,
        resultados,
        paginator
    })
})



module.exports = router;
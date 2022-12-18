const router = require('express').Router()

const globalControllers = require('../controllers/globalControllers')
const categoriesControllers = require('../controllers/categories.controller')
const fabricacionService = require('../api/fabricacion/fabricacion.service')
const listaSubmodeloService = require('../api/listasubmodelo/listasubmodelo.service')
const productoService = require('../api/producto/producto.service')
const marcaService = require('../api/marca/marca.service')

let page = 0
let posicionArrayProductos = 0
let $anyoName;
let $submodeloId;


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
                                                                            
router.get('/compatibilidad/:listasubmodelo/:page', async (req, res) => {

    console.log("hello")
    page = req.params.page
    posicionArrayProductos = parseInt(page) - 1
    const listaSubmodeloId = req.params.listasubmodelo

    //Tengo que aplicar async await aca con promesas, agarrar todo lo del submodelo, agarrar todos los universales y hacer un array 
    // ese array despues puedo crear un Set y me quedara todo filtradito y ahi lo imprimo


    const brandResults = await marcaService.getAllMarca();
    const resultsListaSubmodelo = await productoService.getProductoInfoByListaSubmodelo(listaSubmodeloId);
    const resultsUniversal = await productoService.getProductosUniversal();
    const results = [...resultsListaSubmodelo, ...resultsUniversal];  

    const busqueda = req.params.listasubmodelo;
    const data = categoriesControllers.getElementsByPageRender('submodel', {data:busqueda}, results, page)
    const resultados = data.results;
    const paginator = data.paginator;

    
    res.render('search', { 
        brandResults,
        resultados,
        paginator
    })
})



module.exports = router;
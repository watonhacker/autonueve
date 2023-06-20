const router = require('express').Router()
const mysqlPool = require('../database/database')


const globalControllers = require('../controllers/globalControllers')
const categoriesControllers = require('../controllers/categories.controller')
// const fabricacionService = require('../api/fabricacion/fabricacion.service')
// const listaSubmodeloService = require('../api/listasubmodelo/listasubmodelo.service')
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
                                                                            
router.get('/compatibilidad/:compatibility/:id/:page', async (req, res) => {

    page = req.params.page
    posicionArrayProductos = parseInt(page) - 1
    const id = req.params.id
    const compatibility = req.params.compatibility;
    const expectedCompatibilityValues = ["listasubmodelo", "modelo", "marca", "submodelo"]
    let compatibilityResults;

    //Tengo que aplicar async await aca con promesas, agarrar todo lo del submodelo, agarrar todos los universales y hacer un array 
    // ese array despues puedo crear un Set y me quedara todo filtradito y ahi lo imprimo
    if (!expectedCompatibilityValues.includes(compatibility)){
        let resultados = await new Promise ((resolve, reject) => {
            const sql = "SELECT * FROM marca order by nombre";
            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    mysqlPool.emit('error', err)
                    console.error(err) 
                    
                }
                try {
                    connection.query(sql, (err, result) => {
                        if (err) { 
                            console.error(err) 
                            mysqlPool.emit('error', err)
                            
                        }
                        connection.release(); // Importante liberar la conexión
                        resolve(JSON.parse(JSON.stringify(result)))
                    })
                } catch (error) {
                    mysqlPool.emit('error', err)
                    console.error(error);
                    ;
                }
      
            })
            
        })
    
        let lastProducts = await new Promise((resolve) => {
            const sql = `SELECT * FROM producto WHERE cantidad >= 0 AND estado="A" ORDER BY id DESC LIMIT 12;`;
            
            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    mysqlPool.emit('error', err)
                    console.error(err) 
    
                }
                try {
                    connection.query(sql, (err, result) => {
                        if (err) { 
                            console.error(err) 
                            mysqlPool.emit('error', err)
                        }
                        connection.release(); // Importante liberar la conexión
                        resolve(JSON.parse(JSON.stringify(result))) // cambiar esto
                    })
                } catch (err) {
                    mysqlPool.emit('error', err)
                    console.error(err);
    
                }
    
           
            })
        })
    
        res.render('index', {
            resultados,
            lastProducts
        })
    } else {
        if (compatibility === 'listasubmodelo') {
            compatibilityResults = await productoService.getProductoInfoByListaSubmodelo(id);
        } else if (compatibility === 'submodelo') {
            compatibilityResults = await productoService.getProductoInfoBySubmodelo(id)
        } else if (compatibility === 'modelo') {
            compatibilityResults = await productoService.getProductoInfoByModelo(id);
        } else if (compatibility === 'marca') {
            compatibilityResults = await productoService.getProductoInfoByMarca(id);
        }


        const brandResults = await marcaService.getAllMarca();
        const resultsUniversal = await productoService.getProductosUniversal();
    
        if (compatibilityResults) {
            if (compatibilityResults.length > 0) {
                const results = [...compatibilityResults, ...resultsUniversal];  
        
                const busqueda = req.params.listasubmodelo;
                const data = categoriesControllers.getElementsByPageRender(compatibility, {data:busqueda}, results, page)
                const resultados = data.results;
                const paginator = data.paginator;
            
                
                res.render('search', { 
                    brandResults,
                    resultados,
                    paginator
                })
            } 
        } else {
            const results = resultsUniversal;  
    
            const busqueda = req.params.listasubmodelo;
            const data = categoriesControllers.getElementsByPageRender(compatibility, {data:busqueda}, results, page)
            const resultados = data.results;
            const paginator = data.paginator;
        
            
            res.render('search', { 
                brandResults,
                resultados,
                paginator
            }) 
        }
    
    }
   
})


router.get('/compatibilidad/:listasubmodelo/:page', async (req, res) => {

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
    const data = categoriesControllers.getElementsByPageRender('compatibility', {data:busqueda}, results, page)
    const resultados = data.results;
    const paginator = data.paginator;

    
    res.render('search', { 
        brandResults,
        resultados,
        paginator
    })
})


module.exports = router;
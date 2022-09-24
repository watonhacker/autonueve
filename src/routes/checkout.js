const router = require('express').Router()

const mysqlConnection = require('../database/database')
const comunaService = require('../api/comuna/comuna.service')
const regionService = require('../api/region/region.service')
const tipoDocumentoService = require('../api/tipodocumento/tipodocumento.service')
const metodoEntregaService = require('../api/metodoentrega/metodoentrega.service')
const metodoPagoService = require('../api/metodopago/metodopago.service')
const productoService = require('../api/producto/producto.service')


let listaProductos =[]
let test = []
let queryDone = false;
let dataListaProductoLen;
let contadorInterno;
let ultimoElemento;

/* Que hace este codigo raro */

// El front lo envia todo desde shoppingCart.js
// Primero envía un post, que mas que nada sirve para poder generar el array test[], a partir del objeto que nos envian hacemos una consulta a la base de datos donde nos traemos los datos de los productos y los guardamos en ese array
// Luego el front una vez terminamos el proceso, redirige hacia la pagina de checkout con ayuda del array que tiene toda la info lista para ser renderizada
// Creo que lo unico que podemos tocar aca es el update, ya que podriamos no hacer la consulta ya que todos los datos los tenemos ya en el front, y solo cambiar la cantidad. La unica forma de que sirva hacer el update a nivel de base de datos sería para comprobar EL STOCK! que es super importante, y tambien podría aplicarlo cuando se ejecuta el POST/checkout 

router.post('/', async (req, res) => {

    try {
  
        dataListaProductoLen = 0
        contadorInterno = 0
        queryDone = false;
        test = []
        let dataListaProducto = req.body
        let resultados;
    
        for (element in dataListaProducto) {
            dataListaProductoLen++
        }
        
     
        for (element in dataListaProducto) {
   
            await mysqlConnection.query(`SELECT * FROM producto WHERE producto.id = ${element}`, (err, results) => {
    
                results=JSON.parse(JSON.stringify(results))
                resultados = results  
 
                /* Se le agrega la cantidad al objeto que estamos recorriendo */
                ultimoElemento = test.slice(-1)
                if (ultimoElemento[0]) {
    
                    ultimoElemento[0].cantidad = dataListaProducto[ultimoElemento[0].id]
                }
    
                test.push(resultados[0])  
                
    

        
                    if (test.length == dataListaProductoLen) {
                        ultimoElemento = test.slice(-1)
                        ultimoElemento[0].cantidad = dataListaProducto[ultimoElemento[0].id]
                        contadorInterno = 0
                        dataListaProductoLen = 0
                        res.send({
                            length: test.length
                        })
               
                    } 

            })     
            
    
        } 

  
    
    

    
    } catch (err) {
        console.log(err)
    }
  



})

router.get('/', async (req, res) =>  {


    const productos = JSON.parse(req.query.items);
    const cantidades = JSON.parse(req.query.amounts)
    const listaProductos = await productoService.getProductsAmountsByIds(productos, cantidades)
    await Promise.all([
        comunaService.getAllComuna()
    ]).then(values => {
        console.log(listaProductos)
        res.render("checkout", {
            listaProductos
        })
    })
    .catch(
        error => {
            console.log(error);
            res.send(error)
        }
    )


})

router.post('/update/', async (req, res) => {
    dataListaProductoLen = 0
    contadorInterno = 0
    queryDone = false;
    test = []
    let dataListaProducto = req.body
    let resultados;

    for (element in dataListaProducto) {
        dataListaProductoLen++
    }

    

    for (element in dataListaProducto) {
  
        await mysqlConnection.query(`SELECT * FROM producto WHERE producto.id = ${element}`, (err, results) => {
            if (results) {
                results=JSON.parse(JSON.stringify(results))
                resultados = results  
    
                ultimoElemento = test.slice(-1)
                if (ultimoElemento[0]) {
                    ultimoElemento[0].cantidad = dataListaProducto[ultimoElemento[0].id]
                }
    
    
    
                test.push(resultados[0])
       
    
        
                if (test.length == dataListaProductoLen) {
                    ultimoElemento = test.slice(-1)
                    ultimoElemento[0].cantidad = dataListaProducto[ultimoElemento[0].id]
                    contadorInterno = 0
                    dataListaProductoLen = 0
                    console.log(test)
                    res.send({
                        test
                    })
                } 
            }
            
        })   



        
        
        

    } 



})




module.exports = router;
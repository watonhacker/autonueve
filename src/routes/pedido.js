const router = require('express').Router()
const mysqlConnection = require('../database/database')

let listaProductos =[]
let test = []
let queryDone = false;
let dataListaProductoLen;
let contadorInterno;
let ultimoElemento;
let productos;
let canti

router.post('/', async (req, res) => {
    dataListaProductoLen = 0
    contadorInterno = 0
    queryDone = false;
    test = []
    let dataListaProducto = req.body
    let resultados;

    for (element in dataListaProducto) {
        dataListaProductoLen++;
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
    


 






})

router.get('/', (req, res) =>  {
    listaProductos = []
    listaProductos = test

    let comunas;
    let regiones;
    let documentos;
    let entregas;
    let pagos;

    mysqlConnection.query("SELECT * FROM comuna", (err, results) => {
        results=JSON.parse(JSON.stringify(results))
        comunas = results;
        mysqlConnection.query("SELECT * FROM region", (err, results) => {
            results=JSON.parse(JSON.stringify(results))
            regiones = results
            mysqlConnection.query("SELECT * FROM tipodocumento", (err, results) => {
                results=JSON.parse(JSON.stringify(results))
                documentos = results
                mysqlConnection.query("SELECT * FROM metodoentrega", (err, results) => {
                    results=JSON.parse(JSON.stringify(results))
                    entregas = results
                    mysqlConnection.query("SELECT * FROM metodopago", (err, results) => {
                        results=JSON.parse(JSON.stringify(results))
                        pagos = results
                        res.render("pedido", {
                            listaProductos,
                            regiones,
                            comunas,
                            documentos,
                            entregas,
                            pagos
                        })
                    })
                })
            })

        })
    })



})

module.exports = router;
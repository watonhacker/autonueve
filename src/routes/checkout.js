const router = require('express').Router()
const { query } = require('express');
const mysqlConnection = require('../database/database')

let listaProductos =[]
let test = []
let queryDone = false;
let dataListaProductoLen;
let contadorInterno;
let ultimoElemento;

router.post('/', async (req, res) => {
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

            ultimoElemento = test.slice(-1)
            if (ultimoElemento[0]) {
                ultimoElemento[0].cantidad = dataListaProducto[ultimoElemento[0].id]
            }

            test.push(resultados[0])
        })     
        

    } 


    setTimeout(() => {
        if (test.length == dataListaProductoLen) {
            ultimoElemento = test.slice(-1)
            ultimoElemento[0].cantidad = dataListaProducto[ultimoElemento[0].id]
            console.log(test)
            contadorInterno = 0
            dataListaProductoLen = 0
            res.send({
                length: test.length
            })
        } 
    }, 100)




})

router.get('/', (req, res) =>  {
    listaProductos = []
    listaProductos = test
    res.render("checkout", {
        listaProductos
    })
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

            results=JSON.parse(JSON.stringify(results))
            resultados = results  

            ultimoElemento = test.slice(-1)
            if (ultimoElemento[0]) {
                ultimoElemento[0].cantidad = dataListaProducto[ultimoElemento[0].id]
            }

            test.push(resultados[0])
        })     
        

    } 

    setTimeout(() => {
        if (test.length == dataListaProductoLen) {
            ultimoElemento = test.slice(-1)
            ultimoElemento[0].cantidad = dataListaProducto[ultimoElemento[0].id]
            console.log(test)
            contadorInterno = 0
            dataListaProductoLen = 0
            res.send({
                test
            })
        } 
    }, 100)

})




module.exports = router;
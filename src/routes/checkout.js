const router = require('express').Router()
const { query } = require('express');
const mysqlConnection = require('../database/database')

let listaProductos =[]
let test = []
let queryDone = false;
let dataListaProductoLen;
let contadorInterno;

router.post('/', async (req, res) => {
    dataListaProductoLen = 0
    contadorInterno = 0
    queryDone = false;
    test = []
    let dataListaProducto = req.body
    let queryProductos = ""
    let resultados;

    for (element in dataListaProducto) {
        dataListaProductoLen++
    }

    if (queryDone == false) {

        for (element in dataListaProducto) {
  
            await mysqlConnection.query(`SELECT * FROM producto WHERE producto.id = ${element}`, (err, results) => {
                results=JSON.parse(JSON.stringify(results))
                resultados = results           
                test.push(resultados)
                console.log("*!*!*!*!*!*!*!*!*!*!*!*!*!*!")
                console.log(test)
            })
            contadorInterno+=1
            
            
            console.log(contadorInterno)
            console.log(dataListaProductoLen)
    
            if (contadorInterno == dataListaProductoLen) {
                console.log(contadorInterno)
                console.log(dataListaProductoLen)
                
                console.log(test)
                console.log("LISTO SON IGUALESSSSSSSSSSSSSSSSSSSSSSSS")
                queryDone = true; 
            }
            
    
        } 
    
            
    } 


        
    setTimeout(() => {
        if (test.length == dataListaProductoLen) {
            console.log(queryDone, "queryDOne")
            console.log("********************************************")
            console.log(test)
            contadorInterno = 0
            dataListaProductoLen = 0
            res.send({
                length: test.length
            })
        } 
    }, 100)






/*     console.log(dataListaProducto.length, "LEN") */



})

router.get('/', (req, res) =>  {
    listaProductos = []
    listaProductos = test
    console.log("DEntro del getttttttttttt")
    console.log(listaProductos)

  /*   res.send("oki") */
    res.render("checkout", {
        listaProductos
    })
})




module.exports = router;
const router = require('express').Router()
const mysqlConnection = require('../database/database')

let lenResults = 0;
let contadorPagina = 1;
let contadorResultado = 0;

let listaNueva = []
let listaLocal = []
let contadorVuelta = 0
let contadorItem = 0

let listaResto = []

router.get('/', (req, res) => {
    console.log(req.query)

    const $submodeloId = req.query.submodel
    const $anyoId = req.query.year


    mysqlConnection.query(`SELECT listasubmodelo.id FROM listasubmodelo INNER JOIN submodelo ON submodelo.id = listasubmodelo.submodelo_id INNER JOIN fabricacion ON fabricacion.id = listasubmodelo.fabricacion_id WHERE submodelo.id = ${$submodeloId} AND fabricacion.id = ${$anyoId};`, (err, results, rows) => {

        let $listaSubmodeloId = results[0]['id']

        mysqlConnection.query(`SELECT producto.nombre, producto.SKU, producto.precio, producto.descripcion,
        producto.marca FROM listaproducto INNER JOIN producto ON producto.id = listaproducto.producto_id
        INNER JOIN listasubmodelo ON listasubmodelo.id = listaproducto.listasubmodelo_id WHERE listasubmodelo.id = ${$listaSubmodeloId};`, (err, results, rows) => {
            results=JSON.parse(JSON.stringify(results))
            results = [
                {
                    nombre:"Hola",
                    SKU:1231,
                    precio:1231,
                    descripcion:"123",
                    marca:"123"
                },
                {
                nombre:"Hola",
                SKU:1231,
                precio:1231,
                descripcion:"123",
                marca:"123"
                },
                {
                    nombre:"Hola",
                    SKU:1231,
                    precio:1231,
                    descripcion:"123",
                    marca:"123"
                },       
                {
                nombre:"Hola",
                SKU:1231,
                precio:1231,
                descripcion:"123",
                marca:"123"
                },   
                {
                    nombre:"Hola",
                    SKU:1231,
                    precio:1231,
                    descripcion:"123",
                    marca:"123"
                },
                {
                    nombre:"Hola",
                    SKU:1231,
                    precio:1231,
                    descripcion:"123",
                    marca:"123"
                },
                {
                    nombre:"Hola",
                    SKU:1231,
                    precio:1231,
                    descripcion:"123",
                    marca:"123"
                },       
                {
                    nombre:"Hola",
                    SKU:1231,
                    precio:1231,
                    descripcion:"123",
                    marca:"123"
                },   
                {
                    nombre:"Hola",
                    SKU:1231,
                    precio:1231,
                    descripcion:"123",
                    marca:"123"
                },     
                {
                    nombre:"Hola",
                    SKU:1231,
                    precio:1231,
                    descripcion:"123",
                    marca:"123"
                },       
                {
                    nombre:"Hola",
                    SKU:1231,
                    precio:1231,
                    descripcion:"123",
                    marca:"123"
                },                                          
            ]
            lenResults = (results.length)
            let resto = lenResults % 10
            contadorPagina = 1;
            contadorResultado = 0;

            results.forEach(n => {
                contadorResultado++
                if (contadorPagina == 1){
                    if (contadorResultado == 11) {
                        contadorPagina += 1
                        contadorResultado = 0
         
                    }
                } else {
                    if (contadorResultado == 10) {
                        contadorPagina += 1
                        contadorResultado = 0
                    }
                }
            })

            results.forEach(n => {
    
                listaLocal.push(n)
                contadorItem += 1
                contadorVuelta += 1
            
            
                console.log(`Resto = ${resto}, listaObj ${lenResults} - contadorItem ${contadorItem} == ${lenResults - contadorItem}`)
            
                if (contadorVuelta == 10) {
                    listaNueva.push(listaLocal)
                    contadorVuelta = 0
                    listaLocal = []
                }
            
                if (lenResults - contadorItem < resto) {
                    console.log("entramos en los últimos")
                    listaResto.push(n)
                }
                
            })
            
            if (listaResto[0]) {
            listaNueva.push(listaResto)
            }
            
            
            console.log(contadorItem, "contadorVuelta")
            console.log(lenResults, "cantidadTotal")

            console.log("Se necesitan paginas : ", contadorPagina)
            console.log(lenResults, "Resultados totales")

            res.render('search', {
                results,
                contadorPagina
            })

            console.log(listaNueva)
        })
    })

   
    


})



module.exports = router;
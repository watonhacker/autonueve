const router = require('express').Router()
const mysqlConnection = require('../database/database')

/* Variables para rescatar los resultados en un array de arrays */
let lenResults = 0;
let contadorPagina = 1;
let contadorResultado = 0;
/* Lista que sera impresa en la vista */
let listaNueva = []
/* Lista que se itera SI se entra a los IF (es pag 1, listaNueva esta vacia, que los listasubmodeloid sean dif) */
let listaLocal = []
/* Cuenta cada vuelta, y se resetea cada 10 o cada lo que le pida, esto sirve para ir creando distintos arrays */
let contadorVuelta = 0
/* Este contador sirve para saber cuando estaremos con los items "restantes", los que no calzen justo. Si la diferencia entre la suma total de resultados - el contador, es menos de los 10 que pido, comienzo a obtener la listaResto */
let contadorItem = 0
let listaResto = []

/* Sirve para saber en que página estamos */
let page = 0
/* Esto sirve para ir buscando como puntero los arrays correctos. obtiene su numero en base a la pagina - 1*/
let posicionArrayProductos = 0

let idListaSubmodeloPasada = 0


router.get('/', (req, res) => {

    
    console.log(req.query)
    let $listaSubmodeloId
    let $submodeloId = req.query.submodel
    let $anyoId = req.query.year
    page = req.query.page
    posicionArrayProductos = parseInt(page) - 1
    console.log("Estamos en la página ", page)

   
        mysqlConnection.query(`SELECT listasubmodelo.id FROM listasubmodelo INNER JOIN submodelo ON submodelo.id = listasubmodelo.submodelo_id INNER JOIN fabricacion ON fabricacion.id = listasubmodelo.fabricacion_id WHERE submodelo.id = ${$submodeloId} AND fabricacion.id = ${$anyoId};`, (err, results, rows) => {
    
        console.log(results)
        if (results == undefined) {
            console.log("UNDEFINEDDDDDDDDDDDD")
        }
        
       /*  if (results[0] != undefined && results[0]['id'] != undefined) {
                console.log(results[0])
                console.log(results[0]['id'])
                
           

        } */

        $listaSubmodeloId = 1

        mysqlConnection.query(`SELECT producto.nombre, producto.SKU, producto.precio, producto.descripcion,
        producto.marca FROM listaproducto INNER JOIN producto ON producto.id = listaproducto.producto_id
        INNER JOIN listasubmodelo ON listasubmodelo.id = listaproducto.listasubmodelo_id WHERE listasubmodelo.id = ${$listaSubmodeloId};`, (err, results, rows) => {


            results=JSON.parse(JSON.stringify(results))
            /* console.log(results) */
            console.log("Estos son los resultados de la busqueda")
/*             results = [
                {
                    nombre:"1",
                    SKU:1,
                    precio:1,
                    descripcion:"1",
                    marca:"1"
                },
                {
                nombre:"2",
                SKU:2,
                precio:2,
                descripcion:"2",
                marca:"2"
                },
                {
                    nombre:"3",
                    SKU:3,
                    precio:3,
                    descripcion:"3",
                    marca:"3"
                },       
                {
                nombre:"4",
                SKU:4,
                precio:4,
                descripcion:"4",
                marca:"4"
                },   
                {
                    nombre:"5",
                    SKU:5,
                    precio:5,
                    descripcion:"5",
                    marca:"5"
                },
                {
                    nombre:"6",
                    SKU:6,
                    precio:6,
                    descripcion:"6",
                    marca:"6"
                },
                {
                    nombre:"7",
                    SKU:7,
                    precio:7,
                    descripcion:"7",
                    marca:"7"
                },       
                {
                    nombre:"8",
                    SKU:8,
                    precio:8,
                    descripcion:"8",
                    marca:"8"
                },   
                {
                    nombre:"9",
                    SKU:9,
                    precio:9,
                    descripcion:"9",
                    marca:"9"
                },     
                {
                    nombre:"10",
                    SKU:10,
                    precio:10,
                    descripcion:"10",
                    marca:"10"
                },       
                {
                    nombre:"11",
                    SKU:11,
                    precio:11,
                    descripcion:"11",
                    marca:"11"
                },   
                {
                    nombre:"12",
                    SKU:12,
                    precio:12,
                    descripcion:"12",
                    marca:"12"
                },  
                {
                    nombre:"13",
                    SKU:13,
                    precio:13,
                    descripcion:"13",
                    marca:"13"
                },  
                {
                    nombre:"14",
                    SKU:14,
                    precio:14,
                    descripcion:"14",
                    marca:"14"
                },  
                {
                    nombre:"15",
                    SKU:15,
                    precio:15,
                    descripcion:"15",
                    marca:"15"
                },  
                {
                    nombre:"16",
                    SKU:16,
                    precio:16,
                    descripcion:"16",
                    marca:"16"
                },  
                {
                    nombre:"17",
                    SKU:17,
                    precio:17,
                    descripcion:"17",
                    marca:"17"
                },  
                {
                    nombre:"18",
                    SKU:18,
                    precio:18,
                    descripcion:"18",
                    marca:"18"
                },  
                {
                    nombre:"19",
                    SKU:19,
                    precio:19,
                    descripcion:"19",
                    marca:"19"
                },  
                {
                    nombre:"20",
                    SKU:20,
                    precio:20,
                    descripcion:"20",
                    marca:"20"
                },  
                {
                    nombre:"21",
                    SKU:21,
                    precio:21,
                    descripcion:"21",
                    marca:"21"
                },                                         
            ] */

            console.log(`ListaSubmodeloReciente = ${$listaSubmodeloId}, ListaPasada = ${idListaSubmodeloPasada} diferentes?
                       ${listaNueva[0]} undefined?,       ${parseInt(page)} es 1???`)

            if (parseInt(page) == 1 /* && listaNueva[0] == undefined */ && $listaSubmodeloId != idListaSubmodeloPasada) {
                console.log("************!*!*!*!*!*!*!*!*!********************************************!*!*!*!*!*!*!*!*****************************!*!*!*!*!*!")
                /* Acá sacamos la diferencia entre los resultados y 10 */
                lenResults = (results.length)
                let resto = lenResults % 10
                contadorPagina = 1;
                contadorResultado = 0;
                listaNueva = []
                idListaSubmodeloPasada = $listaSubmodeloId
          
    
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
                /* Cada item es guardado en la lista local, esta almacenará hasta 10 datos por vuelta
                y una vez alcance los 10 resultados, los agregará a la lista final y reseteará los contadores
                y la lista local, para la proxima vuelta empezar de 0 añadiendo items en una nueva lista local,
                en caso de que existan mas de 10 items restantes. En caso contrario entrará en los últimos */
                results.forEach(n => {
        
                    listaLocal.push(n)
                    contadorItem += 1
                    contadorVuelta += 1
                
                
                    //console.log(`Resto = ${resto}, listaObj ${lenResults} - contadorItem ${contadorItem} == ${lenResults - contadorItem}`)
                
                    if (contadorVuelta == 10) {
                        listaNueva.push(listaLocal)
                        contadorVuelta = 0
                        listaLocal = []
                    }
                /* Si la diferencia entre el contador y el total, es menor al resto, entramos en los ultimos */
                    if (lenResults - contadorItem < resto) {
                        console.log("entramos en los últimos")
                        listaResto.push(n)
                    }
                    
                })
                
                if (listaResto[0]) {
                listaNueva.push(listaResto)
                }
            }


            /* console.log(posicionArrayProductos, "En esta posicion buscará") */
            let resultados = []
            resultados = listaNueva[posicionArrayProductos]
        /*             
            console.log(contadorItem, "contadorVuelta")
            console.log(lenResults, "cantidadTotal")

            console.log("Se necesitan paginas : ", contadorPagina)
            console.log(lenResults, "Resultados totales") */

/*             console.log(listaNueva)
            console.log("Lista entera")
            console.log(listaNueva[1])
            console.log("Esta es la lista pos 1") */

            if (contadorPagina > page) {
                let nextPage = parseInt(page) + 1
/*                 console.log(nextPage, "Siguiente pagina")

                console.log(resultados)
                console.log("estos son los resultados enviados en el IF") */

                res.render('search', {
                    resultados,
                    contadorPagina,
                    nextPage,
                    $submodeloId,
                    $anyoId
                })

                resultados = []

/*                 console.log(resultados)
                console.log("Estos son los resultados una vez enviados en el IF") */

            } else {
/* 
                console.log(resultados)
                console.log("estos son los resultados enviados en el ELSE") */

                res.render('search', {
                    resultados,
                    contadorPagina
                })

            }


        })
    })

    


 

   
    


})



module.exports = router;
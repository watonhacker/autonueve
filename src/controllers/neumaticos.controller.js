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

let nextPage;
let previousPage;
let $anyoName;
let $anyoId;
let $submodeloId;
let $listaSubmodeloId

exports.getNeumaticos = () => {
    let sql = `SELECT * FROM producto WHERE producto.categoria_id = 1`;

    return new Promise((resolve, reject) => {
        mysqlConnection.query(sql, (err, results, rows) => {
            results=JSON.parse(JSON.stringify(results))
            console.log("ACA*AC*A*CA*C*AC*A*CA*C*ACA*C*AC*A*CS*C*ASC*AS*C*AS*C")
            console.log(results)
            resolve(results)
            
        })
    })
    

}



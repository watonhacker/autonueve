const router = require('express').Router()

const mysqlConnection = require('../database/database')
const comunaService = require('../api/comuna/comuna.service')
const productoService = require('../api/producto/producto.service')


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
function cleanZeros (numbers) {
    const numbersToArray = numbers.toString().split("");
    let gotANumber = false;
    const cleanedNumber = numbersToArray.filter((number, key) => {
      
      if (gotANumber === false) {
        if (number === '0') {
          if (numbersToArray[key+1] === '0'){ 
            return false
          } else {
            gotANumber = true;
            return false
          }
        }
      } else {
        return true;
      }

    })
    return cleanedNumber.join("")
    
  }

router.get('/', async (req, res) =>  {

    const parseandoItems = req.query.items.replace("[", "")
    const productos = parseandoItems.replace("]", "").split(",")

    const parseandoCantidades = req.query.amounts.replace("[","");
    const cantidades = parseandoCantidades.replace("]","").split(",");


    if (Object.entries(req.query).length > 0) {
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
                res.render("index")
            }
        )
    } else {
            // ahora estoy renderizando si esque viene algo en el params (ya que lo estoy borrando)
    // en realidad creo que debería hacer la petición considerando lo que esta en el dom ya ir
    // a buscar el id y la cantidad al formulario y hacer la consulta
    mysqlConnection.query("SELECT * FROM marca", (err, results, row) => {
        if (results !== undefined) {
            results=JSON.parse(JSON.stringify(results))
            resultados = results
            mysqlConnection.query(`SELECT * FROM producto ORDER BY id DESC LIMIT 12;`, (err, results, rows) => {

                lastProducts = results

                res.render('index', {
                    resultados,
                    lastProducts
                })
            })
        }
    

})
    }


    

})

module.exports = router;
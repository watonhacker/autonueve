const router = require('express').Router()

const mysqlConnection = require('../database/database')
const comunaService = require('../api/comuna/comuna.service')
const productoService = require('../api/producto/producto.service')

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
            mysqlConnection.query(`SELECT * FROM producto WHERE estado="A" ORDER BY id DESC LIMIT 12;`, (err, results, rows) => {

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
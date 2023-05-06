const router = require('express').Router()

const mysqlPool = require('../database/database')
const comunaService = require('../api/comuna/comuna.service')
const productoService = require('../api/producto/producto.service')

router.get('/', async (req, res) =>  {
    if (Object.entries(req.query).length !== 0) {
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

        const marca = await new Promise((resolve)=> {
            const sql = "SELECT * from marca order by nombre"

            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    console.error(err) 
                    reject(err)
                }
                connection.query(sql, (err, result) => {
                    if (err) { 
                        console.error(err) 
                        reject(err)
                    }
                    connection.release(); // Importante liberar la conexión
                    resolve(JSON.parse(JSON.stringify(result)))
                })
           
            })

        })

        const products = await new Promise((resolve) => {
            const sql = `SELECT * FROM producto WHERE estado="A" ORDER BY id DESC LIMIT 12;`

            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    console.error(err) 
                    reject(err)
                }
                connection.query(sql, (err, result) => {
                    if (err) { 
                        console.error(err) 
                        reject(err)
                    }
                    connection.release(); // Importante liberar la conexión
                    resolve(JSON.parse(JSON.stringify(result)))
                })
           
            })
        }) 

        res.render('index', {
            resultados: marca,
            lastProducts: products
        })
     
        }
    } else {
        
      
        const marca = await new Promise((resolve)=> {
            const sql = "SELECT * from marca order by nombre"

            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    console.error(err) 
                    reject(err)
                }
                connection.query(sql, (err, result) => {
                    if (err) { 
                        console.error(err) 
                        reject(err)
                    }
                    connection.release(); // Importante liberar la conexión
                    resolve(JSON.parse(JSON.stringify(result)))
                })
           
            })

        })

        const products = await new Promise((resolve) => {
            const sql = `SELECT * FROM producto WHERE estado="A" ORDER BY id DESC LIMIT 12;`

            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    console.error(err) 
                    reject(err)
                }
                connection.query(sql, (err, result) => {
                    if (err) { 
                        console.error(err) 
                        reject(err)
                    }
                    connection.release(); // Importante liberar la conexión
                    resolve(JSON.parse(JSON.stringify(result)))
                })
           
            })
        }) 

        res.render('index', {
            resultados: marca,
            lastProducts: products
        })
       

    }

    


    

})

module.exports = router;
const router = require('express').Router()
const mysqlConnection = require('../database/database')
const authController = require('../controllers/authControllers')
const productoService = require('../api/producto/producto.service')
const pedidoService = require('../api/pedido/pedido.service');
const mailControllers = require('../controllers/mailControllers')

router.get('/', authController.isAuthenticated, (req, res) => {
    res.render("admin", {user:req.user})
})

                            /* Rutas para modelos */

router.get('/models', authController.isAuthenticated, (req, res) => {

    mysqlConnection.query("SELECT * FROM modelo", (err, results) => {
        let resultsModels = results
        res.render("models", {
            resultsModels
        })
    })

   
})

router.get('/models/edit/', authController.isAuthenticated, (req, res) => {

    let id = req.query.id
    let sql = `SELECT id, nombre FROM modelo WHERE id = ${id}`
    mysqlConnection.query(sql, (err, results) => {
        results = JSON.parse(JSON.stringify(results))

        res.render("edit/models", {
            results:results[0]
        })
    })
})


router.post('/models/edit/', authController.isAuthenticated, (req, res) => {
    let nombre = req.body['nombre']

    let id = req.body['id']


    let sql = `UPDATE modelo SET nombre='${nombre}' WHERE id = ${id}`
    
    mysqlConnection.query(sql, (err, results) => {
        if (err) throw err;
        results = JSON.parse(JSON.stringify(results))
    })
    
    res.redirect("/admin/models")
   
})



router.get('/submodels', authController.isAuthenticated, (req,res) => {
    
    mysqlConnection.query("SELECT * from submodelo", (err, results) => {
        let resultsSubmodels = results;
        res.render("submodels", {
            resultsSubmodels
        })
    })

})

/* Brand routes */

router.get('/brands', authController.isAuthenticated, (req,res) => {
    
    mysqlConnection.query("SELECT * from marca", (err, results) => {
        let resultsBrands = results;
        res.render("brands", {
            resultsBrands
        })
    })

})

router.get('/brands/edit/', authController.isAuthenticated, (req, res) => {

    let id = req.query.id
    let sql = `SELECT id, nombre FROM marca WHERE id = ${id}`
    mysqlConnection.query(sql, (err, results) => {
        results = JSON.parse(JSON.stringify(results))

        res.render("edit/brands", {
            results:results[0]
        })
    })
})

router.post('/brands/edit/', authController.isAuthenticated, (req, res) => {
    let nombre = req.body['nombre']
    let id = req.body['id']
    let sql = `UPDATE marca SET nombre='${nombre}' WHERE id = ${id}`
    
    mysqlConnection.query(sql, (err, results) => {
        if (err) throw err;
        results = JSON.parse(JSON.stringify(results))

    })
    
    res.redirect("/admin/brands")
   
})

/* Edicion*/

router.post('/submodels/add', authController.isAuthenticated, (req, res) => {

    mysqlConnection.query(`INSERT INTO submodelo (nombre, modelo_id) VALUES ('${req.body.name}', ${req.body.model})`, (err, results) => {
        if (err) throw err;
        res.redirect("/submodels")
    })
    res.send("Ok")
})

router.get('/submodels/add', authController.isAuthenticated, (req, res) => {
    let submodelId = req.query.id

    let resultados;
    mysqlConnection.query("SELECT * FROM modelo", (err, results) => {
        results=JSON.parse(JSON.stringify(results))
        resultados = results;


        res.render("add-submodel", {
            resultados
        })
    })

})


                            /* Rutas para productos */

router.get('/products', authController.isAuthenticated, (req, res) => {

    mysqlConnection.query("SELECT * FROM producto", (err, results) => {
        let productResults = results
        res.render("products", {
            productResults
        })
    })
})

router.get('/products/edit/', authController.isAuthenticated, (req, res) => {

    let id = req.query.id
    let sql = `SELECT id, nombre, precio, marca, descripcion, cantidad, imagen FROM producto WHERE id = '${id}'`
    mysqlConnection.query(sql, (err, results) => {
        results = JSON.parse(JSON.stringify(results))

        res.render("edit/products", {
            results:results[0]
        })
    })
})

router.post('/products/edit/', authController.isAuthenticated, (req, res) => {
    let imagen = req.body['imagen']
    let id = req.body['id']

 
    let sql = `UPDATE producto SET imagen='${imagen}' WHERE id = '${id}'`
    
    mysqlConnection.query(sql, (err, results) => {
        if (err) throw err;
        results = JSON.parse(JSON.stringify(results))

    })
    
    res.redirect("/admin/products")
   
})


/* Rutas para categorías */

router.get('/categories', authController.isAuthenticated,  (req,res) => {
    mysqlConnection.query("SELECT * FROM categoria", (err, results) => {
        let categoriesResults = results
        res.render("categories", {
            categoriesResults
        })
    })
})

router.get('/categories/edit/', authController.isAuthenticated, (req, res) => {

    let id = req.query.id
    let sql = `SELECT id, nombre, imagen FROM categoria WHERE id = ${id}`
    mysqlConnection.query(sql, (err, results) => {
        results = JSON.parse(JSON.stringify(results))
        res.render("edit/categories", {
            results:results[0]
        })
    })
})

router.post('/categories/edit/', authController.isAuthenticated, (req, res) => {

    let imagen = req.body['imagen']
    let id = req.body['id']
    let sql = `UPDATE categoria SET imagen = '${imagen}' WHERE id = ${id}`
    
    mysqlConnection.query(sql, (err, results) => {
        if (err) throw err;
        results = JSON.parse(JSON.stringify(results))

    })
    
    res.redirect("/admin/categories")
   
})


                            /* Rutas para clientes */

router.get('/clients', authController.isAuthenticated,  (req,res) => {
    mysqlConnection.query("SELECT * FROM cliente", (err, results) => {

        if (err) throw err;
        let clientsResults = results
        res.render("clients", {
            clientsResults
        })
    })
})

router.get('/submodels/edit/', authController.isAuthenticated, (req, res) => {
    let id = req.query.id
    let sql = `SELECT id, nombre FROM submodelo WHERE id = ${id}`
    mysqlConnection.query(sql, (err, results) => {
        results = JSON.parse(JSON.stringify(results))
        res.render("edit/submodels", {
            results:results[0]
        })
    })
})

router.post('/submodels/edit/', authController.isAuthenticated, (req, res) => {
    let nombre = req.body['nombre']
    let id = req.body['id']
    let sql = `UPDATE submodelo SET nombre='${nombre}' WHERE id = ${id}`
    
    mysqlConnection.query(sql, (err, results) => {
        if (err) throw err;
        results = JSON.parse(JSON.stringify(results))
    })
    
    res.redirect("/admin/submodels")
   
})

router.get('/clients/edit/', authController.isAuthenticated, (req, res) => {
    let id = req.query.id
    let sql = `SELECT id, nombre, apellido, email, telefono, rut FROM cliente WHERE id = ${id}`
    mysqlConnection.query(sql, (err, results) => {
        results = JSON.parse(JSON.stringify(results))
        res.render("edit/clients", {
            results:results[0]
        })
    })
})



router.post('/clients/edit/', authController.isAuthenticated, (req, res) => {
    let nombre = req.body['nombre']
    let apellido = req.body['apellido']
    let email = req.body['email']
    let telefono = req.body['telefono']
    let rut = req.body['rut']
    let id = req.body['id']

    let sql = `UPDATE cliente SET nombre='${nombre}', apellido = '${apellido}', email='${email}', telefono='${telefono}', rut='${rut}' WHERE id = ${id}`
    
    mysqlConnection.query(sql, (err, results) => {
        if (err) throw err;
        results = JSON.parse(JSON.stringify(results))
    })
    
    res.redirect("/admin/clients")
   
})

router.get('/pedidos', authController.isAuthenticated, async (req, res) => {
    


    //nos traemos todas las cotizaciones select * from pedido
    // luego seleccionamos el id del pedido y lo mandamos en la consulta para ver el detalle
    // este detalle a su vez debe tener un estado,
    const pedidos = await pedidoService.getPedidosFormat();
    res.render("pedidos", {
        pedidosResults: pedidos
    })
    //Aca agarro los pedidos y los renderizo en aspectos generales
    // cada pedido tendra un link que será el id, ese id lo usaremos para recorrer luego listapedidos y traernos la info de ese pedido
    // el pedido a su ve
})

router.put('/pedidos/estado', authController.isAuthenticated, async (req, res) => {

    const cambiarEstado = await pedidoService.cambiarEstadoPedido(req.body.pedido_id, req.body.estado_id);
    const pedido = await pedidoService.getPedidoFormatById(req.body.pedido_id);

    const mailTo = pedido.email;

    const dataPedido = {
        mailTo,
        "pedidoId": req.body.pedido_id,
    }

    if (cambiarEstado.affectedRows > 0) {
        if (req.body.estado_id == 1) {
            const response = mailControllers.generarMailsPedido(dataPedido);
            res.send(response) 
        } else if (req.body.estado_id == 2) {
            //aca estamos obteniendo los productos asociados al pedido
            const associatedProducts = await productoService.getProductosAssociated(req.body.pedido_id)
            //aca tamos generando las promesas de sustraccion
            const updatedProducts = associatedProducts.map(async (producto) => {
                const response = await productoService.substractStock(producto.cantidad, producto.producto_id);
                return response
            })
            //aplicamos promesas y si todo ok mandamos mensajitos.
            Promise.all(updatedProducts).then(values => {
                const response = mailControllers.generarMailsPago(dataPedido);
                res.send(response) ;
            }).catch(err => console.log(err)) 

        } else if (req.body.estado_id == 3) {
            const response = mailControllers.generarMailsDespachado(dataPedido);
            res.send(response) 
        }
    } else {
        res.send({
            message: "No se ha podido cambiar el estado del pedido"
        }) 
    }


})

router.get('/pedidos/:id', authController.isAuthenticated, async (req, res) => {
    const pedidoId = parseInt(req.params.id)
    
    if (!isNaN(pedidoId)) {
        const listaProducto =  await pedidoService.getListaPedidoAssociated(pedidoId);

        if (listaProducto.length > 0) {

            const cantidades = listaProducto.map((producto) => {
                return producto.cantidad;
            })
            const productosIds = listaProducto.map((producto) => {
                return producto.producto_id;
            })
            const infoPedido = await pedidoService.getPedidoFormatById(pedidoId)
            const productos = await productoService.getProductsByIds(productosIds)
        
            const productosYCantidades = productos[0].map((producto, key) => {
                producto['cantidad'] = cantidades[key];
                producto['subtotal'] = producto['cantidad'] * producto['precio']
                return producto
            })
        
            
        
            //productosYcantidades debe ser renderizado, además con la info del pedido/cliente
            res.render("detail-pedido", {
                infoPedido, 
                productosYCantidades
            })
        } else {
            res.render("pedido-not-found")
        }
        } else {
            res.render("pedido-not-found")
        }

    
})



module.exports = router;
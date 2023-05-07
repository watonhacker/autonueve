const router = require('express').Router()
const mysqlPool = require('../database/database')
const authController = require('../controllers/authControllers')
const productoService = require('../api/producto/producto.service')
const pedidoService = require('../api/pedido/pedido.service');
const mailControllers = require('../controllers/mailControllers')

router.get('/', authController.isAuthenticated, (req, res) => {
    res.render("admin", {user:req.user})
})

                            /* Rutas para modelos */

router.get('/models', authController.isAuthenticated, (req, res) => {

    const sql = "SELECT * FROM modelo order by nombre";

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
            let resultsModels = result
            res.render("models", {
                resultsModels
            })
        })
   
    })

   
})

router.get('/models/edit/', authController.isAuthenticated, (req, res) => {

    let id = req.query.id
    let sql = `SELECT id, nombre FROM modelo WHERE id = ${id}`


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
            const results = JSON.parse(JSON.stringify(result))
            res.render("edit/models", {
                results:results[0]
            })
        })
   
    })
})


router.post('/models/edit/', authController.isAuthenticated, (req, res) => {
    let nombre = req.body['nombre']

    let id = req.body['id']


    let sql = `UPDATE modelo SET nombre='${nombre}' WHERE id = ${id}`
    
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
            return(JSON.parse(JSON.stringify(result)))
        })
   
    })
    
    res.redirect("/admin/models")
   
})



router.get('/submodels', authController.isAuthenticated, (req,res) => {
    
    const sql = "SELECT * from submodelo order by id";

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
            let resultsSubmodels = result;
            res.render("submodels", {
                resultsSubmodels
            })
        })
   
    })

})

/* Brand routes */

router.get('/brands', authController.isAuthenticated, (req,res) => {
    
    const sql = "SELECT * from marca order by nombre";

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
            let resultsBrands = result;
            res.render("brands", {
                resultsBrands
            })
        })
   
    })

})

router.get('/brands/edit/', authController.isAuthenticated, (req, res) => {

    let id = req.query.id
    let sql = `SELECT id, nombre FROM marca WHERE id = ${id}`

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
            const results = JSON.parse(JSON.stringify(result))

            res.render("edit/brands", {
                results:results[0]
            })
        })
   
    })
})

router.post('/brands/edit/', authController.isAuthenticated, (req, res) => {
    let nombre = req.body['nombre']
    let id = req.body['id']
    let sql = `UPDATE marca SET nombre='${nombre}' WHERE id = ${id}`
    

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
            const results = JSON.parse(JSON.stringify(result))
        })
   
    })
    
    res.redirect("/admin/brands")
   
})

/* Edicion*/

router.post('/submodels/add', authController.isAuthenticated, (req, res) => {

    const sql = `INSERT INTO submodelo (nombre, modelo_id) VALUES ('${req.body.name}', ${req.body.model})`;
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
            res.redirect("/submodels")
        })
   
    })

})

router.get('/submodels/add', authController.isAuthenticated, (req, res) => {

    const sql = "SELECT * FROM modelo order by nombre";

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
            const resultados = JSON.parse(JSON.stringify(result))

            res.render("add-submodel", {
                resultados
            })
        })
   
    })

})


                            /* Rutas para productos */

router.get('/products', authController.isAuthenticated, (req, res) => {

    const sql = "SELECT * FROM producto WHERE estado='A'";


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
            let productResults = result
            res.render("products", {
                productResults
            })
        })
   
    })
})

router.get('/products/edit/', authController.isAuthenticated, (req, res) => {

    let id = req.query.id
    let sql = `SELECT id, nombre, precio, marca, descripcion, cantidad, imagen, imagen_2, imagen_3 FROM producto WHERE id = '${id}'`
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
            const results = JSON.parse(JSON.stringify(result))

            res.render("edit/products", {
                results:results[0]
            })
        })
   
    })
})

router.post('/products/edit/', authController.isAuthenticated, (req, res) => {

    const imagen = req.body['imagen'];
    const imagen_2 = req.body['imagen_2'];
    const imagen_3 = req.body['imagen_3'];
    const id = req.body['id'];

    let sql = `UPDATE producto SET imagen='${imagen}', imagen_2 = '${imagen_2}', imagen_3 = '${imagen_3}' WHERE id = '${id}'`;
    

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
        })
   
    })
    
    res.redirect("/admin/products")
   
})


/* Rutas para categorías */

router.get('/categories', authController.isAuthenticated,  (req,res) => {

    const sql = "SELECT * FROM categoria";

    mysqlPool.getConnection((err, connection) => {
        if (err) { 
            console.error(err) 
            reject(err)
        }
        try {
            connection.query(sql, (err, result) => {
                if (err) { 
                    console.error(err) 
                    reject(err)
                }
                connection.release(); // Importante liberar la conexión
                let categoriesResults = result
                res.render("categories", {
                    categoriesResults
                })
            })
        } catch (err) {
            console.error(err);
            reject(err);
        }

   
    })
})

router.get('/categories/edit/', authController.isAuthenticated, (req, res) => {

    let id = req.query.id
    let sql = `SELECT id, nombre, imagen FROM categoria WHERE id = ${id}`

    mysqlPool.getConnection((err, connection) => {
        if (err) { 
            console.error(err) 
            reject(err)
        }
        try {
            connection.query(sql, (err, result) => {
                if (err) { 
                    console.error(err) 
                    reject(err)
                }
                connection.release(); // Importante liberar la conexión
                const results = JSON.parse(JSON.stringify(result))
                res.render("edit/categories", {
                    results:results[0]
                })
            })
        } catch (err) {
            console.error(err);
            reject(err);
        }

   
    })
})

router.post('/categories/edit/', authController.isAuthenticated, (req, res) => {

    let imagen = req.body['imagen']
    let id = req.body['id']
    let sql = `UPDATE categoria SET imagen = '${imagen}' WHERE id = ${id}`
    

    mysqlPool.getConnection((err, connection) => {
        if (err) { 
            mysqlPool.emit('error', err)
            console.error(err) 

        }
        try {
            connection.query(sql, (err, result) => {
                if (err) { 
                    console.error(err) 
                    mysqlPool.emit('error', err)

                }
                connection.release(); // Importante liberar la conexión
                return result;
            })
        } catch (error) {
            mysqlPool.emit('error', err)
            console.error(error);

        }

    })
    
    res.redirect("/admin/categories")
   
})


                            /* Rutas para clientes */

router.get('/clients', authController.isAuthenticated,  (req,res) => {


    const sql = "SELECT * FROM cliente";

    mysqlPool.getConnection((err, connection) => {
        if (err) { 
            mysqlPool.emit('error', err)
            console.error(err) 

        }
        try {
            connection.query(sql, (err, result) => {
                if (err) { 
                    console.error(err) 
                    mysqlPool.emit('error', err)

                }
                connection.release(); // Importante liberar la conexión
                let clientsResults = result
                res.render("clients", {
                    clientsResults
                })
            })
        } catch (error) {
            mysqlPool.emit('error', err)
            console.error(error);

        }

    })
})

router.get('/submodels/edit/', authController.isAuthenticated, (req, res) => {
    let id = req.query.id

    const sql = `SELECT id, nombre FROM submodelo WHERE id = ${id}`
        
    mysqlPool.getConnection((err, connection) => {
        if (err) { 
            mysqlPool.emit('error', err)
            console.error(err) 

        }
        try {
            connection.query(sql, (err, result) => {
                if (err) { 
                    console.error(err) 
                    mysqlPool.emit('error', err)
                }
                connection.release(); // Importante liberar la conexión
                const results = JSON.parse(JSON.stringify(result))
                res.render("edit/submodels", {
                    results:results[0]
                })
            })
        } catch (err) {
            mysqlPool.emit('error', err)
            console.error(err);

        }

   
    })
})

router.post('/submodels/edit/', authController.isAuthenticated, (req, res) => {
    let nombre = req.body['nombre']
    let id = req.body['id']


    const sql = `UPDATE submodelo SET nombre='${nombre}' WHERE id = ${id}`
        
    mysqlPool.getConnection((err, connection) => {
        if (err) { 
            mysqlPool.emit('error', err)
            console.error(err) 

        }
        try {
            connection.query(sql, (err, result) => {
                if (err) { 
                    console.error(err) 
                    mysqlPool.emit('error', err)
                }
                connection.release(); // Importante liberar la conexión
                return(JSON.parse(JSON.stringify(result))) // cambiar esto
            })
        } catch (err) {
            mysqlPool.emit('error', err)
            console.error(err);

        }

   
    })
    
    res.redirect("/admin/submodels")
   
})

router.get('/clients/edit/', authController.isAuthenticated, (req, res) => {
    let id = req.query.id


    const sql = `SELECT id, nombre, apellido, email, telefono, rut FROM cliente WHERE id = ${id}`
        
    mysqlPool.getConnection((err, connection) => {
        if (err) { 
            mysqlPool.emit('error', err)
            console.error(err) 

        }
        try {
            connection.query(sql, (err, result) => {
                if (err) { 
                    console.error(err) 
                    mysqlPool.emit('error', err)
                }
                connection.release(); // Importante liberar la conexión
                const results = JSON.parse(JSON.stringify(result))
                res.render("edit/clients", {
                    results:results[0]
                })
            })
        } catch (err) {
            mysqlPool.emit('error', err)
            console.error(err);

        }

   
    })
})



router.post('/clients/edit/', authController.isAuthenticated, (req, res) => {
    let nombre = req.body['nombre']
    let apellido = req.body['apellido']
    let email = req.body['email']
    let telefono = req.body['telefono']
    let rut = req.body['rut']
    let id = req.body['id']

    const sql = `UPDATE cliente SET nombre='${nombre}', apellido = '${apellido}', email='${email}', telefono='${telefono}', rut='${rut}' WHERE id = ${id}`
        
    mysqlPool.getConnection((err, connection) => {
        if (err) { 
            mysqlPool.emit('error', err)
            console.error(err) 

        }
        try {
            connection.query(sql, (err, result) => {
                if (err) { 
                    console.error(err) 
                    mysqlPool.emit('error', err)
                }
                connection.release(); // Importante liberar la conexión
                return(JSON.parse(JSON.stringify(result))) // cambiar esto
            })
        } catch (err) {
            mysqlPool.emit('error', err)
            console.error(err);

        }

   
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
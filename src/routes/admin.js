const router = require('express').Router()
const mysqlConnection = require('../database/database')
const authController = require('../controllers/authControllers')

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
    let sql = `SELECT id, nombre, precio, marca, descripcion, cantidad, imagen FROM producto WHERE id = ${id}`
    mysqlConnection.query(sql, (err, results) => {
        results = JSON.parse(JSON.stringify(results))

        res.render("edit/products", {
            results:results[0]
        })
    })
})

router.post('/products/edit/', authController.isAuthenticated, (req, res) => {
    let nombre = req.body['nombre']
    let precio = req.body['precio']
    let marca = req.body['marca']
    let descripcion = req.body['descripcion']
    let cantidad = req.body['cantidad']
    let imagen = req.body['imagen']
    let id = req.body['id']


    let sql = `UPDATE producto SET nombre='${nombre}', precio = ${precio}, marca='${marca}', descripcion="${descripcion}", cantidad=${cantidad}, imagen='${imagen}' WHERE id = ${id}`
    
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
    let nombre = req.body['nombre']
    let imagen = req.body['imagen']
    let id = req.body['id']
    let sql = `UPDATE categoria SET nombre='${nombre}', imagen = '${imagen}' WHERE id = ${id}`
    
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


module.exports = router;
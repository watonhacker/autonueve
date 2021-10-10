const router = require('express').Router()
const mysqlConnection = require('../database/database')
const authController = require('../controllers/authControllers')

router.get('/', authController.isAuthenticated, (req, res) => {
    res.render("admin", {user:req.user})
    console.log(req.user)
    console.log("USUARIOOO")
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

router.get('/submodels', authController.isAuthenticated, (req,res) => {
    
    mysqlConnection.query("SELECT * from submodelo", (err, results) => {
        let resultsSubmodels = results;
        res.render("submodels", {
            resultsSubmodels
        })
    })

})

router.get('/brands', authController.isAuthenticated, (req,res) => {
    
    mysqlConnection.query("SELECT * from marca", (err, results) => {
        let resultsBrands = results;
        res.render("brands", {
            resultsBrands
        })
    })

})

/* Edicion*/

router.post('/submodels/add', authController.isAuthenticated, (req, res) => {
    console.log(req.body)
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

    /* Estos servían para algo pero nose para que jaja */
/*     mysqlConnection.query(`SELECT * FROM submodelo WHERE id = ${submodelId}`, (err, results) => {
        let editedSubmodel = results;
        let resultados;
        mysqlConnection.query("SELECT * FROM modelo", (err, results) => {
            results=JSON.parse(JSON.stringify(results))
            resultados = results;


            res.render("add-submodel", {
                editedSubmodel,
                resultados
            })
        })


    }) */
})


                            /* Rutas para productos */

router.get('/products', (req, res) => {

    mysqlConnection.query("SELECT * FROM producto", (err, results) => {
        let productResults = results
        res.render("products", {
            productResults
        })
    })
})

router.get('/categories', (req,res) => {
    mysqlConnection.query("SELECT * FROM categoria", (err, results) => {
        let categoriesResults = results
        res.render("categories", {
            categoriesResults
        })
    })
})


                            /* Rutas para clientes */

router.get('/clients', (req,res) => {
    mysqlConnection.query("SELECT * FROM cliente", (err, results) => {

        if (err) throw err;
        let clientsResults = results
        console.log(results)
        res.render("clients", {
            clientsResults
        })
    })
})

module.exports = router;
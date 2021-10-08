const router = require('express').Router()
const mysqlConnection = require('../database/database')
const authController = require('../controllers/authControllers')

router.get('/', authController.isAuthenticated, (req, res) => {
    res.render("admin", {user:req.user})
    console.log(req.user)
    console.log("USUARIOOO")
})

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

module.exports = router;
const router = require('express').Router()
const mysqlConnection = require('../database/database')

router.get('/', (req, res) => {
    let selectedBrand = req.query.brand
    let brandId;
    
    if (selectedBrand != undefined) {

        mysqlConnection.query(`SELECT marca.id FROM marca WHERE marca.nombre = '${selectedBrand}'`, (err, results, rows) => {
            
            if (results[0]) {
                let resultsId = results[0]['id']
    
                mysqlConnection.query(`SELECT * FROM modelo WHERE marca_id = ${resultsId}`, (err, results, rows) => {
                    if (err) {
                        console.log(err)
                    } 
                    res.send({
                        results
                    })                
                })
            }
            
        })

    } 

})



module.exports = router;
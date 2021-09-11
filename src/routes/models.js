const router = require('express').Router()
const mysqlConnection = require('../database/database')

router.get('/', (req, res) => {
    let selectedBrand = req.query.brand
    let brandId;
    
    if (selectedBrand != undefined) {

        console.log("tenemos brand")
        console.log(selectedBrand)

        mysqlConnection.query(`SELECT marca.id FROM marca WHERE marca.nombre = '${selectedBrand}'`, (err, results, rows) => {
            
            if (results[0]) {

                console.log(results, "results")

                let resultsId = results[0]['id']
                console.log(resultsId, "brand")
    
                mysqlConnection.query(`SELECT * FROM modelo WHERE marca_id = ${resultsId}`, (err, results, rows) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(results)
                    }
                    res.send({
                        results
                    })                
                })
            }
            
        })

    } 

})

/* router.get('/:brand', (req, res) => {
    console.log(req.query.brand)
    res.send({
        brand
    })
}) */


module.exports = router;
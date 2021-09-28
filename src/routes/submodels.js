const router = require('express').Router()
const mysqlConnection = require('../database/database')

router.post('/', (req, res) => {
    console.log(req.body)
    res.send("Ok")
})

router.get('/', (req, res) => {
    let selectedModel = req.query.model
    let ModelId;
    
    if (selectedModel != undefined) {

        console.log("tenemos model")
        console.log(selectedModel)

        mysqlConnection.getConnection(function(err, connection) {
            if (err) throw err;
            
            //codigo aca
            mysqlConnection.query(`SELECT modelo.id FROM modelo WHERE modelo.nombre = '${selectedModel}'`, (err, results, rows) => {
            
                if (results[0]) {
    
                    console.log(results, "results")
    
                    let resultsId = results[0]['id']
                    console.log(resultsId, "model")
        
                    mysqlConnection.query(`SELECT * FROM submodelo WHERE modelo_id = ${resultsId}`, (err, results, rows) => {
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
        
            connection.release()
        
            if (err) throw err;
        })
        



    } 

})


module.exports = router;
const router = require('express').Router()
const mysqlConnection = require('../database/database')

router.get('/', (req, res) => {
    let selectedSubmodel = req.query.submodel
    let SubmodelId;
    
    if (selectedSubmodel != undefined) {

        console.log("tenemos submodel")
        console.log(selectedSubmodel)

        mysqlConnection.query(`SELECT submodelo.id FROM submodelo WHERE submodelo.nombre = "${selectedSubmodel}"`, (err, results, rows) => {
            if (err) throw err;
            console.log("id")
            SubmodelId = results[0]['id']

            mysqlConnection.query(`SELECT fabricacion.id, fabricacion.fecha FROM listasubmodelo INNER JOIN submodelo ON submodelo.id = listasubmodelo.submodelo_id INNER JOIN fabricacion ON fabricacion.id = listasubmodelo.fabricacion_id WHERE submodelo.id = ${SubmodelId}`, (err, results, rows) => {

                if (err) {
                    console.log(err)
                }
    
                console.log("yeaaar", selectedSubmodel)
    
                console.log(results)

                res.send({
                    results
                })
                
/*                 if (results[0]) {
    
                    console.log(results, "results")
    
                    let resultsId = results[0]['id']
                    console.log(resultsId, "submodel")
        
                    mysqlConnection.query(`SELECT * FROM fabricacion WHERE modelo_id = ${resultsId}`, (err, results, rows) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log(results)
                        }

                        console.log("Enviando")
                        res.send({
                            results
                        })                
                    })
                } */
                
            })

        })
        
        

        

    } 

})


module.exports = router;
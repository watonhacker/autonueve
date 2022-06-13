const router = require('express').Router()
const mysqlConnection = require('../database/database')

router.get('/', (req, res) => {
    let selectedSubmodel = req.query.submodel
    let SubmodelId;
    
    if (selectedSubmodel != undefined) {

        mysqlConnection.query(`SELECT submodelo.id FROM submodelo WHERE submodelo.nombre = '${selectedSubmodel}'`, (err, results, rows) => {
            if (err) throw err;

            SubmodelId = results[0]['id']

            mysqlConnection.query(`SELECT fabricacion.id, fabricacion.fecha FROM listasubmodelo INNER JOIN submodelo ON submodelo.id = listasubmodelo.submodelo_id INNER JOIN fabricacion ON fabricacion.id = listasubmodelo.fabricacion_id WHERE submodelo.id = ${SubmodelId}`, (err, results, rows) => {

                if (err) {
                    console.log(err)
                }

                res.send({
                    results,
                    SubmodelId
                })
                
                
            })

        })
        
        

        

    } 

})


module.exports = router;
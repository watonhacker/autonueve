const router = require('express').Router()
const mysqlPool = require('../database/database')

router.get('/', async (req, res) => {
    let selectedSubmodel = req.query.submodel
    let SubmodelId;
    
    if (selectedSubmodel != undefined) {

        const submodelId = await new Promise((resolve)=> {
            const sql = `SELECT submodelo.id FROM submodelo WHERE submodelo.nombre = '${selectedSubmodel}'`
            
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
                    resolve(results[0]['id'])
                })
           
            })
        
        })

        const fabricacionId = await new Promise((resolve) => {
            const sql =`SELECT fabricacion.id, fabricacion.fecha FROM listasubmodelo INNER JOIN submodelo ON submodelo.id = listasubmodelo.submodelo_id INNER JOIN fabricacion ON fabricacion.id = listasubmodelo.fabricacion_id WHERE submodelo.id = ${SubmodelId}`
            
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
                    resolve(JSON.parse(JSON.stringify(result)))
                })
           
            })
            
            

        })

           
        res.send({
            results: fabricacionId,
            SubmodelId: submodelId
        })
        
       
        

        

    } 

})


module.exports = router;
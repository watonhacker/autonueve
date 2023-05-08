const router = require('express').Router()
const mysqlPool = require('../database/database')

router.post('/', (req, res) => {
    console.log(req.body)
    res.send("Ok")
})




router.get('/', async (req, res) => {
    let selectedModel = req.query.model
    
    if (selectedModel != undefined) {

        const modelId = await new Promise((resolve) => {

            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    console.error(err) 
                    
                }
                connection.query(`SELECT modelo.id FROM modelo WHERE modelo.nombre = '${selectedModel}'`, (err, result) => {
                    if (err) { 
                        console.error(err) 
                        
                    }
                    connection.release(); // Importante liberar la conexión

             
                    let resultsId = result[0]['id']   
                    resolve(JSON.parse(JSON.stringify(resultsId)))
           

                })
            })


        })

        const results = await new Promise((resolve) => {

            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    console.error(err) 
                    
                }
                connection.query(`SELECT * FROM submodelo WHERE modelo_id = ${modelId}`, (err, result) => {
                    if (err) { 
                        console.error(err) 
                        
                    }
                    connection.release(); // Importante liberar la conexión
                    resolve(JSON.parse(JSON.stringify(result)))
                })
            })
        })

        res.send({
            results
        })   

    } 

})

router.get('/edit/:id', (req, res) => {
    let id = req.params.id
    res.render("index")
})



router.get('/edit', (req, res) => {
    res.send('ok');
})




module.exports = router;
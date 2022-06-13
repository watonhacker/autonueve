const router = require('express').Router()
const mysqlConnection = require('../database/database')

router.post('/', (req, res) => {
    console.log(req.body)
    res.send("Ok")
})

let idSubmodel;



router.get('/', (req, res) => {
    let selectedModel = req.query.model
    let ModelId;
    
    if (selectedModel != undefined) {

        mysqlConnection.query(`SELECT modelo.id FROM modelo WHERE modelo.nombre = '${selectedModel}'`, (err, results, rows) => {
            
            if (results[0]) {
                let resultsId = results[0]['id']

                idSubmodel = resultsId
                mysqlConnection.query(`SELECT * FROM submodelo WHERE modelo_id = ${resultsId}`, (err, results, rows) => {

                    idSubmodel = resultsId
        
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

router.get('/edit/:id', (req, res) => {
    let id = req.params.id
    res.render("index")
})



router.get('/edit', (req, res) => {
    res.send('ok');
})




module.exports = router;
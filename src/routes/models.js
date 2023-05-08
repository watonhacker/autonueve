const router = require('express').Router()
const mysqlPool = require('../database/database')

router.get('/', async (req, res) => {
    let selectedBrand = req.query.brand
    
    if (selectedBrand != undefined) {

       const brandId = await new Promise((resolve) => {

        const sql = `SELECT marca.id FROM marca WHERE marca.nombre = '${selectedBrand}'`;

        mysqlPool.getConnection((err, connection) => {
            if (err) { 
                console.error(err) 
                
            }
            connection.query(sql, (err, result) => {
                if (err) { 
                    console.error(err) 
                    
                }
                connection.release(); // Importante liberar la conexión
                resolve(result[0]['id'])
            })
        })
       })
       
       const models = await new Promise((resolve) => {

        const sql = `SELECT * FROM modelo WHERE marca_id = ${brandId} order by nombre`;

        mysqlPool.getConnection((err, connection) => {
            if (err) { 
                console.error(err) 
                
            }
            connection.query(sql, (err, result) => {
                if (err) { 
                    console.error(err) 
                    
                }
                connection.release(); // Importante liberar la conexión
                resolve(JSON.parse(JSON.stringify(result)))
            })
        })

       })


        res.send({
            results: models
        })    

    } 

})



module.exports = router;
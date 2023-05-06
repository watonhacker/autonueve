const router = require('express').Router();
const mysqlPool = require('../database/database')

router.get('/', async (req, res) => {
  
    let resultados = await new Promise ((resolve) => {
        const sql = "SELECT * FROM marca order by nombre";
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

    let lastProducts = await new Promise((resolve) => {
        const sql = `SELECT * FROM producto WHERE cantidad >= 0 AND estado="A" ORDER BY id DESC LIMIT 12;`;
        
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

    res.render('index', {
        resultados,
        lastProducts
    })
})


module.exports = router;
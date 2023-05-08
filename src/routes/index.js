const router = require('express').Router();
const mysqlPool = require('../database/database')

router.get('/', async (req, res) => {
  
    let resultados = await new Promise ((resolve, reject) => {
        const sql = "SELECT * FROM marca order by nombre";
        mysqlPool.getConnection((err, connection) => {
            if (err) { 
                mysqlPool.emit('error', err)
                console.error(err) 
                
            }
            try {
                connection.query(sql, (err, result) => {
                    if (err) { 
                        console.error(err) 
                        mysqlPool.emit('error', err)
                        
                    }
                    connection.release(); // Importante liberar la conexión
                    resolve(JSON.parse(JSON.stringify(result)))
                })
            } catch (error) {
                mysqlPool.emit('error', err)
                console.error(error);
                ;
            }
  
        })
        
    })

    let lastProducts = await new Promise((resolve) => {
        const sql = `SELECT * FROM producto WHERE cantidad >= 0 AND estado="A" ORDER BY id DESC LIMIT 12;`;
        
        mysqlPool.getConnection((err, connection) => {
            if (err) { 
                mysqlPool.emit('error', err)
                console.error(err) 

            }
            try {
                connection.query(sql, (err, result) => {
                    if (err) { 
                        console.error(err) 
                        mysqlPool.emit('error', err)
                    }
                    connection.release(); // Importante liberar la conexión
                    resolve(JSON.parse(JSON.stringify(result))) // cambiar esto
                })
            } catch (err) {
                mysqlPool.emit('error', err)
                console.error(err);

            }

       
        })
    })

    res.render('index', {
        resultados,
        lastProducts
    })
})


module.exports = router;
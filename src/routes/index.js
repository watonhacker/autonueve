const router = require('express').Router();
const mysqlConnection = require('../database/database')

router.get('/', (req, res) => {

    let resultados;

    mysqlConnection.getConnection(function(err, connection) {
        if (err) throw err;
        
        //codigo aca
        mysqlConnection.query("SELECT * FROM marca", (err, results, row) => {
            /* results=JSON.parse(JSON.stringify(results)) */
            resultados = results
            console.log(resultados)
            res.render('index', {
                resultados
            })
        })
    
        connection.release()
    
        if (err) throw err;
    })

    
    

   /*  resultados = 1 */
})
module.exports = router;
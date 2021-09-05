const express = require('express')
const router = express.Router()
const connection = require('../database/database')



router.get('/', (req, res) => {
    
    res.render('index')

    /* connection.query("SELECT * FROM productos", (err, results, rows) => {
        for (result of results) {
            console.log(result)
        }
    }) */
})

router.post('/', (req, res) => {
    
    res.send("Hola por post1")
})

module.exports = router;

const router = require('express').Router();
const mysqlConnection = require('../database/database')
const { getBrands } = require('../controllers/androidControllers')

router.get('/', (req, res) => {
    getBrands()
    .then(data => {
        res.send(data)
    })
})

module.exports = router;
const router = require('express').Router()
const authControllers = require('../controllers/authControllers')
const ventaControllers = require('../controllers/ventaControllers')

/* Vistas */

router.get('/', (req, res) => {
    ventaControllers.guardarListaPedido()
    res.render("signup")

})

router.post('/', authControllers.register)



/* Rutas para controller */


module.exports = router;
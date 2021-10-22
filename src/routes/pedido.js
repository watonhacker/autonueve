const router = require('express').Router()

router.get('/', (req, res) => {
    res.render("pedido")
})


module.exports = router;
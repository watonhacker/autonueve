const router = require('express').Router()

router.get('/', (req, res) => {
    res.render("nosotros", {alert:false})
})

module.exports = router
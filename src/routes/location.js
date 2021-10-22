const router = require('express').Router()

router.get('/', (req, res) => {
    res.render("location", {alert:false})
})

module.exports = router
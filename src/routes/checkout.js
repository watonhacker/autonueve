const router = require('express').Router()


router.post('/', (req, res) => {
    res.send("checkout")
    console.log(req.body)
    console.log(req.params)
    console.log(req.query)

})


module.exports = router;
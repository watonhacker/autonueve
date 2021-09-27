const router = require('express').Router()
const authController = require('../controllers/authControllers')

router.get('/', authController.isAuthenticated, (req, res) => {
    res.render("admin", {user:req.user})
    console.log(req.user)
    console.log("USUARIOOO")
})


module.exports = router;
const router = require('express').Router()
const authController = require('../controllers/authControllers')

router.get('/', authController.isAuthenticated, (req, res) => {
    res.render("admin")
})


module.exports = router;
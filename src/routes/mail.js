const router = require('express').Router();
const mailControllers = require('../controllers/mailControllers.js')


router.post('/generar', (req, res) => {
    const body = {
        message: req.body.message,
        subject: req.body.subject,
        mail: req.body.mail,
        html: req.body.html || undefined
    }


    console.log(body)
    const response = mailControllers.generarPedido(body);  
    res.send(response)
})


module.exports = router;
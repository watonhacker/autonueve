const router = require('express').Router();
const mailControllers = require('../controllers/mailControllers.js')


router.post('/generar', (req, res) => {
    const body = {
        message: req.body.message,
        subject: req.body.subject,
        mail: req.body.mail,
        html: req.body.html || undefined,
        pedidoId: req.body.pedidoId
    }

    const response = mailControllers.generarPedido(body);  
    res.send(response)
})

router.post('/generar/contacto', (req, res) => {
    const body = {
        message: req.body.message,
        subject: req.body.subject,
        mail: req.body.mail,
        html: req.body.html || undefined
    }

    const response = mailControllers.generarPedidoContacto(body);  
    res.send(response)
})


router.get('/pagado', (req, res) => {
    const bodyCliente = {
        message: req.body.message,
        subject: req.body.subject,
        mail: req.body.mail,
        html: req.body.html || undefined
    }

    const bodyAdministrador = {
        message: req.body.message,
        subject: req.body.subject,
        mail: req.body.mail,
        html: req.body.html || undefined
    }

    Promise.all([
        mailControllers.generarPedido(bodyCliente),
        mailControllers.generarPedido(bodyAdministrador)
    ])


    res.send(response)
})


router.get('/enviado', (req, res) => {
    const body = {
        message: req.body.message,
        subject: req.body.subject,
        mail: req.body.mail,
        html: req.body.html || undefined
    }

    const response = mailControllers.generarPedido(body);  
    res.send(response)
})




module.exports = router;
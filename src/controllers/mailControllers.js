const nodemailer = require('nodemailer');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

exports.generarPedido = (body) => {

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: process.env.MAIL,
            pass: process.env.PASS
        }
    })
    
    const mensaje = body.message;
    const subject = body.subject;
    const mailTo = body.mail;
    const html = body.html;

    const mailOptionsCliente = {
        from: process.env.MAIL,
        to: mailTo,
        subject,
        text: mensaje,
        html: html || mensaje
    }

    const mailOptionsAdmin = {
        from: process.env.MAIL,
        to: process.env.MAIL,
        subject: "Se ha generado un nuevo pedido en Autonueve.cl - [Copia Administrador]",
        text: "Se ha generado un nuevo pedido en Autonueve.cl - [Copia Administrador]",
        html: html || mensaje
    }



    async function sendCliente() {
        try {
            const response = await transporter.sendMail(mailOptionsCliente);
            return response
            
        } catch(err) {
            console.log(err);
        }
    }

    async function sendAdmin() {
        try {
            const response = await transporter.sendMail(mailOptionsAdmin);
            return response
            
        } catch(err) {
            console.log(err);
        }
    }

    sendCliente();
    sendAdmin();
}

exports.generarMailsPago = (dataPedido) => {

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: process.env.MAIL,
            pass: process.env.PASS
        }
    })

    const mailOptionsCliente = {
        from: process.env.MAIL,
        to: dataPedido.mailTo,
        subject: `Se ha confirmado el pago de tu pedido #${dataPedido.pedidoId}`,
        text: `Se ha confirmado el pago de tu pedido #${dataPedido.pedidoId}`,
        html: `Se ha confirmado el pago de tu pedido #${dataPedido.pedidoId}`
    }

    const mailOptionsAdmin = {
        from: process.env.MAIL,
        to: process.env.MAIL,
        subject: `Haz confirmado el Pedido #${dataPedido.pedidoId} como pagado`,
        text: `Haz confirmado el Pedido #${dataPedido.pedidoId} como pagado`,
        html: `Haz confirmado el Pedido #${dataPedido.pedidoId} como pagado`
    }

    async function sendCliente() {
        try {
            const response = await transporter.sendMail(mailOptionsCliente);
            return response
            
        } catch(err) {
            console.log(err);
        }
    }

    async function sendAdmin() {
        try {
            const response = await transporter.sendMail(mailOptionsAdmin);
            return response
            
        } catch(err) {
            console.log(err);
        }
    }

    sendCliente();
    sendAdmin();
}


exports.generarMailsDespachado = (dataPedido) => {

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: process.env.MAIL,
            pass: process.env.PASS
        }
    })
    

    const mailOptionsCliente = {
        from: process.env.MAIL,
        to: dataPedido.mailTo,
        subject: `Tu pedido #${dataPedido.pedidoId} ha sido despachado`,
        text: `Tu pedido #${dataPedido.pedidoId} ha sido despachado`,
        html: `Tu pedido #${dataPedido.pedidoId} ha sido despachado`
    }

    const mailOptionsAdmin = {
        from: process.env.MAIL,
        to: process.env.MAIL,
        subject: `Haz confirmado el Pedido #${dataPedido.pedidoId} como despachado`,
        text: `Haz confirmado el Pedido #${dataPedido.pedidoId} como despachado`,
        html: `Haz confirmado el Pedido #${dataPedido.pedidoId} como despachado`
    }

    async function sendCliente() {
        try {
            const response = await transporter.sendMail(mailOptionsCliente);
            return response
            
        } catch(err) {
            console.log(err);
        }
    }

    async function sendAdmin() {
        try {
            const response = await transporter.sendMail(mailOptionsAdmin);
            return response
            
        } catch(err) {
            console.log(err);
        }
    }

    sendCliente();
    sendAdmin();
}

exports.generarMailsPedido = (dataPedido) => {

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: process.env.MAIL,
            pass: process.env.PASS
        }
    })
    
    const mailOptionsAdmin = {
        from: process.env.MAIL,
        to: process.env.MAIL,
        subject: `Haz cambiado el estado del pedido #${dataPedido.pedidoId} a 'Pago pendiente'`,
        text: `Haz cambiado el estado del pedido #${dataPedido.pedidoId} a 'Pago pendiente'`,
        html: `Haz cambiado el estado del pedido #${dataPedido.pedidoId} a 'Pago pendiente'`
    }

    async function sendAdmin() {
        try {
            const response = await transporter.sendMail(mailOptionsAdmin);
            return response
            
        } catch(err) {
            console.log(err);
        }
    }

    sendAdmin();
}
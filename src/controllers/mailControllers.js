const nodemailer = require('nodemailer');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

exports.generarPedido = (body) => {

    try {
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
            subject: `Haz generado un nuevo pedido #${body.pedidoId} en Autonueve.cl`,
            text: mensaje,
            html: html || mensaje
        }
    
        const mailOptionsAdmin = {
            from: process.env.MAIL,
            to: process.env.MAIL,
            subject: `Se ha generado un nuevo pedido #${body.pedidoId} en Autonueve.cl - [Copia Administrador]`,
            text: `Se ha generado un nuevo pedido #${body.pedidoId} en Autonueve.cl - [Copia Administrador]`,
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
        return {
            status: 200,
            message: 'El pedido ha sido generado con éxito'
        }

    } catch (err) {
        console.error(err)
        return {
            status: 500,
            message: 'Los correos no han podido ser enviados'
        }
    }

    
}

exports.generarMailsPago = (dataPedido) => {

    try {

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

        return {
            status: 200,
            message: 'Los correos han sido enviados [Pedido pagado]'
        }
    } catch (err) {
        console.error(err)
        return {
            status: 500,
            message: 'Los correos no han podido ser enviados'
        }
    }

}


exports.generarMailsDespachado = (dataPedido) => {

    try {

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

        return {
            status: 200,
            message: 'Los correos han sido enviados [Pedido despachado]'
        }

    } catch (err) {
        console.error(err)
        return {
            status: 500,
            message: 'Los correos no han podido ser enviados'
        }
    }

}

exports.generarMailsPedido = (dataPedido) => {

    try {

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
    
        return {
            status: 200,
            message: 'Los correos han sido enviados [Nuevo pedido]'
        }
        
    } catch (err) {
        console.error(err)
        return {
            status: 500,
            message: 'Los correos no han podido ser enviados'
        }
    }
    

    
}


exports.generarPedidoContacto = (body) => {

    try {
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
            subject,
            text: `Ha sido contactado a través de la web autonueve.cl`,
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
        return {
            status: 200,
            message: 'El mensaje ha sido enviado con éxito'
        }

    } catch (err) {
        console.error(err)
        return {
            status: 500,
            message: 'Los correos no han podido ser enviados'
        }
    }

    
}
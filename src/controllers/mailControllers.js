const nodemailer = require('nodemailer');

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

    const mailOptions = {
        from: process.env.MAIL,
        to: mailTo,
        subject,
        text: mensaje,
        html: html || mensaje
    }



    async function send() {
        try {
            console.log(mailOptions)
            const response = await transporter.sendMail(mailOptions);
            console.log(response)
            return response
            
        } catch(err) {
            console.log(err);
        }
    }

    send();
}
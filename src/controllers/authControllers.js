const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const mysqlConnection = require('../database/database')
const {promisify} = require('util')
const config = require('../../config/cfg')


// procedimientos para registrarnos

exports.register = async (req, res) => {

    try {
        const user = req.body.user
        const pass = req.body.password
        let passHash = await bcrypt.hash(pass, 8)   
    

    
        mysqlConnection.query("INSERT INTO usuario SET ?", {nombre:user, clave:passHash}, (err, results, rows) => {
            if (err) throw err;
            if (results) console.log(results)
        })

        res.redirect('/')

    } catch (err) {

        console.error(err)

    }
}


exports.login = async (req, res) => {
    try {

        const user = req.body.user
        const pass = req.body.password

        if (!user || !pass) {

            res.render("signin", {
                alert:true,
                alertTitle:"Advertencia",
                alertMessage:"Ingrese un user y password",
                alertIcon:'info',
                showConfirmButton:'true',
                timer:false,
                ruta:'signin'
            })
        } else {

            mysqlConnection.query("SELECT * FROM usuario WHERE ?", {nombre:user}, async (err, results) => {

                console.log(await results)
    
                    if (results.length == 0 || ! (await bcrypt.compare(pass, results[0].clave))) {
                        res.render("signin", {
                            alert:true,
                            alertTitle:"Error",
                            alertMessage:"Usuario y/o contraseña incorrectas",
                            alertIcon:'error',
                            showConfirmButton:true,
                            timer:false,
                            ruta:"signin"
                        })

                        console.log(pass)
                        console.log(results[0].pass)
                    } else {

                        // INICIO OK

                        const id = results[0].clave
                        const token = jwt.sign({id:id}, config.jwtSecreto, {
                            expiresIn:config.jwtTiempoExpira
                        } )

                        console.log("token", token)

                        const cookiesOptions = {
                            expires: new Date(Date.now()+config.jwtCookieExpires * 24 * 60 * 60 * 1000),
                            httpOnly:true
                        }

                        res.cookie('jwt', token, cookiesOptions)
                        res.render("signin", {
                            alert:true,
                            alertTitle:"Exitoso",
                            alertMessage:"Conexión exitosa",
                            alertIcon:'success',
                            showConfirmButton:true,
                            timer:800,
                            ruta:"/admin"
                        })
                        }

                })

            }

    

    } catch (err) {
        console.log("err")
    }
}


exports.isAuthenticated = async (req, res, next) => {

    //Preguntamos por nuestra cookie
    
    if (req.cookies.jwt) {
        try {

            const decoded = await promisify(jwt.verify)(req.cookies.jwt, config.jwtSecreto)
            

            mysqlConnection.query('SELECT * FROM usuario WHERE id = ?', [decoded.id], (error, results) => {
                if (!results) return next();
                req.user = results[0]
                return next()
            })

        } catch (err) {
            console.error(err)
            return next()
        }
    } else {
        res.redirect('signin')
        next()
    }
    
}





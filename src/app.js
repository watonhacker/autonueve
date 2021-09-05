const express = require('express')
const app = express()
const port = 3000
const cfg = require('../cfg')
const indexRoutes = require('./routes/index')
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const path = require('path')


const hbs = exphbs.create({
    handlebars: allowInsecurePrototypeAccess(Handlebars), 
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main',
    extname: '.hbs'
})

// Settings



app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')
// Middlewares

// Rutas

app.use('/test', indexRoutes)



app.listen(port, () => {
    console.log("Inicio el servidor")
})
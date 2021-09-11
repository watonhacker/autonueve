/* Modules and variables */
const express = require('express')
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const path = require('path')
const morgan = require('morgan')


/* Variables de ruteo */
const indexRoutes = require('./routes/index')
const submodelRoutes = require('./routes/submodels')
const yearRoutes = require('./routes/years')
const modelRoutes = require('./routes/models')
const searchRoutes = require('./routes/search')

/* Initializations */
const app = express()



// Settings
const hbs = exphbs.create({
    handlebars: allowInsecurePrototypeAccess(Handlebars), 
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main',
    extname: '.hbs'
})

app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Rutas

app.use('/', indexRoutes)
app.use('/submodels', submodelRoutes)
app.use('/years', yearRoutes)
app.use('/models', modelRoutes)
app.use('/search', searchRoutes)



app.listen(app.get('port'), () => {
    console.log("Inicio el servidor en el puerto", app.get("port"))
})
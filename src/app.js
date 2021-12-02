
/* Modules and variables */
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const express = require('express')
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const morgan = require('morgan')
const cookieParser = require('cookie-parser')


/* Variables de ruteo */
const indexRoutes = require('./routes/index')
const submodelRoutes = require('./routes/submodels')
const yearRoutes = require('./routes/years')
const modelRoutes = require('./routes/models')
const locationRoutes = require('./routes/location')
const searchRoutes = require('./routes/search')
const signinRoutes = require('./routes/signin')
const signupRoutes = require('./routes/signup')
const adminRoutes = require('./routes/admin')
const logoutRoutes = require('./routes/logout')
const pedidoRoutes = require('./routes/pedido')
const checkoutRoutes = require('./routes/checkout')
const ventaRoutes = require('./routes/venta')
const successRoutes = require('./routes/success')
const termsRoutes = require('./routes/terms')
const androidRoutes = require('./routes/android')

/* Initializations */
const app = express()



// Settings
const hbs = exphbs.create({
    handlebars: allowInsecurePrototypeAccess(Handlebars), 
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main',
    extname: '.hbs',

    helpers: {
        loud: function (aString) {
            return aString.toUpperCase()
        },
        test:function(contador) {
            if (contador == 2){
                let txt = `Son 2`
                return txt
            }
        },
        price: function (precio, num) {
            precio = precio * num
            return precio
        },
        selectImg : function (bddImg, image) {
            return bddImg || image
        }
    }
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
app.use(cookieParser())



//Para eliminar la cache 
app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});
// Rutas

app.use('/', indexRoutes)
app.use('/submodels', submodelRoutes)
app.use('/years', yearRoutes)
app.use('/models', modelRoutes)
app.use('/location', locationRoutes)
app.use('/search', searchRoutes)
app.use('/signin', signinRoutes)
app.use('/signup', signupRoutes)
app.use('/admin', adminRoutes)
app.use('/logout', logoutRoutes)
app.use('/pedido', pedidoRoutes)
app.use('/checkout', checkoutRoutes)
app.use('/venta', ventaRoutes)
app.use('/success', successRoutes)
app.use('/terms', termsRoutes)
app.use('/android', androidRoutes)

app.listen(app.get('port'), () => {
    console.log("Inició el servidor en el puerto", app.get("port"))
})
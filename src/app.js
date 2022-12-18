
/* Modules and variables */
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const express = require('express')
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const ftpService = require('./ftp/ftpService')
//Esto inicia el script para leer el ftp y traermelo si se actualiza
ftpService.main()

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
const productoRoutes = require('./routes/producto')
const categoriesRoutes = require('./routes/categories')
const mailRoutes = require('./routes/mail')
const contactoRoutes = require('./routes/contacto')
const clientes = require('./api/clientes/clientes.controller')
const listaProducto = require('./api/listaproducto/listaproducto.controller')
const pedido = require('./api/pedido/pedido.controller')
const producto = require('./api/producto/producto.controller')
const categoria = require('./api/categoria/categoria.controller')
const comuna = require('./api/comuna/comuna.controller')
const direccion = require('./api/direccion/direccion.controller')
const modelo = require('./api/modelo/modelo.controller')
const marca = require('./api/marca/marca.controller')
const submodelo = require('./api/submodelo/submodelo.controller')
const estado = require('./api/estado/estado.controller')
//const fabricacion = require('./api/fabricacion/fabricacion.controller')
const listaPedido = require('./api/listapedido/listapedido.controller')
const listaSubmodelo = require('./api/listasubmodelo/listasubmodelo.controller')
const metodoEntrega = require('./api/metodoentrega/metodoentrega.controller')
const metodoPago = require('./api/metodopago/metodopago.controller')
const region = require('./api/region/region.controller')
const tipoCliente = require('./api/tipocliente/tipocliente.controller')
const tipoDocumento = require('./api/tipodocumento/tipodocumento.controller')
const tipoUniversal = require('./api/tipouniversal/tipouniversal.controller')
const usuario = require('./api/usuario/usuario.controller')
const estadoService = require('./api/estado/estado.service')

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
        },
        json : function (results) {
            let parsedResults = JSON.stringify(results)
            return parsedResults
        },
        addToCart: function (id) {
            console.log(id);
        },
        selectedState: function(selected, id) {
            if (selected == id){
                return "selected"
            }
        },
        estadoDeVenta: function(estado_id, num) {
            if (estado_id == num) {
                return true
            }
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
/* app.use('/signup', signupRoutes) */
app.use('/admin', adminRoutes)
app.use('/logout', logoutRoutes)
app.use('/pedido', pedidoRoutes)
app.use('/checkout', checkoutRoutes)
app.use('/venta', ventaRoutes)
app.use('/success', successRoutes)
app.use('/terms', termsRoutes)
app.use('/producto', productoRoutes)
app.use('/categories', categoriesRoutes)
app.use('/mail', mailRoutes)
app.use('/contacto', contactoRoutes)

app.use('/api/clientes', clientes)
app.use('/api/listaproducto', listaProducto)
app.use('/api/pedido', pedido)
app.use('/api/producto', producto)
app.use('/api/categoria', categoria)
app.use('/api/comuna', comuna)
app.use('/api/direccion', direccion)
app.use('/api/modelo', modelo)
app.use('/api/marca', marca)
app.use('/api/submodelo', submodelo)
app.use('/api/estado', estado)

app.use('/api/listapedido', listaPedido)
app.use('/api/listasubmodelo', listaSubmodelo)
app.use('/api/metodoentrega', metodoEntrega)
app.use('/api/metodopago', metodoPago)
app.use('/api/region', region)
app.use('/api/tipocliente', tipoCliente)
app.use('/api/tipodocumento', tipoDocumento)
app.use('/api/tipouniversal', tipoUniversal)
app.use('/api/usuario', usuario)


app.listen(app.get('port'), () => {
    console.log("Inició el servidor en el puerto", app.get("port"))
})
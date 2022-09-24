const router = require('express').Router()
const comunaService = require('../api/comuna/comuna.service')
const regionService = require('../api/region/region.service')
const tipoDocumentoService = require('../api/tipodocumento/tipodocumento.service')
const metodoEntregaService = require('../api/metodoentrega/metodoentrega.service')
const metodoPagoService = require('../api/metodopago/metodopago.service')
const productoService = require('../api/producto/producto.service')


router.post('/', async (req, res) => {
    res.send("POST/")
})

router.get('/', async (req, res) =>  {
    const productos = JSON.parse(req.query.items);
    const cantidades = JSON.parse(req.query.amounts)
    const listaProductos = await productoService.getProductsAmountsByIds(productos, cantidades)


    await Promise.all([
        comunaService.getAllComuna(),
        regionService.getAllRegion(),
        tipoDocumentoService.getAllTipoDocumento(),
        metodoEntregaService.getAllMetodoEntrega(),
        metodoPagoService.getAllMetodoPago()
    ])
    .then(values => {
        res.render("pedido", {
            listaProductos,
            comunas: values[0],
            regiones: values[1],
            documentos: values[2],
            entregas: values[3],
            pagos: values[4]
        })
    })
    .catch(
        error => {
            console.error(error);
            res.send(error)
        }
    )
})

module.exports = router;
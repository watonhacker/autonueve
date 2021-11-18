const router = require("express").Router()
const mysqlConnection = require('../database/database')
const ventaControllers = require('../controllers/ventaControllers')

let newId;
let idPedido;
let email;
let idClienteCreado;

router.post('/', (req, res) => {

    console.log(req.body)


    email = req.body['email']

    mysqlConnection.query(`SELECT cliente.id FROM cliente WHERE cliente.email = '${email}'`, (err, results) => {
        results=JSON.parse(JSON.stringify(results))
        if (results[0] != undefined) {
            //Creando pedido de cliente ya asociado

            idClienteCreado = results[0]['id']
            crearPedidoPromise = new Promise(function(resolve, reject) {
                resolve(ventaControllers.guardarPedido(idClienteCreado, req.body['pago'], req.body['documento'], req.body['entrega']))
            })
            
        } else {
            mysqlConnection.query(`SELECT id FROM cliente ORDER BY id DESC LIMIT 1`, (err, results) => {


                results=JSON.parse(JSON.stringify(results))
                newId = results[0]['id'] + 1
                console.log("ultimo id fue ", results, "El nuevo será", newId)
                    
                // Creando NUEVO cliente particular o empresa
                if (req.body['cliente'] == 1) {

                    let crearClientePromise = function () {
                        return new Promise((resolve, reject) => {
                            resolve(ventaControllers.crearCliente(newId, req.body['nombre'], req.body['apellido'], req.body['email'], req.body['phone'], req.body['rut'], req.body['cliente']))
                        })
                    }

                    crearClientePromise()
                        .then(ventaControllers.guardarDireccion(newId, req.body['comuna'], req.body['direccion'], req.body['region']))
                        .then(ventaControllers.guardarPedido(newId, req.body['pago'], req.body['documento'], req.body['entrega']))
                        .then(res => {
                            return ventaControllers.obtenerPedidoId()
                        })
                        .then(res =>{ 
                            return ventaControllers.guardarListaPedido(res, req.body['productos'])
                        })
                        .then(res => {
                            return ventaControllers.obtenerPrecioPedido(res)
                        })
                        .then(res => ventaControllers.guardarPrecioPedido(res))
        
                      



                } else if (req.body['cliente'] == 2) {

                    let crearEmpresaPromise = function () {
                       return new Promise((resolve, reject) => {
                           resolve(ventaControllers.crearEmpresa(newId, req.body['nombre'], req.body['giro'], req.body['email'], req.body['phone'], req.body['rut'], req.body['cliente']))
                       }) 
                    }

                    crearEmpresaPromise()
                    .then(ventaControllers.guardarDireccion(newId, req.body['comuna'], req.body['direccion'], req.body['region']))
                    .then(ventaControllers.guardarPedido(newId, req.body['pago'], req.body['documento'], req.body['entrega']))
                    .then(res => {
                        return ventaControllers.obtenerPedidoId()
                    })
                    .then(res =>{ 
                        return ventaControllers.guardarListaPedido(res, req.body['productos'])
                    })
                    .then(res => {
                        return ventaControllers.obtenerPrecioPedido(res)
                    })
                    .then(res => ventaControllers.guardarPrecioPedido(res))
   
                }     
                
            })

        }
        if (err) throw err;

    })

    })




module.exports = router
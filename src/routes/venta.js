const router = require("express").Router()
const ventaControllers = require('../controllers/ventaControllers')
const clientesService = require('../api/clientes/clientes.service')
const pedidoService = require('../api/pedido/pedido.service')


router.post('/', async (req, res) => {

    const cliente = req.body
    const clienteId = await clientesService.clienteByFilter(req.body.email, req.body.phone, req.body.rut);

    try {
        if (clienteId !== null){
            const dataPedido = {
                cliente_id: clienteId,
                metodopago_id: cliente.pago,
                tipodocumento_id: cliente.documento,
                estado_id: 1, //esto esta hardcodeado, esto deberia mandarlo el front en caso de que despues se pueda comprar altiro, no siempre quedara con un estado 1 
                metodoentrega_id: cliente.entrega,
                fecha: new Date().toISOString().slice(0, 19).replace('T', ' '),
                direccion: cliente.direccion
            }

            const nuevoPedido = await pedidoService.createPedido(dataPedido);
            const listaPedido = await ventaControllers.guardarListaPedido(nuevoPedido.insertId, req.body['productos']);
            const precioPedido = parseInt(req.body.total.replace(/[.$]/g, ''))
            const guardarPrecioPedido = await ventaControllers.guardarPrecioPedido({
                total: precioPedido,
                id: listaPedido
            });
            res.send({
                "pedido": nuevoPedido.insertId,
                "listaPedido": listaPedido,
                "precioPedido": precioPedido,
                "guardarPrecioPedido": guardarPrecioPedido,
                "status": "success"
            })
    
        } else {
            if (cliente.cliente == 1){
                const clienteParticular = await ventaControllers.crearCliente(cliente.nombre, cliente.apellido, cliente.email, cliente.phone, cliente.rut, cliente.cliente)

                const dataPedido = {
                    cliente_id: clienteParticular.insertId,
                    metodopago_id: cliente.pago,
                    tipodocumento_id: cliente.documento,
                    estado_id: 1, //esto esta hardcodeado, esto deberia mandarlo el front en caso de que despues se pueda comprar altiro, no siempre quedara con un estado 1 
                    metodoentrega_id: cliente.entrega,
                    fecha: new Date().toISOString().slice(0, 19).replace('T', ' '),
                    direccion: cliente.direccion
                }
                const nuevoPedido = await pedidoService.createPedido(dataPedido);
                const listaPedido = await ventaControllers.guardarListaPedido(nuevoPedido.insertId, req.body['productos']);
                const precioPedido = parseInt(req.body.total.replace(/[.$]/g, ''))
                const guardarPrecioPedido = await ventaControllers.guardarPrecioPedido({
                    total: precioPedido,
                    id: listaPedido
                });
                res.send({
                    "pedido": nuevoPedido.insertId,
                    "listaPedido": listaPedido,
                    "precioPedido": precioPedido,
                    "guardarPrecioPedido": guardarPrecioPedido,
                    "status": "success"
                })
            } else {
                
                const clienteEmpresa = await ventaControllers.crearEmpresa(cliente.nombre, cliente.giro, cliente.email, cliente.phone, cliente.rut, cliente.cliente)

                const dataPedido = {
                    cliente_id: clienteEmpresa.insertId,
                    metodopago_id: cliente.pago,
                    tipodocumento_id: cliente.documento,
                    estado_id: 1, //esto esta hardcodeado, esto deberia mandarlo el front en caso de que despues se pueda comprar altiro, no siempre quedara con un estado 1 
                    metodoentrega_id: cliente.entrega,
                    fecha: new Date().toISOString().slice(0, 19).replace('T', ' '),
                    direccion: cliente.direccion
                }

                const nuevoPedido = await pedidoService.createPedido(dataPedido);
                const listaPedido = await ventaControllers.guardarListaPedido(nuevoPedido.insertId, req.body['productos']);
                const precioPedido = parseInt(req.body.total.replace(/[.$]/g, ''))
                const guardarPrecioPedido = await ventaControllers.guardarPrecioPedido({
                    total: precioPedido,
                    id: listaPedido
                });
                res.send({
                    "pedido": nuevoPedido.insertId,
                    "listaPedido": listaPedido,
                    "precioPedido": precioPedido,
                    "guardarPrecioPedido": guardarPrecioPedido,
                    "status": "success"
                })
            }
        }
    } catch (error) {
        res.send(error)
        console.error(error);
    }

})



module.exports = router
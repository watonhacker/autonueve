const router = require("express").Router()
const mysqlConnection = require('../database/database')

let newId;
let idPedido;
let email;

/* Funciones */

function encontrarPedidoCliente (err, idCliente) {
    sql = `SELECT * FROM pedido WHERE pedido.cliente_id = ${idCliente}`
    mysqlConnection.query(sql, (err, results) => {
        console.log(results)
        console.log("PEDIDOS DEL USUARIO", results)
    })
}

function encontrarPedido () {
    sql = "SELECT COUNT(*) from pedido"
    mysqlConnection.query(sql, (err, results) => {
        results=JSON.parse(JSON.stringify(results))
        idPedido = results[0]['COUNT(*)'] + 1
        console.log("nuevo pedido es el ", idPedido)
    })
}

function guardarPedido(idCliente, pago, documento, entrega){
    sql = `INSERT INTO pedido (cliente_id, metodopago_id, tipodocumento_id, estado_id, metodoentrega_id) 
    VALUES (${idCliente}, ${pago}, ${documento}, 1, ${entrega});`
    mysqlConnection.query(sql, (err, results) => {
        results=JSON.parse(JSON.stringify(results))
    })
}


function guardarDireccion(idCliente, comuna, direccion, region) {
    sql = `INSERT INTO direccion (cliente_id, comuna_id, direccion, region_id) VALUES (${idCliente}, ${comuna}, '${direccion}', ${region})`
    mysqlConnection.query(sql, (err, results) => {
        if (err) throw err;
        results=JSON.parse(JSON.stringify(results))
    })
}



function guardarListaPedido (producto_id, pedido_id, cantidad, [{},{}]) {

}

router.post('/', (req, res) => {
    console.log(req.body)
    
    function crearCliente(id, nombre, apellido, email, telefono, rut, tipocliente) {
        mysqlConnection.query(`INSERT INTO cliente (id, nombre, apellido, email, telefono, rut, tipocliente_id) VALUES (${id}, '${nombre}', '${apellido}', '${email}', '${telefono}', '${rut}', '${tipocliente}')`)
    }

    function crearEmpresa (id, nombre, giro, email, telefono, rut, tipocliente) {
        mysqlConnection.query(`INSERT INTO cliente (id, nombre, giroempresa, email, telefono, rut, tipocliente_id) VALUES (${id}, '${nombre}', '${giro}', '${email}', '${telefono}', '${rut}', '${tipocliente}')`)
    }

    email = req.body['email']

    mysqlConnection.query(`SELECT cliente.id FROM cliente WHERE cliente.email = '${email}'`, (err, results) => {
        results=JSON.parse(JSON.stringify(results))
        if (results[0] != undefined) {
            console.log("Hay un cliente asociado")
        } else {
            mysqlConnection.query(`SELECT COUNT(*) from cliente`, (err, results) => {
                results=JSON.parse(JSON.stringify(results))
                newId = results[0]['COUNT(*)'] + 1
                    
                // Creando cliente particular o empresa
                if (req.body['cliente'] == 1) {
                    crearClientePromise = new Promise(function(resolve, reject)  {
                        resolve(crearCliente(newId, req.body['nombre'], req.body['apellido'], req.body['email'], req.body['phone'], req.body['rut'], req.body['cliente']))
                        })
                        .then(guardarDireccion(newId, req.body['comuna'], req.body['direccion'], req.body['region']))
                        .then(guardarPedido(newId, req.body['pago'], req.body['documento'], req.body['entrega']))
                } else if (req.body['cliente'] == 2) {
                    crearEmpresaPromise = new Promise(function(resolve, reject) {
                    resolve(crearEmpresa(newId, req.body['nombre'], req.body['giro'], req.body['email'], req.body['phone'], req.body['rut'], req.body['cliente']))
                    })
                    .then(guardarDireccion(newId, req.body['comuna'], req.body['direccion'], req.body['region']))
                    .then(guardarPedido(newId, req.body['pago'], req.body['documento'], req.body['entrega']))
                }                  
            })
        }
        if (err) throw err;
    })



        /* res.render("success") */
    })




module.exports = router
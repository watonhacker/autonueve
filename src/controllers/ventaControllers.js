const { resolve } = require('path');
const mysqlPool = require('../database/database')

exports.crearCliente = (nombre, apellido, email, telefono, rut, tipocliente) => {
    return new Promise((resolve, reject) => {
        try {
            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    console.error(err) 
                    reject(err)
                }
                connection.query("INSERT INTO cliente SET ?", {nombre:nombre, apellido:apellido, email:email, telefono:telefono, rut:rut, tipocliente_id:tipocliente}, (err, result) => {
                    if (err) { 
                        console.error(err) 
                        reject(err)
                    }
                    connection.release(); // Importante liberar la conexión
                    resolve(JSON.parse(JSON.stringify(result)))
                })
            })
    
        } catch (err) {
            console.log(err);        }
    })

}

exports.crearEmpresa = (nombre, giro, email, telefono, rut, tipocliente) => {

    return new Promise((resolve, reject) => {
        try {

            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    console.error(err) 
                    reject(err)
                }
                connection.query("INSERT INTO cliente SET ?", {nombre:nombre, giroempresa:giro, email:email, telefono:telefono, rut:rut, tipocliente_id:tipocliente}, (err, result) => {
                    if (err) { 
                        console.error(err) 
                        reject(err)
                    }
                    connection.release(); // Importante liberar la conexión
                    resolve(JSON.parse(JSON.stringify(result)))
                })
            })
    
            
        } catch (err) {
            console.log(err);        }       
    })

}

exports.guardarPedido = (idCliente, pago, documento, entrega, direccion) => {

    try {

        const sql =`INSERT INTO pedido (cliente_id, metodopago_id, tipodocumento_id, estado_id, metodoentrega_id, fecha, direccion) VALUES (${idCliente}, ${pago}, ${documento}, 1, ${entrega}, current_time(), '${direccion}')`
        
        mysqlPool.getConnection((err, connection) => {
            if (err) { 
                console.error(err) 
                reject(err)
            }
            connection.query(sql, (err, result) => {
                if (err) { 
                    console.error(err) 
                    reject(err)
                }
                connection.release(); // Importante liberar la conexión
                resolve(JSON.parse(JSON.stringify(result)))
            })
        })
       

    } catch(err) {
        console.error(err)
    }
        

}

exports.guardarDireccion = (idCliente, comuna, direccion, region) => {
    try {

        mysqlPool.getConnection((err, connection) => {
            if (err) { 
                console.error(err) 
                reject(err)
            }
            connection.query("INSERT INTO direccion SET ?", {cliente_id:idCliente, comuna_id:comuna, direccion:direccion, region_id:region}, (err, result) => {
                if (err) { 
                    console.error(err) 
                    reject(err)
                }
                connection.release(); // Importante liberar la conexión
                resolve(JSON.parse(JSON.stringify(result)))
            })
        })



        
    } catch (err) {
        console.log(err);
    }
}

exports.obtenerPedidoId = function () {

    try {

        return new Promise((resolve, reject) => {

            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    console.error(err) 
                    reject(err)
                }
                connection.query("SELECT id FROM pedido ORDER BY id DESC LIMIT 1", (err, result) => {
                    if (err) { 
                        console.error(err) 
                        reject(err)
                    }
                    connection.release(); // Importante liberar la conexión
                    const results=JSON.parse(JSON.stringify(result))
                    id = results[0]['id']
                    resolve(id)
                })
            })

        })

    } catch (err) {
        console.error(err)
    }

}

exports.guardarListaPedido = function (res, listaIdProductos) {

    try {
        return new Promise((resolve, reject) => {

            let listaProductos = listaIdProductos.split(",")
            let sql = "INSERT INTO listapedido (producto_id, pedido_id, cantidad) VALUES"
            let objeto = {}
            let primerNumero ="";
            let segundoNumero ="";
            
                listaProductos.forEach((par) => {
                    primerNumero = ""
                    segundoNumero = ""
                    for (element of par) {
                            
                        if (element != ":") {
                            primerNumero += element
                        } else {
                            break
                        }
                    }
                        
                    let newString = "";
                    for (let i = par.length - 1; i >= 0; i--) {
                        newString += par[i];
                    }
                    
                    
                    for (element of newString) {
                        if (element != ":") {
                            segundoNumero += element
                        } else {
            
                            break
                        }
                    }
                    
                    objeto[primerNumero] = segundoNumero
                })
        
                for (element in objeto) {
                    sql += `('${element}', ${res}, ${objeto[element]}),`
                }
        
        
                sql = sql.slice(0, -1)
                sql += ";"
        

            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    console.error(err) 
                    reject(err)
                }
                connection.query(sql, (err, result) => {
                    if (err) { 
                        console.error(err) 
                        reject(err)
                    }
                    connection.release(); // Importante liberar la conexión
                    resolve(JSON.parse(JSON.stringify(result)))
                })
            })
    
    
            resolve(res)
 
    
            
        })
    
    } catch (err) {
        console.log(err)
    }

    

   
}

exports.obtenerPrecioPedido = function(id) {

    try {

        return new Promise((resolve, reject) => {

    
            sql = `SELECT listapedido.cantidad * producto.precio as subtotal FROM listapedido INNER JOIN producto ON producto.id = listapedido.producto_id INNER JOIN pedido ON pedido.id = listapedido.pedido_id WHERE pedido.id = ${id};`
    
   

            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    console.error(err) 
                    reject(err)
                }
                connection.query(sql, (err, result) => {
                    if (err) { 
                        console.error(err) 
                        reject(err)
                    }
                    connection.release(); // Importante liberar la conexión

                    const res = JSON.parse(JSON.stringify(result))
                    let total = 0
                    res.forEach(element => {
                        total += element['subtotal']
                    })
                    resolve({
                        total,
                        id
                    })
                })
            })
            
    
        })

    } catch (err) {
        console.error(err)
    }




}

exports.guardarPrecioPedido = function (respuesta) {


    return new Promise((resolve, reject) => {
        try {
            const sql = `UPDATE pedido SET precio=${respuesta['total']} WHERE pedido.id = ${respuesta['id']}`
            mysqlPool.getConnection((err, connection) => {
                if (err) { 
                    console.error(err) 
                    reject(err)
                }
                connection.query(sql, (err, result) => {
                    if (err) { 
                        console.error(err) 
                        reject(err)
                    }
                    connection.release(); // Importante liberar la conexión
                    resolve(JSON.parse(JSON.stringify(result)))
                })
            })
   
        } catch (error) {
            console.error(error);
            resolve(error);
        }
    })


    


}

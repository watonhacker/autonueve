const mysqlConnection = require('../database/database')

exports.crearCliente = (id, nombre, apellido, email, telefono, rut, tipocliente) => {
    try {

        mysqlConnection.query("INSERT INTO cliente SET ?", {id:id, nombre:nombre, apellido:apellido, email:email, telefono:telefono, rut:rut, tipocliente_id:tipocliente})

    } catch (err) {
        throw err;
    }
}

exports.crearEmpresa = (id, nombre, giro, email, telefono, rut, tipocliente) => {
    try {

        mysqlConnection.query("INSERT INTO cliente SET ?", {id:id, nombre:nombre, giroempresa:giro, email:email, telefono:telefono, rut:rut, tipocliente_id:tipocliente})

    } catch (err) {
        throw err;
    }
}

exports.guardarPedido = (idCliente, pago, documento, entrega) => {

    try {

        sql =`INSERT INTO pedido (cliente_id, metodopago_id, tipodocumento_id, estado_id, metodoentrega_id, fecha) VALUES (${idCliente}, ${pago}, ${documento}, 1, ${entrega}, current_time())`

       

        mysqlConnection.query(sql, (err, res) => {
            if (err) throw err;
            console.log(res)
        })

    } catch(err) {
        console.error(err)
    }
        

}

exports.guardarDireccion = (idCliente, comuna, direccion, region) => {
    try {

        mysqlConnection.query("INSERT INTO direccion SET ?", {cliente_id:idCliente, comuna_id:comuna, direccion:direccion, region_id:region})

    } catch (err) {
        throw err;
    }
}

exports.obtenerPedidoId = function () {

    try {

        return new Promise((resolve, reject) => {
            mysqlConnection.query("SELECT id FROM pedido ORDER BY id DESC LIMIT 1", (err, results) => {
                results=JSON.parse(JSON.stringify(results))
                id = results[0]['id']
                resolve(id)
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
                    sql += `(${element}, ${res}, ${objeto[element]}),`
                }
        
        
                sql = sql.slice(0, -1)
                sql += ";"
        
                        
            mysqlConnection.query(sql, (err, results) => {
                if (err) throw err;

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
    
            mysqlConnection.query(sql, (err, res) => {
                res = JSON.parse(JSON.stringify(res))
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

    } catch (err) {
        console.error(err)
    }




}

exports.guardarPrecioPedido = function (respuesta) {

    try {
        sql = `UPDATE pedido SET precio=${respuesta['total']} WHERE pedido.id = ${respuesta['id']}`
        mysqlConnection.query(sql, (err, res) => {
            if (err) throw err;
        })
    } catch (err) {
        console.error(err)
    }
    


}

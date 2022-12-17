const mysqlConnection = require('../../database/database')


exports.getAllProducto = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM producto';
            mysqlConnection.query(sql, (err, result) => {
                if (err) throw err;
                resolve(result)
            })
        } catch (error) {
            reject(error)
            console.error(error.message)
            throw error;
        }
    })    
}

exports.createProducto = (producto) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'INSERT INTO producto SET ?';
            mysqlConnection.query(sql, producto, (error, result) => {
                if (error) {
                    console.error(error.message);
                    resolve(error)
                }
                resolve(result)
            })
        } catch (error) {
            reject(error)
            console.error(error.message)
        }
    })    
}

exports.getProductosByIds = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = `SELECT * FROM producto WHERE id IN(${ids});`;
            mysqlConnection.query(sql, (err, result) => {
                if (err) {
                    console.error("No se ha podido obtener el producto", err.message)
                    resolve(err)
                } else if (result.length !== ids.length) {
                    console.error("No se han obtenido todos los productos")
                    resolve({
                        error: "No se ha podido obtener todos los productos"
                    })
                }
                resolve(JSON.parse(JSON.stringify(result)))
            })
        } catch (error) {
            reject(error)   
            console.error(error.message)
            throw error;
        } 
    })   
}

exports.getProductoById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = `SELECT * FROM producto WHERE id = ${id};`;
            mysqlConnection.query(sql, (err, result) => {
                if (err) {
                    this.logger.error("No se ha podido obtener el producto", err.message)
                    resolve(err)
                }
                resolve(result)
            })
        } catch (error) {
            reject(error)
            console.error(error.message)
            throw error;
        } 
    })    
}

exports.updateProducto = (producto) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'UPDATE producto SET codigo = ? , categoria_id = ? , tipouniversal_id = ?, SKU = ?, nombre = ?, precio = ?, marca = ?, descripcion = ?, cantidad = ?, imagen = ?, imagen_2 = ?, imagen_3 = ? WHERE id = ?';
            const dataProducto = [producto.codigo, producto.categoria_id, producto.tipouniversal_id, producto.SKU, producto.nombre, producto.precio, producto.marca, producto.descripcion, producto.cantidad, producto.imagen, producto.imagen_2, producto.imagen_3, producto.id]
            mysqlConnection.query(sql, dataProducto, (error, result) => {
                if (error) {
                    console.log(error.message);
                    resolve(error)
                }
                resolve(result)
            })
        } catch (error) {
            reject(error)
            console.error(error.message)
        }
    })    
}


exports.getProductoInfoByListaSubmodelo = (listaSubmodeloId) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT producto.cantidad, tipouniversal_id, producto.id, producto.imagen, producto.precio, producto.nombre, producto.SKU, producto.marca FROM listaproducto INNER JOIN producto ON producto.id = listaproducto.producto_id
            INNER JOIN listasubmodelo ON listasubmodelo.id = listaproducto.listasubmodelo_id WHERE listasubmodelo.id = ${listaSubmodeloId} AND producto.cantidad > 5 AND NOT producto.tipouniversal_id = 1`;

            mysqlConnection.query(sql, (err, results) => {
                if (err) throw err;

                if (results) {
                    resolve(JSON.parse(JSON.stringify(results)))
                }
                
            })
        } catch (error) {
            console.error(error.message);
        }
    })
}

exports.getProductosUniversal = () => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT producto.cantidad, tipouniversal_id, producto.id, producto.imagen, producto.precio, producto.nombre, producto.SKU, producto.marca FROM producto WHERE tipouniversal_id = 1 AND producto.cantidad > 5;`;

            mysqlConnection.query(sql, (err, results) => {
                if (err) throw err;

                if (results) {
                    resolve(JSON.parse(JSON.stringify(results)))
                }
                
            })
        } catch (error) {
            console.error(error.message);
        }
    })
}

exports.getProductosAssociated = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT producto_id, cantidad FROM listapedido WHERE listapedido.pedido_id = ${id}`;
            mysqlConnection.query(sql, (err, result) => {
                if (err) throw err;
                resolve(JSON.parse(JSON.stringify(result)))
            })
        } catch (error) {
            reject(error)
            console.error(error.message)
            throw error;
        }
    })  
}

exports.substractStock = (quantity, id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `UPDATE producto SET cantidad = (producto.cantidad - ${quantity}) where id = ${id}; `;
            mysqlConnection.query(sql, (err, result) => {
                if (err) throw err;
                resolve(JSON.parse(JSON.stringify(result)))
            })
        } catch (error) {
            reject(error)
            console.error(error.message)
            throw error;
        }
    }) 
}
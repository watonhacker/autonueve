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

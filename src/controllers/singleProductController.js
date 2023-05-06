const mysqlPool = require('../database/database');

exports.getSingleProduct = (id) => {
    return new Promise((resolve, reject) => {

        let sql = `SELECT id, codigo, nombre, precio, SKU, marca, descripcion, cantidad, imagen, imagen_2, imagen_3 FROM producto WHERE producto.id = '${id}' AND producto.estado="A"; `

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

                let results = JSON.parse(JSON.stringify(result))
                results = results[0]
                resolve(results)
            })
        })

    })
}
 
exports.getProductCategory = (id) => {
    return new Promise((resolve, reject) => {

        let sql = `SELECT categoria_id FROM producto WHERE producto.id = '${id}' AND producto.estado="A"; `

        
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
                let results = JSON.parse(JSON.stringify(result))
                results = results[0]['categoria_id']
                resolve(results)

            })
        })

    })
}

exports.getAssociatedProducts = async (id) => {

    const categoryId = await this.getProductCategory(id);
    const sql = `SELECT id, codigo, nombre, precio, SKU, marca, descripcion, cantidad, imagen, imagen_2, imagen_3 FROM producto WHERE producto.categoria_id = ${categoryId} AND producto.estado="A" ORDER BY id DESC limit 9; `

    return new Promise((resolve, reject) => {

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
    })
}
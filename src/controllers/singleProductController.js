const mysqlConnection = require('../database/database');

exports.getSingleProduct = (id) => {
    return new Promise((resolve, reject) => {

        let sql = `SELECT id, codigo, nombre, precio, SKU, marca, descripcion, cantidad, imagen, imagen_2, imagen_3 FROM producto WHERE producto.id = '${id}' AND estado="A"; `

        mysqlConnection.query(sql, (err, results) => {
            if (err) throw err;
            results = JSON.parse(JSON.stringify(results))
            results = results[0]
            resolve(results)
        })

    })
}
 
exports.getProductCategory = (id) => {
    return new Promise((resolve, reject) => {

        let sql = `SELECT categoria_id FROM producto WHERE producto.id = '${id}' AND estado="A"; `

        mysqlConnection.query(sql, (err, results) => {
            if (err) throw err;
            results = JSON.parse(JSON.stringify(results))
            results = results[0]['categoria_id']
            resolve(results)
        })

    })
}

exports.getAssociatedProducts = async (id) => {

    const categoryId = await this.getProductCategory(id);
    const sql = `SELECT id, codigo, nombre, precio, SKU, marca, descripcion, cantidad, imagen, imagen_2, imagen_3 FROM producto WHERE producto.categoria_id = ${categoryId} AND estado="A" ORDER BY id DESC limit 9; `

    return new Promise((resolve, reject) => {
        mysqlConnection.query(sql, (err, results) => {
            if (err) throw err;
            results = JSON.parse(JSON.stringify(results))
            resolve(results)
        })
    })
}
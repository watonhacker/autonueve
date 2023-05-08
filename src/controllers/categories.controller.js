const mysqlPool = require('../database/database')
const globalControllers = require('./globalControllers')

exports.getCategories = () => {

    let sql = `SELECT * FROM categoria`;

    return new Promise((resolve, reject) => {

        mysqlPool.getConnection((err, connection) => {
            if (err) { 
                console.error(err) 
                
            }
            connection.query(sql, (err, result) => {
                if (err) { 
                    console.error(err) 
                    
                }
                connection.release(); // Importante liberar la conexión
                resolve(JSON.parse(JSON.stringify(result)))
            })
        })

    })


};


exports.getCategoryProducts = (categoryId) => {
    let sql = `SELECT * FROM producto WHERE producto.categoria_id = ${categoryId} AND producto.estado="A"`;

    return new Promise((resolve, reject) => {
        mysqlPool.getConnection((err, connection) => {
            if (err) { 
                console.error(err) 
                
            }
            connection.query(sql, (err, result) => {
                if (err) { 
                    console.error(err) 
                    
                }
                connection.release(); // Importante liberar la conexión
                resolve(JSON.parse(JSON.stringify(result)))
            })
        })
    })
}

exports.getElementsByPageRender = (type, search, results, page) => {


    let orderedArray = globalControllers.getElementsByPage(results, 12);
    let paginator;

    paginator = globalControllers.boostrapPaginator(type, search, page, results.length).render()
    paginator = paginator.replace(/\?page\=/g, "")

    return {
        results: orderedArray[page-1],
        paginator
    }





}

exports.getCategoryProductsPage = (categoryName, page, category) => {

    let sql = `SELECT producto.id, producto.codigo, producto.categoria_id, producto.tipouniversal_id, producto.SKU, producto.nombre, producto.precio, producto.marca, producto.descripcion, producto.cantidad, producto.imagen, producto.imagen_2, producto.imagen_3, producto.precio_local, producto.estado FROM producto INNER JOIN categoria ON categoria.id = producto.categoria_id WHERE categoria.nombre = '${categoryName.toUpperCase()}' AND producto.estado="A"`;

    
    return new Promise((resolve, reject) => {
        mysqlPool.getConnection((err, connection) => {
            if (err) { 
                console.error(err) 
                
            }
            connection.query(sql, (err, result) => {
                if (err) { 
                    console.error(err) 
                    
                }
                connection.release(); // Importante liberar la conexión
                const results=JSON.parse(JSON.stringify(result))
                resolve(this.getElementsByPageRender('category', {data:category}, results, page))
            })
        })
    })



}

exports.setCategory = (categoryId) => {

    let category;

    switch(categoryId) {
        case 'neumaticos':
            category = 1;
            break;
        case 'aceite':
            category = 2;
            break;
        case 'filtro':
            category = 3;
            break;
        case 'bateria':
            category = 4;
            break;
        default:
            break;

    }

    return category;

}
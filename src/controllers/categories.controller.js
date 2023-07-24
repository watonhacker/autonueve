const mysqlPool = require('../database/database')
const globalControllers = require('./globalControllers')

function getFilteredCategoriesIds () {
    let sql = `SELECT DISTINCT producto.categoria_id FROM producto;`;

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

function getCategoriesByIds (categories) {
    const ids = categories.map((categorie)=> {
        return categorie.categoria_id;
    })
    let sql = `SELECT * FROM categoria WHERE id IN (${[...ids]});`;
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

exports.getCategories = async () => {
    const categoriesIds = await getFilteredCategoriesIds();
    if (categoriesIds) {
        const categories = await getCategoriesByIds(categoriesIds);
        return categories;
    } else {
        return;
    }
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

    let sql = `SELECT producto.id, producto.codigo, producto.categoria_id, producto.tipouniversal_id, producto.SKU, producto.nombre, producto.precio, producto.marca, producto.descripcion, producto.descripcion_local, producto.cantidad, producto.imagen, producto.imagen_2, producto.imagen_3, producto.precio_local, producto.estado FROM producto INNER JOIN categoria ON categoria.id = producto.categoria_id WHERE categoria.nombre = '${categoryName.toUpperCase()}' AND producto.estado="A"`;

    
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
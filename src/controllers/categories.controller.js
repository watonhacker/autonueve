const mysqlConnection = require('../database/database')
const globalControllers = require('./globalControllers')

exports.getCategories = () => {

    let sql = `SELECT * FROM categoria`;

    return new Promise((resolve, reject) => {

        mysqlConnection.query(sql, (err, results) => {

            if (err) {
                return [];
            }
    
            let parsedResults = JSON.parse(JSON.stringify(results));
    
            resolve (parsedResults)
    
        })

    })


};


exports.getCategoryProducts = (categoryId) => {
    let sql = `SELECT * FROM producto WHERE producto.categoria_id = ${categoryId} AND estado="A"`;

    return new Promise((resolve, reject) => {
        mysqlConnection.query(sql, (err, results, rows) => {
            results=JSON.parse(JSON.stringify(results))
            resolve(results)

            if (err) {
                console.error(err);
                return [];
            }
            
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

exports.getCategoryProductsPage = (categoryId, page, category) => {

    let sql = `SELECT * FROM producto WHERE producto.categoria_id = ${categoryId} AND estado="A"`;

    
    return new Promise((resolve, reject) => {
        mysqlConnection.query(sql, (err, results, rows) => {
            results=JSON.parse(JSON.stringify(results))
            
            resolve(this.getElementsByPageRender('category', {data:category}, results, page))

            if (err) {
                console.error(err);
                return [];
            }
            
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
const router = require('express').Router();
const categoriesControllers = require('../controllers/categories.controller')




router.get('/', async (req, res) => {
    let categories = await categoriesControllers.getCategories();
    res.send(categories);   
})

router.get('/neumaticos', async (req, res) => {
    let resultados = await categoriesControllers.getCategoryProducts(1);
    const resultadosPrecioFormat = resultados.map((result) => {
        if (result.precio.toString().length == 4) {
            result.precio = result.precio.toString().slice(0, 1) + "." + result.precio.toString().slice(1) 
        } else if (result.precio.toString().length == 5) {
            result.precio = result.precio.toString().slice(0, 2) + "." + result.precio.toString().slice(2)
        } else if (result.precio.toString().length == 6){
            result.precio = result.precio.toString().slice(0, 3) + "." + result.precio.toString().slice(3)
        } else {
            result.precio = result.precio;
        }

        return result
    })
    res.render("category-search", {
        resultados: resultadosPrecioFormat
    })
})

router.get('/aceite', async (req, res) => {
    let resultados = await categoriesControllers.getCategoryProducts(2);

    const resultadosPrecioFormat = resultados.map((result) => {
        if (result.precio.toString().length == 4) {
            result.precio = result.precio.toString().slice(0, 1) + "." + result.precio.toString().slice(1) 
        } else if (result.precio.toString().length == 5) {
            result.precio = result.precio.toString().slice(0, 2) + "." + result.precio.toString().slice(2)
        } else if (result.precio.toString().length == 6){
            result.precio = result.precio.toString().slice(0, 3) + "." + result.precio.toString().slice(3)
        } else {
            result.precio = result.precio;
        }

        return result
    })
    res.render("category-search", {
        resultados: resultadosPrecioFormat
    })
})

router.get('/filtro', async (req, res) => {
    let resultados = await categoriesControllers.getCategoryProducts(3);
    const resultadosPrecioFormat = resultados.map((result) => {
        if (result.precio.toString().length == 4) {
            result.precio = result.precio.toString().slice(0, 1) + "." + result.precio.toString().slice(1) 
        } else if (result.precio.toString().length == 5) {
            result.precio = result.precio.toString().slice(0, 2) + "." + result.precio.toString().slice(2)
        } else if (result.precio.toString().length == 6){
            result.precio = result.precio.toString().slice(0, 3) + "." + result.precio.toString().slice(3)
        } else {
            result.precio = result.precio;
        }

        return result
    })
    res.render("category-search", {
        resultados: resultadosPrecioFormat
    })
})

router.get('/bateria', async (req, res) => {
    let resultados = await categoriesControllers.getCategoryProducts(4);
    const resultadosPrecioFormat = resultados.map((result) => {
        if (result.precio.toString().length == 4) {
            result.precio = result.precio.toString().slice(0, 1) + "." + result.precio.toString().slice(1) 
        } else if (result.precio.toString().length == 5) {
            result.precio = result.precio.toString().slice(0, 2) + "." + result.precio.toString().slice(2)
        } else if (result.precio.toString().length == 6){
            result.precio = result.precio.toString().slice(0, 3) + "." + result.precio.toString().slice(3)
        } else {
            result.precio = result.precio;
        }

        return result
    })
    res.render("category-search", {
        resultados: resultadosPrecioFormat
    })
})

router.get('/:category/:page', async (req, res) => {

    let category = categoriesControllers.setCategory(req.params.category);
    let page = req.params.page
    let data = await categoriesControllers.getCategoryProductsPage(category, page, req.params.category)
    let resultados = data.results
    const paginator = data.paginator;

    const resultadosPrecioFormat = resultados.map((result) => {
        if (result.precio.toString().length == 4) {
            result.precio = result.precio.toString().slice(0, 1) + "." + result.precio.toString().slice(1) 
        } else if (result.precio.toString().length == 5) {
            result.precio = result.precio.toString().slice(0, 2) + "." + result.precio.toString().slice(2)
        } else if (result.precio.toString().length == 6){
            result.precio = result.precio.toString().slice(0, 3) + "." + result.precio.toString().slice(3)
        } else {
            result.precio = result.precio;
        }

        return result
    })


    res.render("category-search", {
        resultados: resultadosPrecioFormat,
        paginator
    })
})


module.exports = router;
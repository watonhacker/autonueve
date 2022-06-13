const router = require('express').Router();
const categoriesControllers = require('../controllers/categories.controller')




router.get('/', async (req, res) => {
    let categories = await categoriesControllers.getCategories();
    res.send(categories);   
})

router.get('/neumaticos', async (req, res) => {
    let resultados = await categoriesControllers.getCategoryProducts(1);
    res.render("category-search", {
        resultados
    })
})

router.get('/aceite', async (req, res) => {
    let resultados = await categoriesControllers.getCategoryProducts(2);
    res.render("category-search", {
        resultados
    })
})

router.get('/filtro', async (req, res) => {
    let resultados = await categoriesControllers.getCategoryProducts(3);
    res.render("category-search", {
        resultados
    })
})

router.get('/bateria', async (req, res) => {
    let resultados = await categoriesControllers.getCategoryProducts(4);
    res.render("category-search", {
        resultados
    })
})

router.get('/:category/:page', async (req, res) => {

    let category = categoriesControllers.setCategory(req.params.category);
    let page = req.params.page
    let data = await categoriesControllers.getCategoryProductsPage(category, page, req.params.category)
    let resultados = data.results
    const paginator = data.paginator;

    res.render("category-search", {
        resultados,
        paginator
    })
})


module.exports = router;
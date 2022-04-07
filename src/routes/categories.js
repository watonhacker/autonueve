const router = require('express').Router();
const categoriesControllers = require('../controllers/categories.controller')


router.get('/', async (req, res) => {
    let categories = await categoriesControllers.getCategories();
    res.send(categories);   
})

router.get('/neumaticos', async (req, res) => {
    // category 1 = neumaticos
    let resultados = await categoriesControllers.getCategoryProducts(1);
    console.log(resultados)
    res.render("category-search", {
        resultados
    })
})

router.get('/aceite', async (req, res) => {
    // category 1 = neumaticos
    let resultados = await categoriesControllers.getCategoryProducts(2);
    console.log(resultados)
    res.render("category-search", {
        resultados
    })
})

router.get('/filtro', async (req, res) => {
    // category 1 = neumaticos
    let resultados = await categoriesControllers.getCategoryProducts(3);
    console.log(resultados)
    res.render("category-search", {
        resultados
    })
})

router.get('/bateria', async (req, res) => {
    // category 1 = neumaticos
    let resultados = await categoriesControllers.getCategoryProducts(4);
    console.log(resultados)
    res.render("category-search", {
        resultados
    })
})


module.exports = router;
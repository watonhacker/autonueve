const router = require('express').Router();
const categoriesControllers = require('../controllers/categories.controller')
const neumaticosController = require('../controllers/neumaticos.controller')

router.get('/', async (req, res) => {
    let categories = await categoriesControllers.getCategories();
    res.send(categories);   
})

router.get('/neumaticos', async (req, res) => {
    let resultados = await neumaticosController.getNeumaticos();
    console.log(resultados)
    res.render("category-search", {
        resultados
    })
})


module.exports = router;
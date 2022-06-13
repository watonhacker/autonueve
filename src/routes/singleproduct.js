const router = require('express').Router();
const mysqlConnection = require('../database/database');
const singleProductController = require('../controllers/singleProductController')


router.get('/:id', async (req, res) => {


    const resultado = await singleProductController.getSingleProduct(req.params.id);
    const associatedProducts = await singleProductController.getAssociatedProducts(req.params.id);
    res.render("single-product", {
        resultado,
        associatedProducts
    })



})


module.exports = router;
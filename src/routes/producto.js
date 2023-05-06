const router = require('express').Router();
const singleProductController = require('../controllers/singleProductController')


router.get('/:id', async (req, res) => {

    const resultado = await singleProductController.getSingleProduct(req.params.id);
    const associatedProducts = await singleProductController.getAssociatedProducts(req.params.id);
    

    if (resultado.precio.toString().length == 4) {
        resultado.precio = resultado.precio.toString().slice(0, 1) + "." + resultado.precio.toString().slice(1) 
    } else if (resultado.precio.toString().length == 5) {
        resultado.precio = resultado.precio.toString().slice(0, 2) + "." + resultado.precio.toString().slice(2)
    } else if (resultado.precio.toString().length == 6){
        resultado.precio = resultado.precio.toString().slice(0, 3) + "." + resultado.precio.toString().slice(3)
    } else {
        resultado.precio = resultado.precio;
    }

    
    res.render("single-product", {
        resultado,
        associatedProducts
    })

})


module.exports = router;
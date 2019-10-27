const express = require ('express');
const cors = require('cors');
const productController = require ('../Controllers/product');
const Router = express.Router ();

Router
    //Product CRUD
    .get ('/', productController.getProducts)
    .get ('/:id', productController.getbyidProducts)
    .post ('/', productController.insertProduct)
    .patch ('/:id', productController.updateProduct)
    .delete('/:id', productController.deleteProduct)
    //Categories CRUD
    .get ('/categories', productController.getCategories)
    .post ('/categories', productController.insertCategories)
    .patch ('/categories/:id', productController.updateCategories)
    .delete('/categories/:id', productController.deleteCategories)
    //cannot reduce bellow zero
    .post('/add/:id', productController.addQuantity)
    .post('/reduce/:id', productController.reduceQuantity   )
    //Make Order
    .post('/order/', productController.orderProduct)

module.exports = Router;

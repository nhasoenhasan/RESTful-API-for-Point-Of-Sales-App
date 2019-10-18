const express = require ('express');
const cors = require('cors');

const productController = require ('../Controllers/product');

const Router = express.Router ();

Router.get ('/', productController.getProducts);
Router.get('/sort',productController.sortProduct);
Router.get('/search',productController.searchProduct);
Router.post ('/', productController.postProduct);
Router.post('/add/:id', productController.addQuantity);
Router.post('/reduce/:id', productController.reduceProduct);
Router.post('/order/', productController.orderProduct);
Router.put ('/', productController.updateProduct);
Router.delete('/:id', productController.deleteProduct);

module.exports = Router;

const express = require ('express');
const cors = require('cors');

const productController = require ('../Controllers/product');
const categoriesController = require ('../Controllers/categories');

const Router = express.Router ();

Router.get ('/', productController.getProducts);
Router.get('/sort',productController.sortProduct);
Router.get('/search',productController.searchProduct);
//Router.get('/:id',productController.getByIdProduct);
Router.post ('/', productController.postProduct);
Router.post('/add/:id', productController.addQuantity);
Router.post('/reduce/:id', productController.reduceProduct);
Router.post('/order/', productController.orderProduct);
Router.put ('/', productController.updateProduct);
Router.delete('/:id', productController.deleteProduct);
//-----------Categories-----------------
//Req Params For Get By Id
//Router.get ('/categories/:id', categoriesController.getByIdCategories);
Router.get ('/categories', categoriesController.getCategories);
Router.post ('/categories', categoriesController.postCategories);
Router.put ('/categories', categoriesController.updateCategories);
Router.delete('/categories/:id', categoriesController.deleteCategories);

module.exports = Router;

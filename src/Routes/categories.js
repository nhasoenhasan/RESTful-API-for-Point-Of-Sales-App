const express = require ('express');
const categoriesController = require ('../Controllers/categories');

const Router = express.Router ();

Router.get ('/', categoriesController.getCategories);
Router.post ('/', categoriesController.postCategories);
Router.put ('/', categoriesController.updateCategories);
Router.delete('/:id', categoriesController.deleteCategories);


module.exports = Router;

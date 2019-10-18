const express = require ('express');
const product = require ('./product');
const categories = require ('./categories');

const Router = express.Router ();

Router.use ('/categories', categories);
Router.use ('/product', product);

module.exports = Router;

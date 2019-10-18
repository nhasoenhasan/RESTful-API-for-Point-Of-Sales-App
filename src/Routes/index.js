const express = require ('express');
const product = require ('./product');

const Router = express.Router ();

Router.use ('/product', product);

module.exports = Router;

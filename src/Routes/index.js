const express = require ('express');
const product = require ('./product');
const auth = require ('./auth');
const form = require ('../Helpers/form');
const verify = require('../middleware/verifyToken');
const Router = express.Router ();

// Router.get('/', (req, res) => {
//   res.json({
//       message: "Welcome to Point Of Sales RESTful API",
//       author: "Nur Hasan",
//       login: "If you already have an account, please login",
//       register: "Register your account today to use Point Of Sales RESTful API"
//   }); 
// })

Router.use ('/product', verify,product);
Router.use('/auth',auth);


module.exports = Router;

const express = require ('express');
const product = require ('./product');
const auth = require ('./auth');

const Router = express.Router ();

const validateUser = (req, res, next) => {
    jwt.verify(req.headers['x-access-token'], secretKey, (err, decoded) => {
      if (err) {
        response.error(res, err.message);
      }else{
        req.body.id_user = decoded.id;
        next();
      }
    });
  }

Router.get('/', (req, res) => {
    res.json({
        message: "Welcome to Point Of Sales RESTful API",
        author: "Nur Hasan",
        login: "If you already have an account, please login",
        register: "Register your account today to use Point Of Sales RESTful API"
    });
})

Router.use ('/product',validateUser, product);
Router.use('/auth',auth);

module.exports = Router;

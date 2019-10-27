const express = require ('express');
const product = require ('./product');
const auth = require ('./auth');
const form = require ('../Helpers/form');
const verify = require('../middleware/verifyToken');
const Router = express.Router ();

const validateUser = (req, res, next) => {
    jwt.verify(req.headers['x-access-token'], secretKey, (err, decoded) => {
      if (err) {
        form.failedResponse(res, 400,'Please Resgister/Login First');
      }else{
        req.body.id_user = decoded.id;
        next();
      }
    });
  }

Router.use ('/product',verify, product);
Router.use('/auth',auth);

module.exports = Router;

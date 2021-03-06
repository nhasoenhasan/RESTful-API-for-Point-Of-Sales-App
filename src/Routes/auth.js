const express = require ('express');
const cors = require('cors');
const authController = require ('../Controllers/user');
const Router = express.Router ();

Router
    .post('/signin', authController.signinUser)
    .post('/register', authController.registerUser)

module.exports = Router;

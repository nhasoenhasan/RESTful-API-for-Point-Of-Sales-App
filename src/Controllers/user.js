const userModel = require ('../Models/user');
const form = require ('../Helpers/form');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 270400;
const salt = bcrypt.genSaltSync(10);

module.exports = {

  //Register User
  registerUser: (req, res) => {

    //Hash the Password
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)
    
    const data = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    }

    //Check username or email already exist
    userModel.registerCheck (data)
      .then (result => {
        if (result.length==0) {
          //Insert Register Data 
          return userModel.registerUser(data)
            .then(result =>res.json({
              status: 200,
              message: 'The user is successfully registered!',
              user: {
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
              }
            }))
            .catch(err=>console.log(err))
        } else {
          //respond if username or email already exist
          return res.json({
            status:400,
            message:'Username or Email already registered!'
          })
        }
      })
      .catch(err=>console.log(err))
  },

  signinUser: (req, res) => {

    const data = {
      username: req.body.username,
      password: req.body.password
    }

    userModel.signinUser (data)
      .then (result => {
        // check hashed password
        const validPassword = bcrypt.compareSync(req.body.password, result[0].password)
        if (!validPassword) {
          return res.json({
            status: 400,
            message: 'Wrong Password!'
          })
        }
        // Create and assign token
        const token = jwt.sign({
          id: result[0].id,
          username: result[0].username
        }, process.env.SECRET_KEY, {
          expiresIn: '10h'
        })
        // res.header('Authorization', token)
        res.json({
          status: 200,
          message: 'Login successfully!',
          username: result.username,
          password: result.password,
          token
        })
      })
      .catch (error =>res.json({
        status:400,
        message:'Username does not exist'
      }))
  },
  
};

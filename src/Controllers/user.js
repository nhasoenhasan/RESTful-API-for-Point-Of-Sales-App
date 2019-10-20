const userModel = require ('../Models/user');
const form = require ('../Helpers/form');
bcrypt = require('bcrypt-nodejs'),
jwt = require('jsonwebtoken'),
secretKey = process.env.SECRET_KEY || 270400;
const salt = bcrypt.genSaltSync(10);

module.exports = {

  //Register User
  registerUser: (req, res) => {

    const password = bcrypt.hashSync(req.body.password, salt)
    const username=req.body.username;
    userModel
      .registerUser (username,password)
      .then (response => {
        console.log(response)
        return userModel
        .selectUser ()
        .then (select => {
          form.successRegister(res, 200,select);
        })
        .catch (error => {
          res.json(error);
        });
      })
      .catch (error => {
        res.json(error);
      });
  },

  signinUser: (req, res) => {
    const username=req.body.username;
    const password=req.body.password;
    userModel
      .signinUser (username)
      .then (response => {

          if(response.length != 0){
              
              if(bcrypt.compareSync(req.body.password, response[0].password)){
                  
                const token = jwt.sign({id: response[0].id_user}, secretKey, {expiresIn: '1h'});
                console.log(token);
                
                let form = {
                    status:200,
                    username:response[0].username,
                    password:response[0].password,
                    message: 'Succes Login, Hello '+response[0].username,
                    Token:token
                  };
                  res.json (form);
            }else{
                form.failedResponse(res, "Password incorrect")
            }
        }else{
            form.failedResponse(res, "User not found")
        }
      })
      .catch (error => {
        res.json(error);
      })
  },
  
};

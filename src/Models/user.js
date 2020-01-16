const connection = require ('../Configs/connect');
var mysql = require('mysql');

module.exports = {

  registerCheck:(data) => {
    return new Promise ((resolve, reject) => {
      const query ='SELECT * FROM user WHERE username=? OR email=?';
      connection.query (query,[data.username,data.email], (err, response) => {
        if (!err) {
          resolve (response);
        } else {    
          reject (response);
        }
      });
    });
  },
  
  registerUser:(data) => {
    return new Promise ((resolve, reject) => {
      const query ='INSERT INTO user SET ?';
      connection.query (query,data, (err, response) => {
        if (!err) {
          resolve (response);
        } else {    
          reject (err);
        }
      });
    });
  },

  signinUser:(data) => {
    return new Promise ((resolve, reject) => {
      const query ='SELECT * FROM  user WHERE username=?';
      connection.query (query,data.username, (err, response) => {
        if (!err) {
          resolve (response);
        } else {    
          reject (err);
        }
      });
    });
  },
  

};

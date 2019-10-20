const connection = require ('../Configs/connect');
var mysql = require('mysql');

module.exports = {

    registerUser:(username,password) => {
    return new Promise ((resolve, reject) => {
      const query ='INSERT INTO user SET username=?, password=?';
      connection.query (query,[username,password], (err, response) => {
        if (!err) {
          resolve (response);
        } else {    
          reject (err);
        }
      });
    });
  },

  selectUser:() => {
    return new Promise ((resolve, reject) => {
      const query ='SELECT * FROM user';
      connection.query (query, (err, response) => {
        if (!err) {
          resolve (response);
        } else {    
          reject (err);
        }
      });
    });
  },

  signinUser:(username) => {
    return new Promise ((resolve, reject) => {
      const query ='SELECT * FROM  user WHERE username=?';
      connection.query (query,username, (err, response) => {
        if (!err) {
          resolve (response);
        } else {    
          reject (err);
        }
      });
    });
  },
  

};

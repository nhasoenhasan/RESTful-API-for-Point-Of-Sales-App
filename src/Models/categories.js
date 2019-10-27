const connection = require ('../Configs/connect');
var mysql = require('mysql');
const query='SELECT * FROM categories'

module.exports = {
  
  //Get Categories
  getCategories: (queryLimit) => {
    return new Promise ((resolve, reject) => {
      connection.query (`${query} ${queryLimit}`, (err, response) => {
        if (!err) {
          resolve (response);
        } else {
          reject (err);
        }
      });
    });
  },

  //Check Categories
  checkCategories: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(`${query} WHERE id_categories=?`,id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(result)
        }
      })
    })
  },

  //INSERT Categories
  postCategories: (data) => {
    return new Promise ((resolve, reject) => {
      connection.query ('INSERT INTO categories SET ?',data,
        (err, response) => {
          if (!err) {
            resolve (response);
          } else {
            reject (err);
          }
        }
      );
    });
  },

  //Update Categories
  updateCategories: (data,id) => {
    return new Promise ((resolve, reject) => {
      connection.query (
        'UPDATE categories SET ? WHERE id_categories=?',[
          data,
          id
        ],
        (err, response) => {
          if (!err) {
            resolve (response);
          } else {
            reject (err);
          }
        }
      );
    });
  },

  //Delete Categories
  deleteCategories: (id) => {
    return new Promise ((resolve, reject) => {
      connection.query (
        'DELETE FROM categories WHERE id_categories=?',
        [id                                                                                                                             ],
        (err, response) => {
          if (!err) {
            resolve (response);
          } else {
            reject (err);
          }
        }
      );
    });
  },
  
};

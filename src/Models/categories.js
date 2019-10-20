const connection = require ('../Configs/connect');
var mysql = require('mysql');
module.exports = {

  getCount:() => {
    return new Promise ((resolve, reject) => {
      let query ='SELECT COUNT(*) AS total FROM categories';
      query = mysql.format(query);
        connection.query (query, (err, response) => {
          if (!err) {
            resolve (response);
          } else {
            reject (err);
          }
          });
      });
  },

  getCategories: (page,perpage) => {
    return new Promise ((resolve, reject) => {
      connection.query ('SELECT * FROM categories limit ? OFFSET ?',[perpage,page], (err, response) => {
        if (!err) {
          resolve (response);
        } else {
          reject (err);
        }
      });
    });
  },

  getByIdCategories: req => {
    console.log(req.params.id);
    return new Promise ((resolve, reject) => {
      connection.query ('SELECT * FROM categories WHERE id_categories=?',req.params.id, (err, response) => {
        if (!err) {
          resolve (response);
        } else {
          reject (err);
        }
      });
    });
  },

  postCategories: req => {
    return new Promise ((resolve, reject) => {
      const body = req.body;
      console.log(body.Categories);
      connection.query (
        'INSERT INTO categories SET Categories=?',
        [body.Categories],
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

  updateCategories: req => {
    return new Promise ((resolve, reject) => {
      const body = req.body;
      connection.query (
        'UPDATE categories SET Categories=? WHERE id_categories=?',
        [body.Categories,body.id_categories],
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

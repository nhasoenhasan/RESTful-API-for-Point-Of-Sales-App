const connection = require ('../Configs/connect');
var mysql = require('mysql');
const joinTable ='SELECT products.id_product,products.quantity,products.name,products.description,products.image,categories.Categories ,products.price,products.date_added,products.date_updated FROM products INNER JOIN categories ON products.id_categories=categories.id_categories'

module.exports = {

    //GET PRODUCT
    getProduct:(queryLimit, sort, order, querySearch) => {
      return new Promise ((resolve, reject) => {
          connection.query (`${joinTable} ${querySearch} ORDER BY ${sort} ${order} ${queryLimit}`, (err, response) => {
            if (!err) {
              resolve (response);
            } else {
              
              reject (err);
            }
            });
        });
    },

    //GET PRODUCT BY ID
    getbyidProduct:(id) => {
      return new Promise ((resolve, reject) => {
          connection.query (`${joinTable}  WHERE products.id_product=${id}`, (err, response) => {
            if (!err) {
              resolve (response);
            } else {
              reject (err);
            }
            });
        });
    },
    
    //GET A BOOK
    getAProduct: (id) => {
      return new Promise((resolve, reject) => {
        connection.query(`${joinTable} AND products.id_product=?`,id, (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(result)
          }
        })
      })
    },
 
    //INSERT PRODUCT
    postProduct: (data) => {
      return new Promise ((resolve, reject) => {
        connection.query (
          'INSERT INTO products SET ?',data,
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
  
    //UPDATE PRODUCT
    updateProduct: (data,id) => {
      return new Promise ((resolve, reject) => {
        connection.query ('UPDATE products SET ? WHERE id_product=?',[
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

  //Delete Product
  deleteProduct: (id) => {
    return new Promise ((resolve, reject) => {
      connection.query (
        'DELETE FROM products WHERE id_product=?',id,
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

  //Check Categories
  checkQuantity: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM products WHERE id_product=?`,id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(result)
        }
      })
    })
  },

  //Add Quantity Product
  addProduct: (quantity,id) => {
    return new Promise ((resolve, reject) => {
      connection.query ('UPDATE products SET quantity = quantity + ?  WHERE id_product=?',[quantity,id], (err, response) => {
        if (!err) {
          resolve (response);
        } else {
          reject (err);
        }
      });
    });
  },

  reduceProduct: (quantity,id) => {
    return new Promise ((resolve, reject) => {
      connection.query ('UPDATE products SET quantity = quantity - ?  WHERE id_product=?',[quantity,id], (err, response) => {
        if (!err) {
          resolve (response);
        } else {
          reject (err);
        }
      });
    });
  },

  //Check Categories
  checkQuantityorder: (id_product) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT quantity FROM products WHERE id_product IN (?)`,[id_product], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  //Make Order
  insertOrder: req => {
    const insertorder="INSERT INTO `order` SET total=?";
    const insertdetail="INSERT INTO `detail_order`(`id_order`, `id_product`, `qty`, `sub_total`) VALUES ?";
    const total=req.body.total;
    
    return new Promise((resolve, reject) => {
      connection.query (
        //Insert Order
        insertorder,[total], (err, response) => {
          //Get Id Order
          const idorder=response.insertId;
          //Maping Data Detail Order
          const detail_order =req.body.order.map(item =>[
          idorder,item.id_product,item.quantity,item.sub_total  
          ]);
          if (!err) {
            //Insert Detail Order
            connection.query (
              insertdetail,[detail_order], (err, response) => {
                if (!err) {
                  resolve(response);
                } else {
                  reject (err);
                }
              });
          } else {
            reject (err);
          }
      });
    })
  },

};

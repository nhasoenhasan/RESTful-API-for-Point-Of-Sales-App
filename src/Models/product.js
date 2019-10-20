const connection = require ('../Configs/connect');
var mysql = require('mysql');


module.exports = {

  getCount:() => {
    return new Promise ((resolve, reject) => {
      let query ='SELECT COUNT(*) AS total FROM products';
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

  getProduct:(page,perpage) => {
    return new Promise ((resolve, reject) => {
      let query ='SELECT products.quantity,products.name,products.description,products.image,categories.Categories ,products.price,products.date_added,products.date_updated FROM products INNER JOIN categories ON products.id_categories=categories.id_categories limit ? OFFSET ?';
      let set = [perpage,page];
      query = mysql.format(query, set);
        connection.query (query, (err, response) => {
          if (!err) {
            resolve (response);
          } else {
            reject (err);
          }
          });
      });
  },

  getByIdProduct:req => {
    return new Promise ((resolve, reject) => {
      let query ='SELECT products.quantity,products.name,products.description,products.image,categories.Categories ,products.price,products.date_added,products.date_updated FROM products INNER JOIN categories ON products.id_categories=categories.id_categories WHERE id_product=?';
      let id = req.params.id;
      connection.query (query,id, (err, response) => {
        if (!err) {
          resolve (response);
        } else {
          reject (err);
        }
      });
    });
  },
  
  postProduct: req => {
    return new Promise ((resolve, reject) => {
      const body = req.body;
      connection.query (
        'INSERT INTO products SET name=?,description=?, image=?,id_categories=?,price=?,quantity=?',
        [body.name, body.description,body.image, body.id_categories, body.price,body.quantity ],
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
  
  updateProduct: req => {
    return new Promise ((resolve, reject) => {
      const body = req.body;
      connection.query (
        'UPDATE products SET name=?,description=?,image=?,id_categories=?,price=?,quantity=? WHERE id_product=?',
        [body.name,body.description,body.image, body.id_categories, body.price,body.quantity,body.id_product  ],
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

  deleteProduct: (id) => {
    return new Promise ((resolve, reject) => {
      connection.query (
        'DELETE FROM products WHERE id_product=?',
        [id],
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

  sortProduct: req => {
    multiQuery='SELECT products.name,products.description,products.image,categories.Categories ,products.price,products.date_added,products.date_updated FROM products INNER JOIN categories ON products.id_categories=categories.id_categories ORDER BY ';
    const name =req.query.sortby;
    const order=req.query.orderby;
    const cekname=['name','Categories','date_updated'];
    const cekorder=['ASC','DESC'];
    
    return new Promise ((resolve, reject) => {
      
      if (cekname.includes(name)) {
        if((cekorder.includes(order))){
          connection.query (
          multiQuery+name+' '+order,
            (err, response) => {
              if (!err) {
                resolve (response);
              } else {
                reject (err);
              }
          }
        );
        }else{
          connection.query (
            multiQuery+name,
              (err, response) => {
                if (!err) {
                  resolve (response);
                } else {
                  reject (err);
                }
            }
          );
        }
      } else {
        connection.query (
          multiQuery+'name',
            (err, response) => {
              if (!err) {
                resolve (response);
              } else {
                reject (err);
              }
          }
        )
      }
    });
  },

  searchProduct: req => {
    const name =req.query.keywoard;
    return new Promise ((resolve, reject) => {
      connection.query ('SELECT products.name,products.description,products.image,categories.Categories ,products.price,products.date_added,products.date_updated FROM products INNER JOIN categories ON products.id_categories=categories.id_categories WHERE name LIKE? ',['%'+name+'%'], (err, response) => {
        if (!err) {
          resolve (response);
        } else {
          reject (err);
        }
      });
    });
  },

  addProduct: req => {
    const body = req.body;
    const id=req.params.id;
    query='UPDATE products SET quantity = quantity + ?  WHERE id_product=?';
    
    return new Promise ((resolve, reject) => {
      connection.query (
      query,
      [body.quantity,id], (err, response) => {
        if (!err) {
          resolve (response);
        } else {
          reject (err);
        }
      });
    });
  },

  reduceProduct: req => {
    const body = req.body;
    const id=req.params.id;
    query='UPDATE products SET quantity = quantity - ?  WHERE id_product=?';
    cekqty='SELECT quantity FROM products WHERE id_product=?';
    return new Promise ((resolve, reject) => {
      connection.query (
        cekqty,[id], (err, response) => {
          if (!err) {
            if (response[0].quantity >= body.quantity ) {
                if (response[0].quantity == 0) {
                  resolve('Qty Insert Is Zero (0)');
                } else {
                  connection.query (
                    query,
                    [body.quantity,id], (err, response) => {
                      if (!err) {
                        resolve ("Success Reduce Quantity");
                      } else {
                        reject (err);
                      }
                    });
                }
            } else {
              resolve('Quantity To Reduce:('+body.quantity+')More Higher Than Quantity Available('+response[0].quantity+')');
            }
          } else {
            reject (err);
          }
        });
    });
  },

  orderProduct: req => {
    const total=req.body.total;
    const insertorder="INSERT INTO `order` SET total=?";
    const insertdetail="INSERT INTO `detail_order`(`id_order`, `id_product`, `qty`, `sub_total`) VALUES ?";
    const querycekqty="SELECT quantity FROM products WHERE id_product IN (?)"
    let qtyStatus = [];
    
    return new Promise ((resolve, reject) => {
      //Maping Data Cek Id Product
      const cekqty =req.body.order.map (item =>[
         item.id_product
      ]);
      //Maping  Data Quantity 
      const qtyinsert=req.body.order.map (item =>[
        item.quantity
     ]);
     //Get Quantity
      connection.query (
      querycekqty,[cekqty], (err, response) => {
        if (!err) {
          //Compare Quantity
          cekqty.forEach(function(item, index,array){
            if (response[index].quantity > qtyinsert[index]) {
              qtyStatus.push('true');
            }else{
              qtyStatus.push('false');
            }
          });
          //Insert Order
          if (qtyStatus.includes('false')) {
            resolve ("Value Quantity Product Insert Is More Higher Than Data Availabel");
          }else{
            connection.query (
              //Insert Order
              insertorder,[total], (err, response) => {
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
                        resolve("Succes Make Order");
                      } else {
                        reject (err);
                      }
                    });
                } else {
                  reject (err);
                }
            });
          }
        } else {
          reject (err);
        }
    });
    });
  },

};

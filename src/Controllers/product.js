const productModel = require ('../Models/product');
const form = require ('../Helpers/form');

module.exports = {
  getProducts: (req, res) => {
    productModel
      .getProduct (req)
      .then (response => {
        form.formgetProduct (res, 200, response);
      })
      .catch (error => {
        console.log (error);
      });
  },

  postProduct: (req, res) => {
    productModel
      .postProduct (req)
      .then (response => {
        res.json ("Succes Input");
      })
      .catch (err => {
        console.log (err);
      });
  },
  
  updateProduct: (req, res) => {
    productModel
      .updateProduct (req)
      .then (response => {
        res.json ("Succes Update");
      })
      .catch (err => {
        console.log (err);
      });
  },

  deleteProduct: (req, res) => {
    productModel
      .deleteProduct (req.params.id)
      .then (response => {
        res.json ("Succes Delete");
      })
      .catch (err => {
        console.log (err);
      });
  },

  sortProduct: (req, res) => {
    productModel
      .sortProduct (req)
      .then (response => {
        form.formgetProduct (res, 200, response);
      })
      .catch (error => {
        console.log (error);
      });
  },

  searchProduct: (req, res) => {
    productModel
      .searchProduct (req)
      .then (response => {
        form.formgetProduct (res, 200, response);
      })
      .catch (error => {
        console.log (error);
      });
  },

  addQuantity: (req, res) => {
    productModel
      .addProduct (req)
      .then (response => {
        res.json ("Succes Add Quantity");
      })
      .catch (error => {
        console.log (error);
      });
  },

  reduceProduct: (req, res) => {
      productModel
        .reduceProduct (req)
        .then (response => {
          res.json (response); 
        })
        .catch (error => {
          console.log (error);
        });
  },

  orderProduct: (req, res) => {
    productModel
      .orderProduct (req)
      .then (response => {
        res.json (response); 
      })
      .catch (error => {
        console.log (error);
      })
},

  
};

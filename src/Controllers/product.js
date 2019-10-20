const productModel = require ('../Models/product');
const form = require ('../Helpers/form');


module.exports = {

  
  //Get Product 
  getProducts: (req, res) => {
    //Pagination
    let page = parseInt(req.query.page)||1;
    let perpage = parseInt(req.query.perpage)||10;
    let currentpage=page;
    page = (page - 1) * perpage;
    productModel
      .getProduct (page,perpage)
      .then (response => {
          return productModel 
          .getCount ()
          .then (count => {
            let total=Math.ceil(count[0].total/perpage)
            form.formgetProduct (res, 200, response,currentpage,perpage,total);
          })
          .catch (error => {
            res.json(error);
          });
      })
      .catch (error => {
        res.json(error);
      });
  },

  //Insert Product
  postProduct: (req, res) => {
    productModel
      .postProduct (req)
      .then (response => {
        form.successResponse (res, 200,"Succes Input");
      })
      .catch (err => {
        res.json(err);
      });
  },
  
  updateProduct: (req, res) => {
    productModel
      .updateProduct (req)
      .then (response => {
        form.successResponse (res, 200,"Succes Update");
      })
      .catch (err => {
        res.json(error);
      });
  },

  deleteProduct: (req, res) => {
    productModel
      .deleteProduct (req.params.id)
      .then (response => {
        form.successResponse (res, 200,"Succes Delete");
      })
      .catch (err => {
        res.json(error);
      });
  },

  sortProduct: (req, res) => {
    productModel
      .sortProduct (req)
      .then (response => {
        form.formgetProduct (res, 200, response);
      })
      .catch (error => {
        res.json(error);
      });
  },

  searchProduct: (req, res) => {
    productModel
      .searchProduct (req)
      .then (response => {
        console.log(response);
        if (response=='') {
          form.failedResponse (res, 400, 'product does not exist');
        } else {
          form.formgetProduct (res, 200, response);
        }
      })
      .catch (error => {
        res.json(error);
      });
  },

  addQuantity: (req, res) => {
    qty=req.body.quantity
    if (qty < 0) {
      form.failedResponse(res,400,'Cannot Add Quantity With Value Below 0')
    } else {
      productModel
      .addProduct (req)
      .then (response => {
        form.successResponse (res, 200,"Succes Add Quantity");
      })
      .catch (error => {
        res.json(error);
      });
    }
  },

  reduceProduct: (req, res) => {
       qty=req.body.quantity
    if (qty < 0) {
      form.failedResponse(res,400,'Cannot Reduce Quantity With Value Below 0')
    }else{
      productModel
        .reduceProduct (req)
        .then (response => {
          let form = {
            message: response,
          };
          res.json (form); 
        })
        .catch (error => {
          res.json(error);
        });
    }
  },

  orderProduct: (req, res) => {
    productModel
      .orderProduct (req)
      .then (response => {
        let form = {
          message: response,
        };
        res.json (form);  
      })
      .catch (error => {
        res.json(error);
      })
  },

  getByIdProduct: (req, res) => {
    productModel
      .getByIdProduct (req)
      .then (response => {
        if (response=='') {
          form.failedResponse (res, 400, 'product does not exist');
        } else {
          form.formgetProduct (res, 200, response);
        }
      })
      .catch (error => {
        res.json(error);
      })
  },

  
};

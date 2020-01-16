const productModel = require ('../Models/product');
const categoriesModel = require ('../Models/categories');
const form = require ('../Helpers/form');


module.exports = {

  
  //Get Product 
  getProducts: (req, res) => {
    const numPerPage = parseInt(req.query.limit) || null
    const activePage = req.query.page || 1
    const beginData = numPerPage * (activePage - 1)
    const sort = req.query.sort || 'name'
    const order = req.query.order || 'DESC'
    const search = req.query.search || null
    const queryLimit = (numPerPage !== null) ? `LIMIT ${beginData},${numPerPage}` : ''
    const querySearch = (search !== null) ? `AND products.name LIKE'%${search}%'` : ''

    productModel.getProduct (queryLimit, sort, order, querySearch)
      .then (result =>res.json({
        status:200,
        currentPage:activePage,
        limit:numPerPage,
        sort,
        order,
        search,
        result
      }))
      .catch (error => {
        res.json(error);
      });
  },

  //Get Product By Id
  getbyidProducts: (req, res) => {
    id=req.params.id;
    productModel.getbyidProduct (id)
      .then (result =>res.json({
        status:200,
        result
      }))
      .catch (error => {
        res.json(error);
      });
  },

  //Insert Product
  insertProduct: (req, res) => {
    const data = {
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      id_categories: req.body.id_categories,
      price: req.body.price,
      quantity: req.body.quantity,
    }
    productModel
      .postProduct (data)
      .then (result => res.json({
        status:200,
        message:'Product has successfully added!',
        result
      }))
      .catch (err => {
        console.log(err);
      });
  },
  
  //UPDATE PRODUCT
  updateProduct: (req, res) => {
    const data = {
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      id_categories: req.body.id_categories,
      price: req.body.price,
      quantity: req.body.quantity,
    }

    const id = req.params.id

    productModel.getAProduct (id)
      .then(result => {
        if (result.length !== 0) {
          return productModel.updateProduct(data, id)
            .then(result => res.json({
              status: 200,
              message: 'Product has successfully updated',
              id,
              result
            }))
            .catch(err => console.log(err))
        } else {
          return res.status(400).send({
            status: 400,
            id,
            message: 'Product does not exist'
          })
        }
    })
    .catch(err => console.log(err))
  },

  //DELETE PRODUCT
  deleteProduct: (req, res) => {
    const id = req.params.id
    productModel.getAProduct (id)
      .then(result => {
        if (result.length !== 0) {
          return productModel.deleteProduct(id)
            .then(result => res.json({
              status: 200,
              id:id,
              message: 'Product has been deleted',
            }))
            .catch(err => console.log(err))
        } else {
          return res.status(400).send({
            status: 400,
            id,
            message: 'Product does not exist'
          })
        }
    })
  },

  //Get Categories 
  getCategories: (req, res) => {
    const numPerPage = parseInt(req.query.limit) || null
    const activePage = req.query.page || 1
    const beginData = numPerPage * (activePage - 1)
    const queryLimit = (numPerPage !== null) ? `LIMIT ${beginData},${numPerPage}` : ''

    categoriesModel.getCategories (queryLimit)
   
      .then (result =>res.json({
        status:200,
        totalData: result.length,
        message: 'This is the lists of Categories',
        result
      }))
      .catch (error => {
        res.json(error);
      });
  },

  //Insert Categories
  insertCategories: (req, res) => {
    const data = {
      Categories: req.body.Categories,
    }
    categoriesModel
      .postCategories (data)
      .then (result => res.json({
        status:200,
        message:'Categories has successfully added!',
        result:result
      }))
      .catch (err => {
        console.log(err);
      });
  },

  //UPDATE CATEGORIES
  updateCategories: (req, res) => {
    const data = {
      Categories: req.body.Categories,
    }
    const id = req.params.id
    categoriesModel.checkCategories (id)
      .then(result => {
        if (result.length !== 0) {
          
          return categoriesModel.updateCategories(data, id)
            .then(result => res.json({
              status: 200,
              message: 'Categories has successfully updated',
              result
            }))
            .catch(err => console.log(err))
        } else {
          return res.status(400).send({
            status: 400,
            id,
            message: 'Categories does not exist'
          })
        }
    })
    .catch(err => console.log(err))
  },

  //DELETE CATEGORIES
  deleteCategories: (req, res) => {

    const id = req.params.id

    categoriesModel.checkCategories (id)
      .then(result => {
        if (result.length !== 0) {
          
          return categoriesModel.deleteCategories(id)
            .then(result => res.json({
              status: 200,
              id:id,
              message: 'Categories has been delete',
            }))
            .catch(err => console.log(err))
        } else {
          return res.status(400).send({
            status: 400,
            id,
            message: 'Categories does not exist'
          })
        }
    })
    .catch(err => console.log(err))
  },

  //Add Quantity Product
  addQuantity: (req, res) => {
    const qty=req.body.quantity;
    const id=req.params.id;

    if (qty < 0) {
      res.json({
        status: 400,
        id:id,
        quantity:qty,
        message: 'Cannot Add Quantity With Value Below 0',
      })
    } else {
      productModel
      .addProduct (qty,id)
      .then (response => res.json({
        status: 200,
        id:id,
        quantity:qty,
        message: 'Succes Add Quantity',
      }))
      .catch (error => {
        res.json(error);
      });
    }
  },

  //Reduce Quantity
  reduceQuantity: (req, res) => {
    const qty=req.body.quantity;
    const id=req.params.id;

    productModel.checkQuantity (id)
      .then(result => {
        if (qty <0) {
          res.json({
            status: 400,
            id,
            quantity_input:qty,
            message: 'Qty Input Is Below Zero/Negatif value'
          })
        } else {
          if (result[0].quantity >= qty) {
            if (qty == 0) {
              res.json({
                status: 400,
                id,
                quantity_input:qty,
                quantity_availabel:result[0].quantity,
                message: 'Qty Input Is Zero'
              })
            } else {
              return productModel.reduceProduct(qty,id)
              .then(result => res.json({
                status: 200,
                id:id,
                quantity:qty,
                message: 'Succes Reduce Quantity',
              }))
              .catch(err => console.log(err))
            }
          } else {
              res.json({
              status: 400,
              id,
              quantity_input:qty,
              quantity_availabel:result[0].quantity,
              message: 'Qty Input More Higer Than Qty Availabel'
            })
          }
        }
      })
      .catch(err => console.log(err))
    
  },

  //Make Order
  orderProduct: (req, res) => {
    let qtyStatus = [];
    let newOrder = Object.values(req.body.order)
    let id_product=[];
    let qtyinsert=[];
    const total=req.body.total;

    //Maping Data Cek Id Product
    newOrder.forEach(function (item) {
      id_product.push(item.id_product)
    });

    //Maping  Data Quantity 
    newOrder.map (item =>{
      qtyinsert.push(item.quantity)
    });

    console.log(id_product)
    //Cek Quantity
    productModel.checkQuantityorder (id_product)
      .then (response => {
          //Compare Quantity
          id_product.forEach(function(item, index,array){
            if (response[index].quantity > qtyinsert[index]) {
              qtyStatus.push('true');
            }else{
              qtyStatus.push('false');
            }
          });
          //Check True or False
          if (qtyStatus.includes('false')) {
            res.json({
              status: 400,
              message: 'Failed Make Order Qty Is Not Availabel',
            })
          }else{
            //Make Order
            return productModel.insertOrder(total,newOrder)
              .then(result => res.json({
                status: 200,
                message: 'Succes Make Order',
              }))
              .catch(err => console.log(err))
          }

      })
      .catch (error => {
        res.json(error);
      })
  },

  //Get All History Order
  getallorderProduct: (req, res) => {
    productModel.getallorderProduct()
      .then (result =>res.json({
        status:200,
        message:'Succes',
        data:result
      }))
      .catch (error => {
        res.json(error);
      });
  },

  
};

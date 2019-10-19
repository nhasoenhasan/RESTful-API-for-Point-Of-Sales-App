const categoriesModel = require ('../Models/categories');
const form = require ('../Helpers/form');

module.exports = {
  getCategories: (req, res) => {
    //Count Page
    let page = parseInt(req.query.page)||1;
    let perpage = parseInt(req.query.perpage)||10;
    let currentpage=page;
    page = (page - 1) * perpage;
    categoriesModel
      .getCategories (page,perpage)
      .then (response => {
        form.successcategories (res, 200, response,currentpage,perpage);
      })
      .catch (error => {
        res.json(error);
      });
  },

  postCategories: (req, res) => {
      categoriesModel
      .postCategories (req)
      .then (response => {
        form.successResponse (res, 200,"Succes Input");
      })
      .catch (err => {
        res.json(err);
      });
  },

  updateCategories: (req, res) => {
    categoriesModel
      .updateCategories (req)
      .then (response => {
        form.successResponse (res, 200,"Succes Update");
      })
      .catch (err => {
        res.json(error);
      });
  },

  deleteCategories: (req, res) => {
    categoriesModel
      .deleteCategories (req.params.id)
      .then (response => {
        form.successResponse (res, 200,"Succes Delete");
      })
      .catch (err => {
        res.json(error);
      });
  },
};

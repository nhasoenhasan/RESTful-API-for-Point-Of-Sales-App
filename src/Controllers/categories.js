const categoriesModel = require ('../Models/categories');
const form = require ('../Helpers/form');

module.exports = {
  getCategories: (req, res) => {
    categoriesModel
      .getCategories ()
      .then (response => {
        form.successcategories (res, 200, response);
      })
      .catch (error => {
        res.json(error);
      });
  },

  postCategories: (req, res) => {
      categoriesModel
      .postCategories (req)
      .then (response => {
        res.json ("Succes Input");
      })
      .catch (err => {
        res.json(err);
      });
  },

  updateCategories: (req, res) => {
    categoriesModel
      .updateCategories (req)
      .then (response => {
        res.json ("Succes Update");
      })
      .catch (err => {
        console.log (err);
      });
  },

  deleteCategories: (req, res) => {
    console.log(req.params.id);
    categoriesModel
      .deleteCategories (req.params.id)
      .then (response => {
        res.json ("Succes Delete");
      })
      .catch (err => {
        console.log (err);
      });
  },
};

var dateFormat = require ('dateformat');



module.exports = {
    
    formgetProduct: (res, status, result) => {
      
      let format = result.map (item => {
        return {
          id:item.id_product,
          name: item.name,
          Price:item.price,
          Description:item.description,
          Category:item.category,
          Price:item.price,
          Date_Added:dateFormat(item.date_added),
          Date_Updated:dateFormat(item.date_updated),
          Quantity :item.quantity
          
        };
      });

      let form = {
        status,
        result: format,
      };
      res.json (form);
    },

    successcategories: (res, status, result) => {
      
      let format = result.map (item => {
        return {
          id:item.id_categories,
          Categories:item.Categories
        };
      });

      let form = {
        status,
        result: format,
      };
      res.json (form);
    },

   
  };
  
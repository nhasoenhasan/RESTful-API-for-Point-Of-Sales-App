var dateFormat = require ('dateformat');

module.exports = {
    //GET PRODUCT FORM
    formgetProduct: (res, status, result,currentpage,perpage) => {
      
        let format = result.map (item => {
          return {
            id:item.id_product,
            name: item.name,
            Price:item.price,
            Description:item.description,
            Category:item.Categories,
            Price:item.price,
            Date_Added:dateFormat(item.date_added),
            Date_Updated:dateFormat(item.date_updated),
            Quantity :item.quantity
          };
        });

        let form = {
          status,
          result: format,
          page:currentpage,
          perpage:perpage
        };
        res.json (form);
      
    },

    //Succes Response
    successResponse: (res, status, message) => {
      let form = {
        status,
        message: message,
      };
      res.json (form);
    },
    //Failed Response
    failedResponse: (res, status, message) => {
      let form = {
        status,
        message: message,
      };
      res.json (form);
    },

    successcategories: (res, status, result,currentpage,perpage) => {
      
      let format = result.map (item => {
        return {
          id:item.id_categories,
          Categories:item.Categories
        };
      });

      let form = {
        status,
        result: format,
        page:currentpage,
        perpage:perpage
      };

      res.json (form);
    },

    
  };
  
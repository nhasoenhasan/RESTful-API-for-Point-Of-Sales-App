var dateFormat = require ('dateformat');

module.exports = {
    //GET PRODUCT FORM
    formgetProduct: (res, status, result,currentpage,perpage,total) => {
      
        let format = result.map (item => {
          return {
            id:item.id_product,
            name: item.name,
            Price:item.price,
            Description:item.description,
            Category:item.Categories,
            Price:item.price,
            Date_Added:item.date_added,
            Date_Updated:item.date_updated,
            Quantity :item.quantity
          };
        });

        let form = {
          status,
          result: format,
          page:currentpage,
          from:total,
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

    //GET Categories 
    successcategories: (res, status, result,currentpage,perpage,total) => {
      
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
        from:total,
        perpage:perpage
      };
      res.json (form);
    },

    //Succes Register 
    successRegister: (res, status, result) => {
      
      let format = result.map (item => {
        return {
          username:item.username
        };
      });

      let form = {
        status,
        message:"Succes Register",
        result: format
      };
      res.json (form);
    },

    
  };
  
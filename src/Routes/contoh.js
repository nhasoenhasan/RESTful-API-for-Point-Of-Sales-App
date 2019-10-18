/*router.post("/users/platform/Notifications",routeValidator.validate({   body:{
    'start': { isRequired: true },
    'limit': { isRequired: true }
 }
}), function(req, res) {   
    //To calculate Total Count use MySQL count function
    var query = "Select count(*) as TotalCount from ??"; 
    // Mention table from where you want to fetch records example-users
    var table = ["users"]; 
    
    query = mysql.format(query, table);

    connection.query(query, function(err, rows) {
     if(err){
       return err;
     }else{
      
        //store Total count in variable
        let totalCount = rows[0].TotalCount
      
        if(req.body.start == '' || req.body.limit == ''){
            let startNum = 0;
            let LimitNum = 10;
        }
        
        else{
            //parse int Convert String to number 
            let startNum = parseInt(req.body.start);
            let LimitNum = parseInt(req.body.limit);
        }
    }
    var query = "Select * from ?? ORDER BY created_at DESC limit ? OFFSET ?";
    //Mention table from where you want to fetch records example-users & send limit and start 
    var table = ["users",LimitNum,startNum];
    query = mysql.format(query, table);

    connection.query(query, function(err, rest) {
     if(err){
      res.json(err);
    }
    else{
    // Total Count varibale display total Count in Db and data display the records
       res.json("Total Count": totalCount , "data":rest)
    }});
    });*/
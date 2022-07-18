const { Router } = require('express');
var express = require('express');
require('./users/usersBL');
var appRouter = express.Router();

appRouter.post("/insertData", urlencodedParser,(req,resp) => {
    console.log("in method");
    const dataToInsert = req.body;
    let sql = 'INSERT INTO users SET ?';
    let query = db.query(sql, dataToInsert, (err,result)=> {
        if(err) console.log(err);
          resp.send('SUCCESS');
    });
    var data = await `${dataToInsert.dataType}`.insert(dataToInsert);
    return resp.json(data);
})

module.exports = appRouter;
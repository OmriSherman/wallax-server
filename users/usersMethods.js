const { Router } = require('express');
var express = require('express');
var bodyParser = require('body-parser');
const db = require('../configDb');
var appRouter = express.Router();
var jsonParser = bodyParser.json() 


appRouter.get("/getAll",(req,resp) => {
    let sql = 'SELECT * FROM USERS';
    db.query(sql, (err,result)=> {
        if(err) throw(err);
        resp.send(result);
    });
})

appRouter.get("/getById/:id",(req,resp) => {
    let sql = `SELECT * FROM users WHERE id = ${req.params.id}`;
    db.query(sql, (err,result)=> {
        if(err) throw(err);
        resp.send(result);
    });
})

appRouter.post("/insert",jsonParser,(req,resp) => {
    const user = req.body;
    let sql = 'INSERT INTO users SET ?';
    db.query(sql,user, (err,result)=> {
        if(err) throw(err);
        resp.send(result);
    });
})

appRouter.put("/update/:id",jsonParser,(req,resp) => {
    const data = req.body;
    console.log(data);
    let sql = `UPDATE users SET ? WHERE id = ${req.params.id}`;
    db.query(sql, data, (err,result)=> {
        if(err) throw(err);
        resp.send(result);
    });

})

appRouter.delete("/delete/:id",(req,resp) => {
    const rowToDelete = req.params.id;
    let sql = `DELETE FROM users WHERE id = ${rowToDelete}`;
    db.query(sql, (err,result)=> {
        if(err) throw(err);
        resp.send(result);
    });
})

module.exports = appRouter;
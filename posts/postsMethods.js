const { Router } = require('express');
var express = require('express');
var bodyParser = require('body-parser');
const db = require('../configDb');
var appRouter = express.Router();
var jsonParser = bodyParser.json() 


appRouter.get("/getAll",(req,resp) => {
    let sql = 'SELECT * FROM posts';
    db.query(sql, (err,result)=> {
        if(err) throw(err);
        resp.send(result);
    });
})

appRouter.get("/getById/:id",(req,resp) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    db.query(sql, (err,result)=> {
        if(err) throw(err);
        resp.send(result);
    });
})

appRouter.post("/insert",jsonParser,(req,resp) => {
    const post = req.body;
    let sql = 'INSERT INTO posts SET ?';
    db.query(sql, post, (err,result)=> {
        if(err) throw(err);
        resp.send(result);
    });
})

appRouter.put("/update/:id",jsonParser,(req,resp) => {
    const data = req.body;
    console.log(data);
    let sql = `UPDATE posts SET ? WHERE id = ${req.params.id}`;
    db.query(sql, data, (err,result)=> {
        if(err) throw(err);
        resp.send(result);
    });

})

appRouter.delete("/delete/:id",(req,resp) => {
    const rowToDelete = req.params.id;
    let sql = `DELETE FROM posts WHERE id = ${rowToDelete}`;
    db.query(sql, (err,result)=> {
        if(err) throw(err);
        resp.send(result);
    });
})

module.exports = appRouter;
const { Router } = require('express');
var express = require('express');
var bodyParser = require('body-parser');
const db = require('../configDb');
var appRouter = express.Router();
var jsonParser = bodyParser.json() 


appRouter.get("/getAll",(req,resp) => {
    let sql = 'SELECT * FROM user_friends';
    db.query(sql, (err,result)=> {
        if(err) throw(err);
        resp.send(result);
    });
})

appRouter.get("/getById/:id",(req,resp) => {
    let sql = `SELECT * FROM user_friends WHERE id = ${req.params.id}`;
    db.query(sql, (err,result)=> {
        if(err) throw(err);
        resp.send(result);
    });
})

appRouter.post("/insert",jsonParser,(req,resp) => {
    const post = req.body;
    let sql = 'INSERT INTO user_friends SET ?';
    db.query(sql, post, (err,result)=> {
        if(err) throw(err);
        resp.send(result);
    });
})

appRouter.put("/update/:id",jsonParser,(req,resp) => {
    const data = req.body;
    console.log(data);
    let sql = `UPDATE user_friends SET ? WHERE id = ${req.params.id}`;
    db.query(sql, data, (err,result)=> {
        if(err) throw(err);
        resp.send(result);
    });

})

appRouter.delete("/delete/:id",(req,resp) => {
    const rowToDelete = req.params.id;
    let sql = `DELETE FROM user_friends WHERE id = ${rowToDelete}`;
    db.query(sql, (err,result)=> {
        if(err) throw(err);
        resp.send(result);
    });
})

appRouter.get("/getUserFriends/:id",(req,resp) => {
    let sql = `SELECT * FROM user_friends WHERE user_id = ${req.params.id}`;
    db.query(sql, (err,result)=> {
        if(err) throw(err);
        resp.send(result);
    });
})

appRouter.post("/addFriend",jsonParser,(req,resp) => {
    const friends = req.body;
    friends.forEach(friend => {
        let sql = 'INSERT INTO user_friends SET ?';
    db.query(sql, friend, (err,result)=> {
        if(err) throw(err);
    });
    });
    resp.send('New friend added!');
})

appRouter.delete("/unfriend",jsonParser,(req,resp) => {
    const {user_id, friend_id} = req.body;
        let sql = `DELETE FROM user_friends WHERE user_id = ${user_id} AND friend_id = ${friend_id}`;
    db.query(sql, (err,result)=> {
        if(err) throw(err);
        resp.send('You are no longer friends');
    });
   
})

module.exports = appRouter;
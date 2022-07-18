var express = require('express');
const db = require('./configDb');
var userController = require('./users/usersMethods');
var postController = require('./posts/postsMethods');
var userFriendsController = require('./user_friends/userFriendsMethods');
var postReactionsController = require('./post_reactions/postReactionsMethods');

var app = express();
// var jsonParser = bodyParser.json()
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
// app.use(express.bodyParser());
app.use('/users',userController);
app.use('/posts',postController);
app.use('/user_friends',userFriendsController);
app.use('/post_reactions',postReactionsController);
app.listen('3000', () => {
    console.log('Server started on port 3000');
});


//Create DB 
//   app.get('/createTable', (req,resp) => {
//     let sql ='CREATE DATABASE IF NOT EXISTS Wallax';
//     // let sql ='CREATE TABLE users(name varchar(255));';
//     db.query(sql, (err, result) => {
//         if(err) console.log(err);
//         console.log(result);
//         resp.send('');
//     })
     
//   })

  app.get('/createTables', (req,resp) => {
    let sqlUsers ='CREATE TABLE IF NOT EXISTS users(id INT AUTO_INCREMENT PRIMARY KEY,username VARCHAR(255),password VARCHAR(255), first_name VARCHAR(255), last_name VARCHAR(255),email VARCHAR(255),birthday Date, photo VARCHAR(255), about VARCHAR(255))'; 
    let sqlPosts ='CREATE TABLE IF NOT EXISTS posts(id INT AUTO_INCREMENT PRIMARY KEY, post_by INT, content VARCHAR(140), uploaded_at TIME)';
    let sqlPostReactions ='CREATE TABLE IF NOT EXISTS post_reactions(id INT AUTO_INCREMENT PRIMARY KEY, post_id INT ,reaction_by INT, reaction_type VARCHAR(20), comment_data VARCHAR(140))';
    let sqlUsersFriends ='CREATE TABLE IF NOT EXISTS user_friends(id INT AUTO_INCREMENT PRIMARY KEY, user_id INT ,friend_id INT)';

  
    db.query(sqlUsers, (err, result) => {
        if(err) console.log(err);
        console.log(result);
        
    })
    db.query(sqlPosts, (err, result) => {
        if(err) console.log(err);
        console.log(result);
        
    })
    db.query(sqlPostReactions, (err, result) => {
        if(err) console.log(err);
        console.log(result);
        
    })
    db.query(sqlUsersFriends, (err, result) => {
        if(err) console.log(err);
        console.log(result);
       
    })
     
  })

  app.get('/getData', (req,resp)=>{
    let query = 'SELECT * FROM users';
    db.query(query, (err, result) => {
      if(err) console.log(err);
      resp.send(result);
     
  })
  })


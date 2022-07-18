const mysql = require('mysql');

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'wallax'
  });

  db.connect((err) => {
    if(err) {
        console.log(err);
    }
    console.log('Mysql connected')
  });

  module.exports = db;
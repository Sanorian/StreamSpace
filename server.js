const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();

app.post('/', (req, res)=>{
  res.header('Access-Control-Allow-Origin', '*');
  let db = new sqlite3.Database('./data.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) reject(err.message);
      });
      db.all('SELECT * FROM main', (err, rows) => {
            if (err) console.log(err);
            res.send(rows);
      });
      db.close( (err) => {
        if (err) reject(err.message);
      });
});

app.put('/sendpost', (req, res)=>{
  res.header('Access-Control-Allow-Origin', '*');
  let name = req.body.postname;
  let category = req.body.postcategory;
  let text = req.body.posttext;
  
  let db = new sqlite3.Database('./data.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) reject(err.message);
  });

  db.run(`INSERT INTO main(postname, category, posttext) VALUES(?, ?, ?, ?)`, [name, category, text], function(err) {
    if (err) {
      res.send({res:'bad'});
      console.log(err.message);
    }
    res.send({res:'good'});
  });

  db.close( (err) => {
    if (err) reject(err.message);
  });
});

app.post('/category', (req, res)=>{
  res.header('Access-Control-Allow-Origin', '*');
  const category = req.body.category;
  let db = new sqlite3.Database('./data.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) reject(err.message);
  });
  db.all('SELECT * FROM main WHERE category=?', [category], (err, rows) => {
        if (err) reject(err.message);
        res.send(rows);
  });
  db.close( (err) => {
    if (err) reject(err.message);
  });
})

app.post("/login", (req, res)=>{
  const username = req.body.username;
  const password  = req.body.password;

  res.header('Access-Control-Allow-Origin', '*');

  let db = new sqlite3.Database('./data.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) reject(err.message);
  });
  db.all('SELECT * FROM users WHERE username=? AND password=? ', [username, password], (err, rows) => {
        if (err) reject(err.message);
        if (rows.length==1) res.send({res: "good"})
  });
  db.close( (err) => {
    if (err) reject(err.message);
  });
})

app.put("/registration", (req, res)=>{
  const username = req.body.username;
  const password  = req.body.password;

  res.header('Access-Control-Allow-Origin', '*');

  let db = new sqlite3.Database('./data.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) reject(err.message);
  });
  db.run('ISERT INTO users (username, password) VALUES (?, ?)', [username, password], function (err) {
    if (err) {
      res.send({res:'bad'});
      console.log(err.message);
    }
    res.send({res: "good"})
  });
  db.close( (err) => {
    if (err) reject(err.message);
  });
})



port=3000;
app.listen(port, () => {
    console.log(`Server running on port${port}`);
    console.log('http://localhost:3000');
});
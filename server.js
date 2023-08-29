const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();


app.get('/', (req, res)=>{
  res.header('Access-Control-Allow-Origin', '*');
  let db = new sqlite3.Database('./data.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            reject(err.message);
        }
      });
      db.all('SELECT * FROM main', (err, rows) => {
            if (err) {
              console.log(err);
            }
            res.send(rows);
      });
      db.close( (err) => {
        if (err) {
            reject(err.message);
        }
      });
});
app.get('/sendpost', (req, res)=>{
  res.header('Access-Control-Allow-Origin', '*');
  let name = req.query.postname;
  let category = req.query.postcategory;
  let text = req.query.posttext;
  let db = new sqlite3.Database('./data.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        reject(err.message);
    }
  });
  db.all('SELECT * FROM main', (err, rows) => {
    if (err) {
      console.log(err);
    }
    newId = Number(rows[rows.length-1].id)+1;
    db.run(`INSERT INTO main(id, postname, category, posttext) VALUES(?, ?, ?, ?)`, [newId, name, category, text], function(err) {
      if (err) {
        res.send('bad');
        return console.log(err.message);
      }
      res.send('good');
    });
  });

  db.close( (err) => {
    if (err) {
        reject(err.message);
    }
  });
});
app.get('/login', (req, res)=>{
  res.header('Access-Control-Allow-Origin', '*');
  const username = req.query.username;
  const password = req.query.password;
  if (username=='admin' && password=='12345678'){
    res.send({res:'good'});
  } else {
    res.send({res:'bad'});
  }
});
app.get('/deletepost', (req, res)=>{
  res.header('Access-Control-Allow-Origin', '*');
  const password = req.query.password;
  const id = req.query.id;
  if (password=='12345678'){
    let db = new sqlite3.Database('./data.db', sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
          reject(err.message);
      }
    });
    db.run(`DELETE FROM main WHERE id=?`, [id], function(err) {
      if (err) {
        res.send({res:'bad'});
        return console.log(err.message);
      }
      res.send({res:'good'});
    });
    db.close( (err) => {
      if (err) {
          reject(err.message);
      }
    });
  }
});
app.get('/category', (req, res)=>{
  res.header('Access-Control-Allow-Origin', '*');
  const category = req.query.category;
  let db = new sqlite3.Database('./data.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        reject(err.message);
    }
  });
  db.all('SELECT * FROM main WHERE category=?', [category], (err, rows) => {
        if (err) {
          console.log(err);
        }
        res.send(rows);
  });
  db.close( (err) => {
    if (err) {
        reject(err.message);
    }
  });
})
port=3000;
app.listen(port, () => {
    console.log(`Server running on port${port}`);
    console.log('http://localhost:3000');
  });
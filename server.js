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
      //main request
      db.all('SELECT * FROM main', (err, rows) => {
            if (err) {
              console.log(err);
            }
            res.send(rows);
      });
      // closing db
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
          return console.log(err.message);
          res.send('bad');
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
port=3000;
app.listen(port, () => {
    console.log(`Server running on port${port}`);
    console.log('http://localhost:3000');
  });
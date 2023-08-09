const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const sqlite3 = require('sqlite3').verbose();

app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/send_data', (req, res)=>{
    res.header('Access-Control-Allow-Origin', '*');
    if (isGood(postName) && isGood(postText)){
        // Открытие базы
        let db = new sqlite3.Database('./data.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        });
        // Главный запрос
        db.run(`INSERT INTO main(postname, category, posttext) VALUES(?, ?, ?)`, [postName, category, postText], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
        });
        // Закрытие базы
        db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        });
        
    }
    console.log('Sending post');
});

app.get('/', function (req, res) {
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
            let posts = '';
            rows.forEach(post =>{
                posts += '<div class="post"><h3>'+ post.postname +'</h3><p class="text">'+ post.posttext +'</p></div>';
              });
            fs.readFile('index.html', 'utf8', (err, data) => {
              if (err) throw err;
            
              // Modify the HTML
              let pageArray = [];
              pageArray.push(data.split('<main>')[0]+'<main>');
              pageArray.push('</main></body></html>');
              const modifiedData = pageArray[0]+posts+pageArray[1];
            
              // Write the modified HTML back to the file
              fs.writeFile('index.html', modifiedData, 'utf8', (err) => {
                if (err) throw err;
                res.sendFile(__dirname+'/index.html');
              });
            });
  
      });
      // closing db
      db.close( (err) => {
        if (err) {
            reject(err.message);
        }
      });
      console.log('Uploading main page');
});
app.get('/styles.css', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.sendFile(__dirname + '/styles.css');
});
  
app.get('/app.js', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.sendFile(__dirname + '/app.js');
});
app.get('/new_post', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.sendFile(__dirname + '/new_post.html');
});
app.get('/post-app.js', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.sendFile(__dirname + '/post_app.js');
});
app.get('/rules', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.sendFile(__dirname + '/rules.html');
});
  
port=8080;
app.listen(port, () => {
    console.log(`Server running on port${port}`);
  });

function isGood(text){
    let badWords = 0;
    let censoredWords = ['ass', 'asses', 'asshole',
    'bastard', 'bestial', 'bitch', 'boobs','boob',
    'bullshit', 'clit', 'clits', 'cunt', 'cunts', 'cock', 
    'chink', 'cocks', 'dick', 'dickhead', 'fuck', 'fucks',
    'fucked', 'fucker', 'fuckers', 'fucking', 'goddamn', 
    'horny', 'lusting', 'masochist', 'motherfucker',
    'motherfucking', 'pharmacy', 'porn', 'rape', 'raped',
    'retard', 'sadist', 'shit', 'sh!t', 'shithead',
    'shitting', 'shitty', 'slut', 'sluts', 'smut', 'whore',
    'whores', 'xxx', 'damn', 'fag', 'fcuk', 'faggot',
    'nigga', 'nigger', 'paki', 'prick', 'pussy', 'cum'];
    text = text.toLowerCase();
    censoredWords.forEach(censoredWord =>{
        if (text.indexOf(censoredWord)!=-1){badWords+=1;}
        });
    if (badWords!=0){return false;}
    else {return true;}
}

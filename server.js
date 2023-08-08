const express = require('express');
const bodyParser = require('body-parser');
const app = express();
sqlite3 = require('sqlite3').verbose();

app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/send_data', (req, res)=>{
    postName = req.body.postname;
    category = req.body.category;
    postText = req.body.posttext;
    if (isGood(postName) && isGood(postText)){
        // Открытие базы
        let db = new sqlite3.Database('./data.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
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
        console.log('Close the database connection.');
        });
    }
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
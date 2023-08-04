let sendButtton = document.getElementById('sendButton'),
textarea = document.getElementById('textarea'),
input = document.getElementById('input'),
select = document.getElementById('select');

sendButtton.onclick = function(){
    let postName = input.value;
    let postText = textarea.value;
    let category = select.value;
    if (isGood(postName) && isGood(postText)){
        const sqlite3 = require('sqlite3').verbose();
        let db = new sqlite3.Database('data.db', sqlite3.OPEN_READWRITE);

    }
}
input.oninput = function(){
    localStorage.setItem('input', input.value);
}
select.oninput = function(){
    localStorage.setItem('select', select.value);
}
textarea.oninput = function(){
    localStorage.setItem('textarea', textarea.value);
}

function openFileOption(){
    document.getElementById("file1").click();
}

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
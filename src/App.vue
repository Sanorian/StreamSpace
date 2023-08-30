<script setup>
import {ref} from 'vue'
const isBlog = ref(true);
const isAddPost = ref(false);
const isCategoryChoosing = ref(false);
const isCategoryChosen = ref(false);
const blogData = ref([{postname: 'No server response', posttext: 'Try this again later'}]);
const chosenCategoryData = ref([{postname: 'No server response', posttext: 'Try this again later'}]);
const addPostButtonValue = ref('Create a new post');
const response = ref();

fetch('http://192.168.31.209:3000/')
  .then(response => response.json())
  .then(data => {
    blogData.value = data;
    })
  .catch(error => {
    console.log(error);
  });

function toBlogPage(){
  isBlog.value = true;
  isAddPost.value = false;
  isCategoryChoosing.value = false;
  isCategoryChosen.value = false;
  addPostButtonValue.value = 'Create a new post';
}

function addPostWindow(){
  if (isBlog.value == true){
    isBlog.value = false;
    isCategoryChoosing.value = false;
    isCategoryChosen.value = false;
    isAddPost.value = true;
    addPostButtonValue.value = 'Return to blog page';
  } else {
    isBlog.value = true;
    isCategoryChoosing.value = false;
    isCategoryChosen.value = false;
    isAddPost.value = false;
    addPostButtonValue.value = 'Create a new post';
  }
}

function toCategorys(){
  isBlog.value = false;
  isAddPost.value = false;
  addPostButtonValue.value = 'Return to blog page';
  isCategoryChoosing.value = true;
  isCategoryChosen.value = false;
}

function toCategory(category){
  chosenCategoryData.value = blogData.value.filter((post)=> post.category==category)
  isBlog.value = false;
  isAddPost.value = false;
  isCategoryChoosing.value = false;
  isCategoryChosen.value = true;
}
function sendingPost(){
  let name = document.getElementsByTagName('input')[0].value.replaceAll('\n', '%0A'),
      category = document.getElementsByTagName('select')[0].value,
      text = document.getElementsByTagName('textarea')[0].value.replaceAll('\n', '%0A');
  if (name == '' || text == ''){
    response.value = 'The title and body of the post should not be empty';
  } else if (isGood(name) && isGood(text)){
    fetch('http://192.168.31.209:3000/sendpost?postname='+name+'&postcategory='+
   category+'&posttext='+ text)
  .then(response => response.json())
  .then(data => {
    if (data.res=='bad'){
      response.value = 'Something went wrong. Try later'
    }
    })
  .catch(error => {
    console.log(error);
  });
  document.getElementsByTagName('input')[0].value = '';
  document.getElementsByTagName('textarea')[0].value='';
  } else {
    response.value = 'The post has not passed moderation';
  }
}
function onInput(key){
  if (key=='input'){
    localStorage.setItem(key, document.getElementsByTagName('input')[0].value)
  } else if (key=='select') {
    localStorage.setItem(key, document.getElementsByTagName('select')[0].value)
  } else {
    localStorage.setItem(key, document.getElementsByTagName('textarea')[0].value)
  }
}
function isGood(text){
    let badWords = 0;
    let censoredWords = ['asshole',
    'bestial', 'bitch', 'boobs','boob',
    'clit', 'clits', 'cunt', 'cunts', 'cock',
    'chink', 'cocks', 'dick', 'dickhead', 'fuck', 'fucks',
    'fucked', 'fucker', 'fuckers', 'fucking', 'horny',
    'lusting', 'motherfucker', 'motherfucking',
    'porn', 'rape', 'raped',
    'retard', 'sadist', 'shithead', 'slut', 
    'sluts', 'smut', 'whore', 'whores',
    'xxx', 'fag', 'faggot',
    'nigga', 'nigger', 'paki', 'prick', 'pussy', 'cum'];
    text = text.toLowerCase();
    censoredWords.forEach(censoredWord =>{
        if (text.indexOf(censoredWord)!=-1){badWords+=1;}
        });
    if (badWords!=0){return false;}
    else {return true;}
}
</script>

<template>
  <header>
      <img src="./assets/logo.png" @click="toBlogPage()">
      <div class="two_buttons">
          <button class="button_light" @click="toCategorys()">Category</button>
          <button class="button_light" @click="addPostWindow()">{{addPostButtonValue}}</button>
      </div>
  </header>
  <div v-if="isBlog" class="blog">
    <div v-for="post in blogData" :key="post.id">
      <div class="post_light">
        <h3>{{post.postname}}</h3>
        <p class="text" style="white-space: pre-line">{{post.posttext}}</p>
      </div>
    </div>
  </div>
  <div v-if="isAddPost">
    <div class="post_enter">
      <p style="color:red">{{response}}</p>
      <h2>Enter title of the post:</h2>
      <input @input="onInput('input')">
      <h2>Choose Category:</h2>
      <select @change="onInput('select')">
        <option value="unchosen">Unchosen</option>
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
        <option value="devops">DevOps</option>
        <option value="ui/ux">UI/UX</option>
        <option value="cooking">Cooking</option>
        <option value="learning">Learning</option>
      </select>
      <h2>Enter the post itself:</h2>
      <textarea @input="onInput('textarea')"></textarea>
      <button @click="sendingPost()">Send</button>
      <p>By submitting this form, you accept the rules of StreamSpace:</p>
      <ol>
        <li>Do not use bad words, like: You cannot use this words: a*shole,
                    b*stard, b*stial, b*tch, b*obs, b*ob,
                    bullsh*t, cl*t, cl*ts, c*nt, c*nts, c*ck, 
                    ch*nk, c*cks, d*ck, d*ckhead, f*ck, f*cks,
                    f*cked, f*cker, f*ckers, f*cking, godd*mn, 
                    h*rny, l*sting, mas*chist, motherf*cker,
                    motherf*cking, p*rn, r*pe, r*ped,
                    ret*rd, s*dist, sh*thead,
                    sh*tting, sh*tty, sl*t, sl*ts, sm*t, wh*re,
                    wh*res, xxx, d*mn, f*g, fcuk, f*ggot,
                    n*gga, n*gger, p*ki, pr*ck, p*ssy, c*m
        <br>Posts with these words will not be published in the "Stream Space".</li>
      </ol>
    </div>
  </div>
  <div v-if="isCategoryChoosing" class="categoryChoosing">
    <button @click="toCategory('backend')">Backend</button>
    <button @click="toCategory('frontend')">Frontend</button>
    <button @click="toCategory('devops')">DevOps</button>
    <button @click="toCategory('ui/ux')">UI/UX</button>
    <button @click="toCategory('cooking')">Cooking</button>
    <button @click="toCategory('learning')">Learning</button>
  </div>
  <div v-if="isCategoryChosen" class="blog">
    <div v-for="post in chosenCategoryData" :key="post.id">
      <div class="post_light">
        <h3>{{post.postname}}</h3>
        <p class="text" style="white-space: pre-line">{{post.posttext}}</p>
      </div>
    </div>
  </div>

</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito&family=Poppins:wght@300&display=swap');
img{
  height: 8vmin;
  width: auto;
}
header{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-top: 2vmin;
    padding-bottom: 2vmin;
    background-color: #8EA7E9;
}

.two_buttons{
    display: flex;
    flex-direction: row;
}
button{
    border-radius: 2vmin;
    padding: 1vmin;
    margin: 0.3vmin;
    font-family: 'Nunito', sans-serif;
    font-family: 'Poppins', sans-serif;
    transition: background-color .25s ease;
    transition: font-size .25s ease;
    background-color: #7286D3;
}

button:hover{
    background-color: #5879ff;
    font-size:medium;
}
.post_enter{
    margin-top: 3vmin;
    display: flex;
    flex-direction: column;
    width: 70vw;
    margin-left: 15vw;
    margin-right: 15vw;
    align-items: center;
}
textarea{
    padding: 1vmin;
    height: 35vh;
    width: 50vh;
    resize: none;
    border-radius: 2vmin;
    margin-bottom: 2vmin;
    font-family: 'Nunito', sans-serif;
    font-family: 'Poppins', sans-serif;
}
.dark{
    background-color: #526D82;
    color: #DDE6ED;
}
input{
    border-radius: 2vmin;
    height: 3vmin;
    width: 25vmin;
    padding: 1vmin;
    font-family: 'Nunito', sans-serif;
    font-family: 'Poppins', sans-serif;
}
select{
    border-radius: 2vmin;
}
body{
    font-family: 'Nunito', sans-serif;
    font-family: 'Poppins', sans-serif;
}
main{
    width: 80vw;
    margin-top: 5vmin;
    margin-left: 10vw;
    margin-right: 10vw;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.post_light{
    width:60vmin;
    padding: 3vmin;
    background-color: rgb(236, 235, 243);
    border-radius: 3vmin;
    margin: 1vmin;
}
p{
    word-wrap: break-word;
}
.additional_data{
    margin-bottom: 1vmin;
}
.rules{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    margin-left: 15%;
    margin-right: 15%;
}
.blog{
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
}
template{
  background-color: #FFF2F2;
}
.categoryChoosing{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.categoryChoosing button{
  margin-top: 1vmin;
  font-size: 4vmin;
}
</style>
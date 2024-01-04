<script setup>
import {ref} from 'vue';
import loginRegistration from './assets/login_registration.vue';
import createPost from './assets/createPost.vue';

const isBlog = ref(true);
const isAddPost = ref(false);
const isCategoryChoosing = ref(false);
const isCategoryChosen = ref(false);
const isLogReg = ref(false);

const blogData = ref([{postname: 'No server response', posttext: 'Try this again later'}]);
const chosenCategoryData = ref([{postname: 'No server response', posttext: 'Try this again later'}]);
const addPostButtonValue = ref('Create a new post');

fetch('http://localhost:3000/')
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
  isLogReg.value = false;
  addPostButtonValue.value = 'Create a new post';
}

function addPostWindow(){
  if (isBlog.value == true){
    isBlog.value = false;
    isCategoryChoosing.value = false;
    isCategoryChosen.value = false;
    isAddPost.value = true;
    isLogReg.value = false;
    addPostButtonValue.value = 'Return to blog page';
  } else {
    isBlog.value = true;
    isCategoryChoosing.value = false;
    isCategoryChosen.value = false;
    isAddPost.value = false;
    isLogReg.value = false;
    addPostButtonValue.value = 'Create a new post';
  }
}

function toCategorys(){
  isBlog.value = false;
  isAddPost.value = false;
  isLogReg.value = false;
  addPostButtonValue.value = 'Return to blog page';
  isCategoryChoosing.value = true;
  isCategoryChosen.value = false;
}

function toCategory(category){
  chosenCategoryData.value = blogData.value.filter((post)=> post.category==category)
  isBlog.value = false;
  isAddPost.value = false;
  isLogReg.value = false;
  isCategoryChoosing.value = false;
  isCategoryChosen.value = true;
}

function toLogIn(){
  isBlog.value = false;
  isAddPost.value = false;
  isLogReg.value = true;
  addPostButtonValue.value = 'Return to blog page';
  isCategoryChoosing.value = false;
  isCategoryChosen.value = false;
}

</script>

<template>
  <header>
      <img src="./assets/logo.png" @click="toBlogPage()">
      <div class="two_buttons">
          <button class="button_light" @click="toCategorys()">Category</button>
          <button class="button_light" @click="addPostWindow()">{{addPostButtonValue}}</button>
          <div v-if="isLoginned">
            <button @click="exit()">Exit</button>
          </div>
          <div v-else>
            <button @click="toLogIn()">Sign In</button>
          </div>
      </div>
  </header>
  <div v-if="isBlog" class="blog">
    <div v-for="post in blogData" :key="post.id">
      <div class="post_light">
        <h3>{{post.postname}}</h3>
        <p>{{post.posttext}}</p>
        <div>{{post.username}}</div>
      </div>
    </div>
  </div>
  <div v-if="isAddPost">
    <createPost />
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
  <div v-if="isLogReg">
    <loginRegistration />
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
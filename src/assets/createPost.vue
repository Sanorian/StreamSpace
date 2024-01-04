<script setup>
import {ref} from 'vue';
const errorPlace = ref();

function sendingPost(postname, postcategory, posttext){
  if (postname == '' || posttext == ''){
    errorPlace.value = 'The title and body of the post should not be empty';
  } else {
    fetch("http://localhost:3000/sendpost", {
                method: "PUT",
                body: JSON.stringify({
                    postname: postname,
                    postcategory: postcategory,
                    posttext: posttext,
                    username: localStorage.getItem("username")
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
                }).catch(err=>{
                    console.log(err);
                    errorPlace.value="Something went wrong";
                })
                .then((response)=>response.json())
                .then((data)=>{
                    if (data.res=='bad'){
                        errorPlace.value = 'Something went wrong. Try later'
                    }
                })
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
</script>

<style>
</style>

<template>
    <div class="post_enter">
      <p style="color:red">{{errorPlace}}</p>
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
    </div>
</template>
<script setup>
import {ref} from "vue"

const errorPlace = ref("");
const isLogIn = ref(true);
const userDone = ref(false);
const username = ref("");
const password = ref("");

function logIn(){
   if (username.value=="" || password.value==""){
       errorPlace.value = "You could fill both fields";
   } else {
       fetch("http://localhost:3000/login", {
               method: "POST",
               body: JSON.stringify({
                  username: username.value,
                  password: password.value
               }),
               headers: {
                  "Content-type": "application/json; charset=UTF-8"
               }
               }).catch(err=>{
                  console.log(err);
                  errorPlace.value=`Something went wrong`;
                  throw err;
               })
               .then((response)=>response.json())
               .then((data)=>{
                  if (data.res=="good"){
                      localStorage.setItem("username", username.value);
                      errorPlace.value="You succesfully logged in";
                  } else if (data.reason=="db"){
                      errorPlace.value="Something went wrong. Try again later";
                  } else if (data.reason=="no"){
                      errorPlace.value="We have no such user";
                  }
               })
   }
}

function registration(){
   let username = ref(""), password1 = ref(""), password2 = ref("");
   if (username.value=="" || password1.value=="" || password2.value==""){
       errorPlace.value = "You could fill all fields";
   } else if (username.value!="" && (password1.value==password2.value && password1.value!="")){
       fetch("http://localhost:3000/registration", {
               method: "POST",
               body: JSON.stringify({
                  username: username.value,
                  password: password1.value
               }),
               headers: {
                  "Content-type": "application/json; charset=UTF-8"
               }
               }).catch(err=>{
                  console.log(err);
                  errorPlace.value="Something went wrong";
                  throw err;
               })
               .then((response)=>response.json())
               .then((data)=>{
                  if (data.res=="good"){
                      localStorage.setItem("username", username.value);
                      errorPlace.value="You successfully registered";
                  } else if (data.reason=="db"){
                      errorPlace.value="Something went wrong. Try again later";
                  } else if (data.reason=="already"){
                      errorPlace.value="We already have this user";
                  }
               })
   }
}

function toRegistration(){
   isLogIn.value = false;
}

function toLogIn(){
   isLogIn.value = true;
}

</script>
<style>
template{
   display: flex;
   flex-direction: column;
}
.registrationBlock{
   display: flex;
   flex-direction: column;
   align-items: center;
}
</style>
<template>
   <div v-if="userDone" class="registrationBlock">
       <h1>You are done</h1>
   </div>
   <div v-else-if="isLogIn" class="registrationBlock">
       <h1>Sign in</h1>
       <h2 v-bind="errorPlace"></h2>
       <h2>Username:</h2>
       <input type="text" v-model="username">
       <h2>Password:</h2>
       <input type="password" v-model="password">
       <button @click="logIn()">Sign In</button>
       <a @click="toRegistration()">Sign up</a>
   </div>
   <div v-else class="registrationBlock">
       <h1>Registration</h1>
       <h2 v-bind="errorPlace"></h2>
       <h2>Username:</h2>
       <input type="text" v-model="username">
       <h2>Password:</h2>
       <input type="password" v-model="password">
       <h2>Repeat your password:</h2>
       <input type="password" v-model="password">
       <button @click="registration()">Sign Up</button>
       <a @click="toLogIn()">Sign in</a>
   </div>
</template>

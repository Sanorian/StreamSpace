<script>
import {ref} from "vue"
const username = ref();
const password = ref();
const password1 = ref();
const password2 = ref();

const errorPlace = ref();

const isLogIn = ref(true);

function logIn(username, password){
    if (username=="" && password==""){
        errorPlace.value = "You could fill both fields";
    } else {
        fetch("http://adress/login", {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password
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
                    if (data.res=="good"){

                    } else if (data.reason=="db"){

                    } else if (data.reason=="no"){
                        errorPlace.value="We have no that user";
                    }
                })
    }

}
function registration(username, password1, password2){

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
template div{
    display: flex;
    flex-direction: column;
}
</style>
<template>
    <div v-if="isLogIn">
        <h2 v-bind="errorPlace"></h2>
        <h2>Username:</h2>
        <input type="text" v-bind="username">
        <h2>Password:</h2>
        <input type="password" v-bind="password">
        <button @click="logIn(username.value, password.value)">Log In</button>
        <a @click="toRegistration()">Sign up</a>
    </div>
    <div v-else>
        <h2 v-bind="errorPlace"></h2>
        <h2>Username:</h2>
        <input type="text" v-bind="username">
        <h2>Password:</h2>
        <input type="password" v-bind="password1">
        <h2>Repeat your password:</h2>
        <input type="password" v-bind="password2">
        <button @click="registration(username.value, password.value)">Log In</button>
        <a @click="toLogIn()">Sign up</a>
    </div>

</template>
<template>
    <body>
        <div class="container" id="container">
            <div class="form-container sign-up-container">
                <form action="#">
                    <h1>Create Account</h1>
                    <input v-model="futur_user_firstname" type="text" placeholder="First Name" />
                    <input v-model="futur_user_lastname" type="text" placeholder="Last Name" />
                    <input v-model="futur_user_email" type="email" placeholder="Email" />
                    <input v-model="futur_user_password" type="password" placeholder="Password" />
                    <button @click="subscribe">Sign Up</button>
                </form>
            </div>
            <div class="form-container sign-in-container">
                <form action="#">
                    <h1>Sign in</h1>
                    <input v-model="user_email" type="email" placeholder="Email" />
                    <input v-model="user_password" type="password" placeholder="Password" />
                    <button @click="connect">Sign In</button>
                </form>
            </div>
            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button class="ghost" id="signIn">Sign In</button>
                    </div>
                    <div class="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Don't have an account yet? No problem! Enter your personal details and start the journey with us</p>
                        <button class="ghost" id="signUp">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>

    </body>
</template>

<script>

import Vue from 'vue';
import Axios from 'axios';
import store from './UsersStore';
import initaccess from '../js/gmnaccess';

export default {
    name: "GmnAccess",
    store: store,
    components:{

    },
    data () {
        return {
            user_email: this.user_email,
            user_password: this.user_password,
            futur_user_firstname: this.futur_user_firstname,
            futur_user_lastname: this.futur_user_lastname,
            futur_user_email: this.futur_user_email,
            futur_user_password: this.futur_user_password
        };
    },
    mounted(){
        initaccess();   
    },
    methods:{
        connect: function(event){
            event.stopPropagation();
            event.preventDefault();
            console.log('connect as ' + this.user_email);
            const auth = { email: this.user_email, password: this.user_password };
            Axios.post('http://localhost:3000/api/auth/login', auth)
                .then(response => {
                    
                    sessionStorage.setItem('token', response.data.token);
                    sessionStorage.setItem('userId',response.data.userId);
                    window.location.href= "/";
                }
                )
                .catch(error => {
                    console.error('There was an error!', error);
                    this.user_email = this.futur_user_email;
                }); 
            
        },
        subscribe: function(event) {
            event.stopPropagation();
            event.preventDefault(); 
            console.log("subscribe for " + this.futur_user_firstname);   
            const auth = { email: this.futur_user_email, password: this.futur_user_password, firstname: this.futur_user_firstname, lastname: this.futur_user_lastname };
            Axios.post('http://localhost:3000/api/auth/signup', auth)
                .then(response => {
                    this.user_email = this.futur_user_email;
                    initaccess();
                }
                )
                .catch(error => {
                    console.error('There was an error!', error);
                    this.user_email = this.futur_user_email;
                    initaccess();
                });         
        }
    }
};
</script>

<style>
    @import url('../styles/access.css');
</style>
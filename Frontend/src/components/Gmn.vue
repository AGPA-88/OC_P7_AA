/* eslint-disable no-mixed-spaces-and-tabs */
<template>
  <form @submit.prevent="handleSubmit">
    <div class="settings-card">
        <div class="profile">
            <h1>Personal Info</h1>
            <h2>Email</h2>
            <p id="user-email" >{{ user_email }}</p>
            <h2>First Name...</h2>
            <p>
                <input v-model="form.firstname" id="future_firstname" type="text" placeholder="Enter first name..." required/></p>            
            <h2>Last Name</h2>
            <p>
                <input v-model="form.lastname" id="future_lastname" type="text" placeholder="Enter last name..." required/>
            </p> 
            <p><button class="btn" type="submit">Update</button></p>
            <!-- <h1>Security</h1>
            <h2>Password</h2>
            <p><input type="text" placeholder="•••••••" /> <button class="btn" @click="updatePwd">Change</button></p>
            <h1>Account</h1>
            <h2>Delete Account</h2>
            <p><button class="btn btn-delete" @click="deleteAccount">Delete</button></p> -->
        </div>
        
    </div>
  </form>
</template>


<script>
import Gmn from '@/components/Gmn';
import axios from 'axios';
import vuex from 'vuex';

export default  {
    components: { Gmn },
    computed: {
        ...vuex.mapGetters(['user_firstname', 'user_lastname', 'user_email'])
    },

    data(){
        return{
			
            form:{
                userId: '',
                firstname: this.user_firstname,
                lastname: this.user_lastname,
            }
        };
    },

    methods:{
      
        handleSubmit(){

            const _form = {
                id: document.location.href.split('id=')[1],
                firstname: this.form.firstname,
                lastname: this.form.lastname
            };

            this.updateUser(_form);
      
            //Api call
            axios.put("http://localhost:3000/api/auth/",
                //The data
                _form,
                {headers: { authorization: 'Bearer ' + sessionStorage.getItem('token')}}
            )
            //Api response
                .then((response)=>{
                    if(response.status === 201){
               
                        window.location.href="http://localhost:8080/#/";
                    }
                }).catch((err)=>{
                    alert("Something went wrong, please try again");
                    console.log(err.message);
                });

        }, 
        ...vuex.mapActions(['updateUser'])
  
    }
    
};

</script>

<style>
  @import url('../styles/settings.css');

</style>
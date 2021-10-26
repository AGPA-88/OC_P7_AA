<template>
<div class="settings-body">
    <!-- Start of Header -->
    <gmn-header v-bind:header_index="3"></gmn-header>
    <!-- End of Header -->

    <div class="settings-card">
        <div class="profile">
            <h1>Personal Info</h1>
            <h2>Email</h2>
            <p id="user-email">{{ user_email }}</p>
            <h2>First Name</h2>
            <p>
                <input id="future_firstname" :value="user_firstname" type="text" placeholder="Enter first name..."/></p>            
            <h2>Last Name</h2>
            <p>
                <input id="future_lastname" :value="user_lastname" type="text" placeholder="Enter last name..." />
            </p> 
            <p><button class="btn" @click="updateName">Update</button></p>
            <h1>Security</h1>
            <h2>Password</h2>
            <p><input type="text" placeholder="•••••••" /> <button class="btn" @click="updateName">Change</button></p>
            <h1>Account</h1>
            <h2>Delete Account</h2>
            <p><button class="btn btn-delete" @click="deleteAccount">Delete</button></p>
        </div>
        
    </div>    
    
    <gmn-footer></gmn-footer>
</div>
</template>

<script>
import GmnHeader from './GmnHeader.vue';
import GmnFooter from '@/components/GmnFooter';
import vuex from 'vuex';
export default {
    components: { 
        GmnHeader, 
        GmnFooter},
    computed: {
        ...vuex.mapGetters(['user_firstname', 'user_lastname', 'user_email'])
    },
    methods: {
        updateName (){
            let $futur_user_firstname = document.querySelector("#future_firstname").value; 
            let $futur_user_lastname = document.querySelector("#future_lastname").value; 
            this.updateUser({firstname: $futur_user_firstname, lastname: $futur_user_lastname});
        },
        deleteAccount (){
            this.deleteUser();
        },
        ...vuex.mapActions(['updateUser', 'deleteUser'])
    }
    

};
</script>

<style>
    @import url('../styles/settings.css');
</style>
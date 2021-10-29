<template>
<div class="post-page">
    <gmn-header v-bind:header_index="2"></gmn-header>
    <div class="main_profile">
            <div class="content">
            <div class="name  shadow-lg">
                <div class="firstname">{{ user_firstname }}</div>
                <div class="lastname">{{ user_lastname }}</div>    
            </div>
            <div class="img_mgt">
                <button class="bg-gray-700 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded add_btn" @click="open_modal">
                    <i class="material-icons-outlined">
                        add_circle
                    </i>
                </button>
                <div class="avatar  shadow-lg">
                    <div class="img_avatar flex justify-center">
                        <img :src="user_avatarUrl" alt="profile picture">
                    </div>
                </div>

            </div>
                    
            <div class="infos shadow-lg">
                <div class="bg-white p-4 w-96 rounded-md">
                    <h1 class="text-lg font-bold">Job</h1>        
                        <input id="jobValue" class="flex-grow outline-none" :value="user_job" type="text" placeholder="New job..." />
                </div>
                <div class="bg-white p-4 w-96 rounded-md">
                    <h1 class="text-lg font-bold">Description</h1>
                        <input id="descriptionValue" class="flex-grow outline-none" :value="user_description" type="text" placeholder="New description..." />
                </div>
                <p><button class="btn btn-avatar" @click="update">Update</button></p>
            </div>
            <div class="modal">
                <div class="avatar_link shadow-lg">
                    <input id="avatarValue" class="flex-grow outline-none" type="text" placeholder="Copy link here..." />
                    <p><button class="btn" @click="updateAvatar">Update</button></p>
                    <i class="material-icons-outlined close-btn" @click="close_modal">
                        close
                    </i>
                </div>
            </div>
        </div>
    </div>
    <gmn-footer></gmn-footer>
</div>
</template>

<script>
import GmnHeader from '@/components/GmnHeader';
import vuex from 'vuex';
import GmnFooter from '@/components/GmnFooter';

export default {
    components: { GmnHeader, GmnFooter },
    computed: {
        ...vuex.mapGetters(['user_firstname', 'user_lastname', 'user_job','user_avatarUrl', 'user_description'])
    },
    methods: {
        update () {
            let $jobValue = document.querySelector("#jobValue").value;
            let $descriptionValue = document.querySelector("#descriptionValue").value;

            this.updateUser({job: $jobValue, description: $descriptionValue});
        },
        updateAvatar () {
            let $avatarValue = document.querySelector("#avatarValue").value;

            this.updateUserAvatar({avatarUrl: $avatarValue});
        },
        open_modal () {
            let nodeModal = document.querySelector(".modal");
            nodeModal.style.display="flex";
        },
        close_modal () {
            let nodeModal = document.querySelector(".modal");
            nodeModal.style.display="none";
        },
        ...vuex.mapActions(['updateUser','updateUserAvatar'])
    }
    
};
</script>

<style>
    @import url('../styles/profile.css');
 
</style>
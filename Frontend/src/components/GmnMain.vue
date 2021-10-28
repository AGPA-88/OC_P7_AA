<template>

        <div class="card w-96 mx-auto bg-white  shadow-xl hover:shadow" id="card-user">
            <div style="height:290px"></div>
            <img class="w-32 mx-auto rounded-full -mt-20 border-8 border-black" id="round-img" :src="user_avatarUrl" alt="">
            <div class="text-center mt-2 text-3xl font-medium" id="text">{{ user_firstname }} {{ user_lastname }}</div>
            <div class="text-center mt-2 font-light text-sm" id="text">Groupomania</div>
            <div class="text-center font-normal text-lg" id="text">{{ user_job }}</div>
            <div class="px-6 text-center mt-2 font-light text-sm" id="text">
                <p>
                    {{user_description}} 
                </p>
            </div>
            <hr class="mt-8">
        </div>
</template>

<script>

import Vuex from 'vuex';

export default {
    name: "GmnMain",
    computed:{
        ...Vuex.mapGetters(
            [
                'user_firstname',
                'user_lastname',
                'user_job',
                'user_description',
                'user_avatarUrl'
            ]
        )
    }
};
    
</script>

<style>
    @import url('../styles/main.css');
</style>
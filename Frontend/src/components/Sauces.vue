<template>
    <div>
        <div v-for="(sauce, index) in sauces" :key="index">{{ sauce.name }}</div>
    </div>
</template>
<script>
import Vue from 'vue';
import Vuex, { mapGetters } from 'vuex';
import store from './UsersStore';

export default {
    name: 'sauces',
    computed: {
        ...Vuex.mapGetters([
            'sauces'
        ]),
        ...Vuex.mapActions([
            'setSauces'
        ])
    },
    mounted(){
        this.setSauces;
    }
    
    
};
</script>
<style>
    
</style>
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Vuex from 'vuex';
import store from './components/UsersStore';

Vue.config.productionTip = false;

Vue.use(Vuex);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>',
    computed: {
        ...Vuex.mapActions([
            'getUser',
            'getUsers',
            'getPosts'
        ])
    },
    mounted(){
        if (sessionStorage.getItem('token')){
            this.getUser;
            this.getUsers;
            this.getPosts;
        }

    }
});

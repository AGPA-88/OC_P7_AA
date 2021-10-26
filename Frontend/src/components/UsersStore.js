import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const state = {
    user: {
        _id: "",
        firstname: "",
        lastname: "",
        email: "",
        description: "",
        job:"",
        avatarURL:""
    },
    content:{
        posts: [],
        users: []
    }

};

const mutations = {
    ADD_USER: (state) => {
        state.user.following++;
    },
    SET_SAUCES: (state, sauces) => {
        state.user.sauces = sauces;
    },
    SET_USER: (state, user) => {
        state.user.firstname = user.firstname;
        state.user.lastname = user.lastname;
        state.user.email = user.email;
        state.user.description = user.description;
        state.user.job = user.job;
        state.user.avatarURL = user.avatarURL;
    },
    GET_POSTS: (state, posts) => {
        state.content.posts = posts;
    },
    GET_USERS: (state, users) => {
        state.content.users = users;
    },
    GET_USER: (state, user) => {
        state.content.user = user;
    },
    DELETE_USER: (state, user) => {
        state.user._id = user._id;
        
    },
    ADD_READERS: (state, ids) => {
        state.content.posts.forEach(post => {
            if (post._id === ids.post_id){
                post.readerUsers.push(ids.userId);
            }            
        });
    }
};

const getters = {
    user_firstname: state => state.user.firstname,
    user_lastname: state => state.user.lastname,
    user_email: state => state.user.email,
    user_description: state => state.user.description,
    user_job: state => state.user.job,
    sauces: state => state.user.sauces,
    user_avatarURL: state => state.user.avatarURL,
    isAuthenticated: function () {
        return sessionStorage.getItem("token") ? true : false;
    },
    all_posts: state => state.content.posts,
    all_users: state => state.content.users
};

const actions = {
    setSauces({ commit }) {
        axios.get('http://localhost:3000/api/sauces')
            .then(response => {
                commit('SET_SAUCES', response.data); 
            });
    },
    setUser({ commit }) {
        if (sessionStorage.getItem('userId')){
            axios.get('http://localhost:3000/api/auth/' + sessionStorage.getItem('userId'))
                .then(response => {
                    commit('SET_USER', response.data);
                });
        }
    },
    updateUser({ state }, user) {
        axios.put('http://localhost:3000/api/auth/update/' + sessionStorage.getItem('userId'), user)
            .then(response => {
                if(response.status===201){
                    window.location.href = "/";
                }
            });
    },
    updateUserAvatar({ state }, user) {
        axios.put('http://localhost:3000/api/auth/update/' + sessionStorage.getItem('userId'), user)
            .then(response => {
                if(response.status===201){
                    window.location.href = "/";
                }
            });
    },
    createPost({ state }, post) {
        axios.post('http://localhost:3000/api/posts/', post)
            .then(response => {
                if(response.status===201){
                    window.location.href = "/";
                }
            });
    },
    getPosts({ commit }) {
        axios.get('http://localhost:3000/api/posts/')
            .then(response => {
                commit('GET_POSTS', response.data);
            });
    },
    getUsers({ commit }) {
        axios.get('http://localhost:3000/api/auth/')
            .then(response => {
                commit('GET_USERS', response.data);
            });
    },

    getUser({ commit }, user) {
        axios.get('http://localhost:3000/api/auth/' + sessionStorage.getItem('userId'), user)
            .then(response => {
                commit('GET_USER', response.data);
            });
    },
    deleteUser() {
        axios.delete('http://localhost:3000/api/auth/' + sessionStorage.getItem('userId'))
            .then(response => {
                console.log(response);
                if(response.status===201){
                    sessionStorage.removeItem('userId');
                    sessionStorage.removeItem('token');
                    window.location.href = "/";
                }
            });
    },
    updatePost({ state, commit }, ids) {
        
        commit('ADD_READERS', ids);
        let postReaders = new Array();
        state.content.posts.forEach(post => {
            if (post._id === ids.post_id){
                postReaders = post.readerUsers;
            }            
        });
        let body = {"readerUsers": postReaders};
        axios.put('http://localhost:3000/api/posts/update/' + ids.post_id, body)
            .then(response => {
                if(response.status===201){
                    console.log('reader added');
                }
            });
    },
};

let store =  new Vuex.Store({
    state: state,
    mutations: mutations,
    getters: getters,
    actions: actions,
    strict: true
});



export default store;
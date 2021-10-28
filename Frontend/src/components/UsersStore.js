import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const state = {
    user: {
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        description: "",
        job:"",
        avatarUrl:""
    },
    post: {
        id: "",
        userId: "",
        title: "",
        description: "",
        imageUrl: "",
        readerUsers: "",
        createdAt: ""
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
    SET_USER: (state, user) => {
        state.user.firstname = user.firstname;
        state.user.lastname = user.lastname;
        state.user.email = user.email;
        state.user.description = user.description;
        state.user.job = user.job;
        state.user.avatarUrl = user.avatarUrl;
    },
    GET_USERS: (state, users) => {
        state.content.users = users;
    },
    DELETE_USER: (state, user) => {
        state.user.id = user.id;
        
    },
    GET_POSTS: (state, posts) => {
        state.content.posts = posts;
    },
    GET_POST: (state, post) => {
        state.post.id = post.id;
        state.post.userId = post.userId;
        state.post.title = post.title;
        state.post.description = post.description;
        state.post.imageUrl = post.imageUrl;
        state.post.readerUsers = post.readerUsers;
        state.post.createdAt = post.createdAt;
    },
    ADD_READERS: (state, ids) => {
        state.content.posts.forEach(post => {
            if (post.id === ids.post_id){
                // postArray.push(ids.userId);
                post.readerUsers += ",:" + ids.userId + ":";
            }            
        });
    },
};

const getters = {
    user_firstname: state => state.user.firstname,
    user_lastname: state => state.user.lastname,
    user_email: state => state.user.email,
    user_description: state => state.user.description,
    user_job: state => state.user.job,
    user_avatarUrl: state => state.user.avatarUrl,
    post_id: state => state.post.id,
    post_title: state => state.post.title,
    post_description: state => state.post.description,
    post_imageUrl: state => state.post.imageUrl,
    post_readerUsers: state => state.post.readerUsers,
    post_userId: state => state.post.userId,
    post_createdAt: state => state.post.createdAt,
    
    isAuthenticated: function () {
        return sessionStorage.getItem("token") ? true : false;
    },
    all_posts: state => state.content.posts,
    all_users: state => state.content.users
};

const actions = {

    // USERS
    setUser({ commit }) {
        let auth = {headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token')}};
        if (sessionStorage.getItem('userId')){
            axios.get('http://localhost:3000/api/auth/' + sessionStorage.getItem('userId'), auth)
                .then(response => {
                    commit('SET_USER', response.data);
                });
        }
    },
    updateUser({ state }, user) {
        let auth = {headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token')}};
        axios.put('http://localhost:3000/api/auth/update/' + sessionStorage.getItem('userId'), user, auth)
            .then(response => {
                if(response.status===201){
                    window.location.href = "/";
                }
            });
    },
    updateUserAvatar({ state }, user) {
        let auth = {headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token')}};
        axios.put('http://localhost:3000/api/auth/update/' + sessionStorage.getItem('userId'), user, auth)
            .then(response => {
                if(response.status===201){
                    window.location.href = "/profile";
                }
            });
    },
    getUsers({ commit }) {
        let auth = {headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token')}};
        axios.get('http://localhost:3000/api/auth/', auth)
            .then(response => {
                commit('GET_USERS', response.data);
            });
    },
    deleteUser() {
        let auth = {headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token')}};
        axios.delete('http://localhost:3000/api/auth/' + sessionStorage.getItem('userId'), auth)
            .then(response => {
                if(response.status===201){
                    sessionStorage.removeItem('userId');
                    sessionStorage.removeItem('token');
                    window.location.href = "/";
                }
            });
    },

    // POSTS
    createPost({ state }, post) {
        let auth = {headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token')}};
        axios.post('http://localhost:3000/api/posts/', post, auth)
            .then(response => {
                if(response.status===201){
                    window.location.href = "/";
                }
            });
    },
    getPosts({ commit }) {
        let auth = {headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token')}};
        axios.get('http://localhost:3000/api/posts/', auth)
            .then(response => {
                commit('GET_POSTS', response.data);
            });
    },
    getPost({ commit }, post_id) {
        let auth = {headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token')}};
        if (sessionStorage.getItem('userId')){
            axios.get('http://localhost:3000/api/posts/' + post_id, auth)
                .then(response => {
                    commit('GET_POST', response.data);
                });
        }
    },
    updatePost({ state, commit }, post) {
        let auth = {headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token')}};
        if (sessionStorage.getItem('userId')){
            axios.put('http://localhost:3000/api/posts/update/' + post.id, post, auth)
                .then(response => {
                    window.location.href='/singlePost?id=' + post.id;
                });
        }
    },
    updateReaders({ state, commit }, ids) {
        let auth = {headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token')}};
        commit('ADD_READERS', ids);
        let postReaders = new Array();
        state.content.posts.forEach(post => {
            if (post.id === ids.post_id){
                postReaders = post.readerUsers;
            }            
        });
        let body = {"readerUsers": postReaders};
        axios.put('http://localhost:3000/api/posts/update/' + ids.post_id, body, auth)
            .then(response => {
                if(response.status===201){
                    console.log('reader added');
                }
            });
    },
    deletePost(state, post_id){
        let auth = {headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token')}};
        axios.delete('http://localhost:3000/api/posts/' + post_id, auth);
        window.location.href="/";
    }

};

let store =  new Vuex.Store({
    state: state,
    mutations: mutations,
    getters: getters,
    actions: actions,
    strict: true
});



export default store;
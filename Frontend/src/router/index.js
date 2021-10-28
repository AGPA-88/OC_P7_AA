import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import GmnAccess from '@/components/GmnAccess';
import GmnProfile from '@/components/GmnProfile';
import GmnPostPage from '@/components/GmnPostPage';
import GmnSettings from '@/components/GmnSettings';
import GmnSinglePost from '@/components/GmnSinglePost';
import GmnEditPost from '@/components/GmnEditPost';
import Gmn from '@/components/Gmn';
import store from '@/components/UsersStore';

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next();
        return;
    }
    next("/");
};
  
const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next();
        return;
    }
    next("/access");
};

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            beforeEnter: ifAuthenticated,
            component: Home
        },
        {
            path: '/access',
            name: 'GmnAccess',
            beforeEnter: ifNotAuthenticated,
            component: GmnAccess
        },
        {
            path: '/profile',
            name: 'GmnProfile',
            beforeEnter: ifAuthenticated,
            component: GmnProfile
        },
        {
            path: '/posts',
            name: 'GmnPostPage',
            beforeEnter: ifAuthenticated,
            component: GmnPostPage
        },
        {
            path: '/settings',
            name: 'GmnSettings',
            beforeEnter: ifAuthenticated,
            component: GmnSettings
        },
        {
            path: '/form',
            name: 'Gmn',
            component: Gmn
        },
        {
            path: '/singlepost',
            name: 'GmnSinglePost',
            component: GmnSinglePost
        },
        {
            path: '/editpost',
            name: 'GmnEditPost',
            component: GmnEditPost
        }
    ]
});

<template >
    <div class="posts">
        <gmn-post v-for="post in all_posts.slice().reverse()" :key="post.id" v-bind:post="post"></gmn-post>
    </div>
</template>
<script>
import GmnPost from '@/components/GmnPost';
import vue from 'vue';
import vuex from 'vuex';

// import GmnHeader from './GmnHeader.vue';
export default {
    name: 'GmnPosts',
    components:{
        GmnPost,
    },
    computed: {
        ...vuex.mapGetters(['all_posts'])
    }
};
</script>
<style >
    @import url('../styles/posts.css');
</style>
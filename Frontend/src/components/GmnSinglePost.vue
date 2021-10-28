<template>
    <div>
        <gmn-header v-bind:header_index="0"></gmn-header>
            <gmn-post v-bind:post="post"></gmn-post>
        <gmn-footer></gmn-footer>
     </div>
</template>

<script>
import GmnPost from '@/components/GmnPost';
import vuex from 'vuex';
import GmnHeader from '@/components/GmnHeader';
import GmnFooter from '@/components/GmnFooter';


export default {
    components: { GmnHeader, GmnPost, GmnFooter },
    methods: {
        ...vuex.mapActions(['getPost'])
    },
    computed: {
        ...vuex.mapGetters([
            'post_userId',
            'post_description',
            'post_id',
            'post_imageUrl',
            'post_readerUsers',
            'post_title',
            'post_createdAt'
        ]),
        post: function(){
            return {
                userId: this.post_userId,
                id: this.post_id,
                title: this.post_title,
                description: this.post_description,
                imageUrl: this.post_imageUrl,
                readerUsers: this.post_readerUsers,
                createdAt: this.post_createdAt
            };
        }
    },
    mounted() {
        this.getPost(document.location.href.split('id=')[1]);
    }
};
</script>

<style>
    @import url('../styles/post.css');
</style>
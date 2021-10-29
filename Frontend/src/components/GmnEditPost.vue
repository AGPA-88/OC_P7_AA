<template>
    <div>
        <gmn-header v-bind:header_index="1"></gmn-header>

        <form @submit.prevent="handleSubmit">
            <div class="main_postpage">
                <div class="heading text-center font-bold text-2xl m-5 text-gray-800 text-style">Edit Post</div>
                <div class="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl create-card">
                    <input v-model="form.title" class="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none text-style" id="titleValue" spellcheck="false" placeholder="Title" type="text" required>
                    <textarea v-model="form.message" class="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none text-style" id="descriptionValue" spellcheck="false" placeholder="Describe everything about this post here" required></textarea>
                    <div class="img-load">
                        <!-- icons -->
                        <div class="icons flex text-gray-500 m-2 icons_unactive">
                            <svg @click="open_link" class="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                        </div>
                        <div class="icons flex text-gray-500 m-2 icons_active">
                            <svg @click="close_link" class="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                        </div>
                        <div class="image_link">
                            <input  v-model="form.media" id="imageValue" type="text" placeholder="Copy link here..." />
                            <div>or</div>
                            <div>  <label for="uploadFile" class="small-btn">Local Image</label><input id="uploadFile" type="file" @change="onFileSelected" style="display:none"/></div>
                        </div>
                    </div>
                    <!-- buttons -->
                    <button class="buttons flex" type="submit" value="post">
                        <div class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-auto">Post</div>
                    </button>
                </div>
            </div>
        </form>

        <gmn-footer></gmn-footer>
    </div>
</template>
<script>
import GmnHeader from '@/components/GmnHeader';
import GmnFooter from './GmnFooter.vue';
import vuex from 'vuex';
import store from './UsersStore';

export default  {
    components: { GmnHeader, GmnFooter },
    computed: {
        ...vuex.mapGetters(['post_title','post_description', 'post_imageUrl', 'post_userId'])
    },
    data(){
        return {
            index_header:2,
            title:"",
            text:"",
            image:"",
            selectedFile: null,

            form:{
                userId: '',
                title: this.post_title,
                description: this.post_description,
                media: this.post_imageUrl
            }

        };
    },
  
    methods:{
      
        handleSubmit(){
        //Using FormData because of file post
            const _form = new FormData();
            _form.append('id', document.location.href.split('id=')[1]);
            _form.append('title', this.form.title);
            _form.append('description', this.form.message);
            _form.append('userId', sessionStorage.getItem('userId'));
            if (this.selectedFile){_form.append('image', this.selectedFile, this.selectedFile.name);}
            if (this.form.media){_form.append('imageUrl', this.form.media);}
            
            this.updatePost(_form);
        },

        open_link () {
            let nodeLink = document.querySelector("#imageValue");
            nodeLink.parentNode.style.display="grid";
            let unactiveButton = document.querySelector('.icons_unactive');
            unactiveButton.style.display="none";
            let activeButton = document.querySelector('.icons_active');
            activeButton.style.display="block";
            
        },
        close_link () {
            let nodeLink = document.querySelector("#imageValue");
            nodeLink.parentNode.style.display="none";
            let unactiveButton = document.querySelector('.icons_unactive');
            unactiveButton.style.display="block";
            let activeButton = document.querySelector('.icons_active');
            activeButton.style.display="none";
        },
        onFileSelected (event) {
            this.selectedFile = event.target.files[0];
        },
          
        ...vuex.mapActions(['updatePost', 'getPost'])
    },
    mounted () {
        this.getPost(document.location.href.split('id=')[1]);
        let unsubscribe = null;
        unsubscribe = store.subscribe(({ type }) => {
            if (type === 'GET_POST') {
                if (this.post_userId !== sessionStorage.getItem('userId')){
                    window.location.href='/singlepost?id=' + document.location.href.split('id=')[1];
                }
                unsubscribe(); // So it only reacts once.
                this.form.title = this.post_title;
                this.form.message = this.post_description;
                this.form.media = this.post_imageUrl;
            }
        });

    }
};


</script>
<style>
    @import url('../styles/post-page.css');

</style>
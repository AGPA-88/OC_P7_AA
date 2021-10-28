<template>
    <div class="post h-full w-full bg-gray-50 flex items-center justify-center card-body">
        <div class="border bg-white mt-6 rounded-2xl p-4 card">
            <div class="flex items-center	justify-between">
                <div class="gap-3.5	flex items-center ">
                    <img class="object-cover bg-yellow-500 rounded-full w-10 h-10" :src="getWriter.avatarUrl"/>
                    <div class="flex flex-col">
                        <b class="mb-2 capitalize text-style">{{ getWriter.firstname + ' ' + getWriter.lastname}}</b>
                        <time datetime="06-08-21" class="text-gray-400 text-xs text-style">{{ getCreationDate }}
                        </time>
                    </div>
                </div>
                <!-- Remove Button -->
                <div class="bg-gray-100	rounded-full h-3.5 flex	items-center justify-center edit-button">
                    <button type="button" @click="expandPost">
                        <span class="material-icons-outlined">
                        open_in_new
                        </span>
                    </button>
                    &nbsp;
                    <button type="button" @click="editPost">
                        <span class="material-icons-outlined">
                        {{ getEditIcon }}
                        </span>
                    </button>
                    <button type="button" @click="deleteThePost">
                        <span class="material-icons-outlined">
                        {{ getDeleteIcon }}
                        </span>
                    </button>
                    &nbsp;
                </div>
            </div>
            <div class="whitespace-pre-wrap mt-7 text-style">
                <h1>{{ post.title }}</h1>

            </div>
            <div class="whitespace-pre-wrap mt-7 text-style description">
                <p>{{ post.description }}</p>
            </div>
            <div class="mt-5 flex gap-2	 justify-center pb-4 flex-wrap	post-img">
                <img :src="post.imageUrl" class="rounded-2xl" alt="photo">
                
            </div >
            <div class="interactions">
                <div class=" h-16 flex items-center justify-around">
                    <div class="flex items-center gap-3 icon-btn add-reader" id="post-read" @click="post_read">
                        <span class="material-icons-outlined read_icon">
                        {{ getReadIcon }}
                        </span>

                        <div class="text-sm textstyle">{{ getReadText }}</div>
                    </div>
                    
                </div>
                <!-- <div class="flex items-center justify-between mt-4">
                    <img :src="user_avatarUrl"  class="rounded-full w-10 h-10 object-cover border">
                    <div class="flex items-center	justify-between	 bg-gray-50 h-11 w-11/12 border rounded-2xl	 overflow-hidden px-4 text-style">
                        <input type="search" class="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue" style="border-radius: 25px" placeholder="Post a comment..." autocomplete="off"/>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import Vuex from 'vuex';
import axios from 'axios';

export default {
    name: "GmnPost",
    computed:{
        ...Vuex.mapGetters(
            [
                'all_users',
                'user_avatarUrl'
            ]
        ),
        getWriter: function (){
            let writer = new Object();
            this.all_users.forEach(user => {
                
                if (user.id === parseInt(this.post.userId)) {
                    writer = user;
                }
            });
            return writer;
        },
        getReadIcon () {
            
            if (this.isUserAPostReader()){
                return "bookmark";
            }
            else{
                return "bookmark_border";
            }
        },
        getReadText () {
            
            if (this.isUserAPostReader()){
                return "Read";
            }
            else{
                return "Unread";
            }
        },
        getEditIcon (){
            if (this.isUserTheWritter()){
                return "edit_note";
            }
        },
        getDeleteIcon (){
            if (this.isUserTheWritter()){
                return "delete";
            }
        },
        getCreationDate (){
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(this.post.createdAt).toLocaleDateString("en-US", options);
        }
    },
    methods: {
        ...Vuex.mapActions(
            [
                'updateReaders', 'deletePost'
            ]
        ),
        isUserAPostReader: function () {
            // document.querySelector('#post-read').classList.remove('add-reader');
            // console.log(document.querySelector('#post-read').classList);
            return this.post.readerUsers.includes(":" + sessionStorage.getItem('userId') + ":");
        },
        isUserTheWritter: function () {
            // document.querySelector('#post-read').classList.remove('add-reader');
            // console.log(document.querySelector('#post-read').classList);
            return (this.post.userId === sessionStorage.getItem('userId'));
        },
        post_read: function (){
            if (!this.isUserAPostReader()){
                this.updateReaders({post_id:this.post.id, userId:sessionStorage.getItem('userId')});
            }
        },
        deleteThePost: function (event){
            event.preventDefault(); 
            if (this.post.userId === sessionStorage.getItem('userId')){
                this.deletePost(this.post.id);

            }
        },
        expandPost: function(){
            document.location.href= '/singlePost?id=' + this.post.id;
        },
        editPost: function(){
            document.location.href= '/editPost?id=' + this.post.id;
        }
    },
    props:[
        'post'
    ]
};
</script>

<style>
    @import url('../styles/post.css');
</style>
<template>
    <a @click="scrollTop" v-show="visible" class="bottom-right">
        <span class="material-icons-outlined arrow-icon">
            keyboard_arrow_up
        </span>
        <slot></slot>

    </a>
</template>

<script>
export default {
    data () {
        return {
            visible: false
        };
    },
    methods: {
        scrollTop: function () {
            this.intervalId = setInterval(() => {
                if (window.pageYOffset === 0) {
                    clearInterval(this.intervalId);
                }
                window.scroll(0, window.pageYOffset - 100);
            }, 20);
        },
        scrollListener: function (e) {
            this.visible = window.scrollY > 150;
        }
    },
    mounted: function () {
        window.addEventListener('scroll', this.scrollListener);
    },
    beforeDestroy: function () {
        window.removeEventListener('scroll', this.scrollListener);
    }
};
</script>

<style scoped>
    .bottom-right {
        position: fixed;
        bottom: 20px;
        right: 20px;
        cursor: pointer;
        background: rgba(0, 0, 0, 0);
    }
    .arrow-icon{
        color: white;
        font-size: 50px;
        text-shadow: 0 0 15px black;
    }
</style>


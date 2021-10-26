<template>
<footer>
    <div class="bg-linear-pink-invert pb-12">
        <div class="mx-auto container pt-20 lg:pt-72 flex flex-col items-center justify-center">
            <div>
                <img src="static/image/icon-small.png" alt="Groupomania Logo">
            </div>
            <div class="text-black flex flex-col md:items-center f-f-l pt-3">
                <h1 class="text-2xl font-black" id="footer-h">Share. Comment. Enjoy.</h1>
                <div class="my-6 text-base text-color f-f-l">
                    <ul class="md:flex items-center">
                        <li class="md:mr-6 cursor-pointer pt-4 lg:py-0">About</li>
                        <li class="md:mr-6 cursor-pointer pt-4 lg:py-0">Help</li>
                        <li class="cursor-pointer pt-4 lg:py-0">Privacy Policy</li>
                    </ul>
                </div>
                <div class="text-sm text-color mb-10 f-f-l">
                    <p id="footer-p">© 2021 Groupomania. All rights reserved</p>
                </div>
            </div>
            <div class="w-9/12 h-0.5 bg-gray-100 rounded-full"></div>
        </div>
    </div>
</footer>    
</template>

<script>
export default {

};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');
    footer{
        margin-top: auto;
        margin: 0;
        background: linear-gradient(rgba(0,0,0,0), #243b55);
    }

    #footer-h{
        font-family: 'Montserrat';
        color: #1d1d27;
    }
    #footer-p{
        /* font-family: 'Montserrat'; */
        color: #1d1d27;
        font-weight: bold;
    }

</style>
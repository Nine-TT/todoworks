<template>
<div class="header">
    <ul class="flex ">
        <li class="list-none font-bold mr-3 cursor-pointer text-black hover:text-white">
            <router-link :to="{name: 'home-page'}" activeClass="text-white">Home</router-link>
        </li>
        <li class="list-none font-bold  ml-3 cursor-pointer text-black hover:text-white">
            <router-link to="/about" activeClass="text-white">About</router-link>
        </li>
    </ul>
</div>
</template>

<script>
export default {

    data() {
        return {
            list
        }
    },


    
}
</script>

<style>
.header {
    width: 100%;
    height: 10vh;
    background-color: #36b686;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

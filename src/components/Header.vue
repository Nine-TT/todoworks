<template>
<div class="header">
    <ul class="flex ">
       <li class="list-none font-bold  ml-3 cursor-pointer text-black hover:text-white">
            <router-link :to="item.path" activeClass="text-white">{{ item.name }}</router-link>
        </li>
    </ul>
</div>
</template>

<script>
export default {

    data() {
        return {
           listHeader: [
                {
                    name: 'Home',
                    path: '/'
                },

                {
                    name: 'About',
                    path: '/about'
                }
            ]
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

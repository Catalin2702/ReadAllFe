<!--suppress JSUnresolvedVariable -->
<template>
    <div class="app" @scroll="onScroll">
        <router-view/>
        <NavigationMenu v-if="openMenuList && isMenuButton"/>
        <MenuButton @toggleMenu="toggleMenu" v-show="isMenuButton"/>
    </div>
</template>

<script>

import MenuButton from "@/components/MenuButton.vue";
import NavigationMenu from "@/components/NavigationMenu.vue";

export default {
    name: 'App',
    components: {
        NavigationMenu,
        MenuButton
    },
    data(){
        return{
            openMenuList: false,
            lastScroll: 0,
            isMenuButton: true,
            viewWithoutMenu: ['Reader'],
            socket: null,
            session: null
        }
    },
    created(){
    },
    methods: {
        toggleMenu(param){
            this.openMenuList = param
        },
        checkRouter(){
            return this.$route.name
        }
    },
    watch:{
        $route(){
            this.isMenuButton = !this.viewWithoutMenu.includes(this.checkRouter())
            this.openMenuList = false
        }
    },
}
</script>

<style lang="scss">

</style>

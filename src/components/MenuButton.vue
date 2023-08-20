<template>
    <transition name="menuButton">
    <div class="MenuButtonContainer" :style="standalone ? {bottom: '-35px'}: {bottom: '25px'}" @click="toggleMenu">
        <div class="MenuDash" :class="menuOpen ? 'upperMenuDash' : '' ">
        </div>
        <div class="MenuDash" :class="menuOpen ? 'centerMenuDash': '' ">
        </div>
        <div class="MenuDash" :class="menuOpen ? 'lowerMenuDash' : '' ">
        </div>
    </div>
    </transition>
</template>

<script>
export default {
    name: "NavigationMenu",
    data(){
        return{
            menuOpen: false,
            standalone: false
        }
    },
    methods: {
        toggleMenu(){
            this.menuOpen = !this.menuOpen
            this.$emit('toggleMenu', this.menuOpen)
        },
    },
    watch:{
        $route(){
            this.menuOpen = false
        }
    },
    mounted() {
        if(navigator.standalone) this.standalone = true
    }
}
</script>

<style scoped>

</style>
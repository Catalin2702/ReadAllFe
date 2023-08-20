<template>
    <transition name="menu">
        <nav class="Menu" :style="standalone ? {bottom: '50px'}: {bottom: '100px'}">
            <ul>
                <router-link :to="{name: data.name}" :key="index" v-for="(data, index) in routes" class="MenuElement link">
                    <IconSVG :name="data.icon" :size="this.size" :color="this.color"/>
                    <p class="notranslate">{{data.name}}</p>
                </router-link>
            </ul>
        </nav>
    </transition>
</template>

<script>
import IconSVG from "@/components/IconSVG.vue";
export default {
    name: "NavigationMenu",
    components: {
        IconSVG
    },
    data(){
        return{
            routes: [
                {
                    name: 'Home',
                    icon: 'home.svg'
                },
                {
                    name: "Explore",
                    icon: "explore.svg",
                },
                {
                    name: "Settings",
                    icon: "settings.svg",
                },
                {
                    name: "Account",
                    icon: "account.svg",
                }
            ],
            size: "25px",
            color: 'darkestColor',
            standalone: false,
            session: null
        }
    },
    props: {
    },
    mounted() {
        this.standalone = navigator.standalone
    },
    created() {
    }
}
</script>

<style scoped>

</style>
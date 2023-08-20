<template>
    <router-link :to="{name: 'Media'}" class="link" @click="createStore">
        <div class="card">
            <img :src="img ? img : path" alt="" class="Image">
            <p class="TypeContent notranslate">{{typeContent ? typeContent : ''}}</p>
            <div class="InfoContainer">
                <p class="notranslate">{{title ? title : ''}}</p>

            </div>
        </div>
    </router-link>
</template>

<script>

import {useMediaDataStore} from "@/store/MediaData";

export default {
    name: "CardComp",
    data(){
        return{
            path: require('@/assets/images/anime.jpg'),
        }
    },
    props: {
        img: String,
        title: String,
        link: String,
        typeContent: String
    },
    methods: {
        createStore(){
            useMediaDataStore().setState({
                img: this.img,
                title: this.title,
                link: this.link,
                typeContent: this.typeContent
            })
            useMediaDataStore().setChapters([])
        }
    }
}
</script>

<style scoped lang="scss">

</style>
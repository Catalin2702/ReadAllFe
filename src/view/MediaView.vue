<template>
    <div class="view MediaView">
        <div class="MediaInfoContainer">
            <div class="MediaCard">
                <img :src="img" alt="" class="Image">
            </div>
            <div class="MediaInfo">
                <p class="Info notranslate">{{ title }}</p>
                <div class="subInfo">
                    <p class="Type">{{ typeContent }}</p>
                    <IconSVG :name="iconName" :color="iconColor" :size="iconSize" :style="{cursor: 'pointer'}" @click="addFavorite"/>
                </div>
            </div>
        </div>
        <div class="MediaChapterContainer">
            <router-link :to="{name: 'Reader'}" class="link" v-for="(link, key) in chapterList"
                         :key="key" @click="setUrlContent" :link="link">
                <div class="MediaChapter notranslate">
                    {{key}}
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import {useMediaDataStore} from "@/store/MediaData";
import {reactive} from "vue";
import {useReaderData} from "@/store/readerData";
import {useSocket} from "@/store/webSocket";

import IconSVG from "@/components/IconSVG.vue";

export default {
    name: "MediaView",
    components: {
       IconSVG
    },
    data() {
        return{
            img: null,
            title: null,
            link: null,
            typeContent: null,
            chapterLink: null,
            chapterList: reactive([]),
            socket: null,
            favorite: false,
            iconName: this.favorite === true ? 'favorite_fill.svg' : 'favorite.svg',
            iconColor: 'impactColor',
            iconSize: '40px',
        }
    },
    created() {
        const mediaStore = useMediaDataStore()
        this.img = mediaStore.img
        this.title = mediaStore.title
        this.link = mediaStore.link
        this.typeContent = mediaStore.typeContent
        this.chapterList = mediaStore.chapters

        this.socket = useSocket()
        this.socket.socket.onmessage = (event) => {
            let message = JSON.parse(event.data)
            if (message.results){
                this.chapterList = JSON.parse(message.results)
                mediaStore.setChapters(this.chapterList)
            }

        }
        const params = {
            'query': this.link,
            'contentType': this.typeContent,
            'action': 'getChapter',
        }
        if (this.link && this.typeContent){
            if (this.chapterList.length === 0) {
                this.socket.sendMessage(JSON.stringify(params))
            }
        }
        else {
            this.$router.go(-1)
        }
    },
    methods: {
        setUrlContent(event) {
            const readerData = useReaderData()
            readerData.setState({
                url: event.currentTarget.getAttribute('link'),
                typeContent: this.typeContent
            })
        },
        addFavorite(){
            this.favorite = !this.favorite
            this.iconName = this.favorite ? 'favorite_fill.svg' : 'favorite.svg'
            console.log(this.iconName)
        },
    },
}
</script>

<style scoped>

</style>
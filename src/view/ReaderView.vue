<template>
    <div class="view">
        <div class="ManhwaReader notranslate" v-if="typeContent === 'manhwa'">
            <ImageComp v-for="(data,index) in content" :img="data" :key="index" :image-class="'ManhwaImageComp'" class="notranslate"/>
        </div>
        <div class="MangaReader notranslate" v-else-if="typeContent === 'manga'">
            <ImageComp :image-class="'MangaImageComp'" :img="content[imageIndex]" class="notranslate"/>
            <div class="LeftButton" @click="leftClick"/>
            <div class="RightButton" @click="rightClick"/>
        </div>
        <div class="novelReader" v-else-if="typeContent === 'novel'" :style="standalone ? {paddingTop: '60px'}: {}">
            <p v-html="text+'<br><br>'" class="novelContainer" :key="index" v-for="(text,index) in content">
            </p>
        </div>
    </div>
</template>

<script>
import ImageComp from "@/components/ImageComp.vue";
import {useReaderData} from "@/store/readerData";
import {useSocket} from "@/store/webSocket";
import {reactive} from "vue";

export default {
    name: "ReaderView",
    components: {ImageComp},
    data(){
        return{
            typeContent: '',
            imageIndex: 0,
            standalone: false,
            content: reactive([]),
            url: '',
            chapter: '',
            socket: null,
            action : this.typeContent === 'novel' ? 'getNovelContent' : 'getMangaContent'
        }
    },
    methods: {
        leftClick(){
            this.imageIndex--
            if(this.imageIndex<0) this.imageIndex = this.images.length-1
        },
        rightClick(){
            this.imageIndex++
            if(this.imageIndex === this.images.length) this.imageIndex = 0
        }
    },
    mounted() {
        this.standalone = navigator.standalone
    },
    created() {
        const dataReader = useReaderData()
        this.url = dataReader.url
        this.typeContent = dataReader.typeContent

        this.socket = useSocket()
        this.socket.socket.onmessage = (event) => {
            let message = JSON.parse(event.data)
            if (message.results)
                this.content = JSON.parse(message.results)
        }

        const params = {
            'query': this.url,
            'contentType': this.typeContent,
            'action': this.action
        }

        if (this.url && this.typeContent && this.action)
            this.socket.sendMessage(JSON.stringify(params))
        else
            this.$router.go(-1)
    }
}
</script>

<style scoped>

</style>
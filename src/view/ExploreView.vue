<template>
    <div class="view cardContainer" @scroll="onScroll">
        <CardComp :img="data.image" :title="data.original_title" :link="data.link" :typeContent="data.type" v-for="(data,index) in cardData" :key="index" />
        <SearchField v-show="isSearchField" @search="search"/>
    </div>
</template>

<script>
import SearchField from "@/components/SearchField.vue";
import CardComp from "@/components/CardComp.vue";
import {reactive} from "vue";
import {useSocket} from "@/store/webSocket";
import {useSessionData} from "@/store/sessionData";

export default {
    name: "ExploreView",
    components: {CardComp, SearchField},
    data(){
        return{
            isSearchField: true,
            lastScroll: 0,
            cardData: reactive([]),
            socket: null,
            session: null
        }
    },
    mounted(){

    },
    created() {
        this.socket = useSocket()
        this.session = useSessionData()
        this.socket.socket.onmessage = (event) => {
            let message = JSON.parse(event.data)
            if (message.results)
                this.cardData = JSON.parse(message.results)
            else if (message.signIn) {
                this.session.setState(message.signIn)
            }
        }
    },
    methods: {
        onScroll(event){
            if(event.target.scrollTop === 0) this.isSearchField = true
            else{
                this.isSearchField = event.target.scrollTop < this.lastScroll
            }
        },
        search(title){
            const params = {
                'query': title,
                'contentType': '',
                'action': 'search',
            }
            this.socket.sendMessage(JSON.stringify(params))
        }
    },
}
</script>

<style scoped>

</style>
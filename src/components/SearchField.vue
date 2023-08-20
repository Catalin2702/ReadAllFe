<template>
    <transition name="search">
        <div class="SearchContainer" :style="standalone ? {top: 'calc(100% - 15px)'} : {}">
            <input type="text" class="SearchField" placeholder="Search.." v-model="searchTitle" @input="updateTitle">
            <button class="SearchButton" @click="search">
                <IconSVG :name="arrow" :color="colorArrow" :size="arrowSize" v-if="isArrow"/>
            </button>
        </div>
    </transition>
</template>

<script>
import IconSVG from "@/components/IconSVG.vue";
import {useLastSearch} from "@/store/lastSearch";

// noinspection JSUnusedGlobalSymbols
export default {
    name: "SearchField",
    components: {IconSVG},
    mounted() {
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.arrowSize = '40px'
        } else {
            this.arrowSize = '60px'
        }
        this.isArrow = true

        if(navigator.standalone) this.standalone = true

    },
    data(){
        return{
            searchTitle: null,
            arrow : "search.svg",
            colorArrow: "impactColor",
            arrowSize: String,
            isArrow: false,
            standalone: false,
        }
    },
    methods: {
        updateTitle(event){
            this.searchTitle = event.target.value
            const lastSearch = useLastSearch()
            lastSearch.setState(this.searchTitle)
            if (this.searchTitle.length > 2)
                this.search()
        },
        search(){
            this.$emit('search', this.searchTitle)
        },
    },
    computed: {
    },
    created() {
        const lastSearch = useLastSearch()
        if (lastSearch.query){
            this.searchTitle = lastSearch.query
            this.search()
        }
    }
}
</script>

<style scoped>

</style>
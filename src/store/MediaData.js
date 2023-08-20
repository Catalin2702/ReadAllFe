import {defineStore} from "pinia";

export const useMediaDataStore = defineStore('mediaData',{
    state: ()=>{
        return{
            img: null,
            title: null,
            link: null,
            typeContent: null,
            chapters: null
        }
    },
    actions: {
        setState(obj){
            this.img = obj.img
            this.title = obj.title
            this.link = obj.link
            this.typeContent = obj.typeContent
        },
        setChapters(chapters){
            this.chapters = chapters
        }
    }
})
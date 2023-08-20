import {defineStore} from "pinia";

export const useReaderData = defineStore('readerData',{
    state: ()=>{
        return{
            url: '',
            typeContent: ''
        }
    },
    actions: {
        setState(obj){
            this.url = obj.url
            this.typeContent = obj.typeContent
        }
    }
})
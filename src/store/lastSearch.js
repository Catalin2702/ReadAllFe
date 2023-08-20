import {defineStore} from "pinia";

export const useLastSearch = defineStore('lastSearch',{
    state: ()=>{
        return{
            query: ''
        }
    },
    actions: {
        setState(query){
            this.query = query
        }
    }
})
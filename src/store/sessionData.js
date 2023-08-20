import {defineStore} from "pinia";

export const useSessionData = defineStore('sessionData',{
    state: ()=>{
        return{
            logged: false,
            email: '',
            username: '',
            token: ''
        }
    },
    actions: {
        setLogged(logged){
            this.logged = logged
        },
        setEmail(email){
            this.email = email
        },
        setUsername(username){
            this.username = username
        },
        setToken(token){
            this.token = token
        },
        setState(data){
            this.email = data.email
            this.username = data.username
            this.token = data.token
            this.logged = data.logged
        }
    }
})
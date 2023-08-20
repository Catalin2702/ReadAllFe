import {defineStore} from "pinia";

const wsUrl = 'ws://192.168.1.5:8000'

let socket = new WebSocket(wsUrl)
let connesso = false
socket.onmessage = (event) => {
    return event
}
socket.onopen = () => {
    socket.send('Connected')
    connesso = true
}
socket.onclose = (event) => {
    if (!event.wasClean){
        console.log("Disconnected")
        setTimeout(()=>{
            socket = new WebSocket(wsUrl)
            socket.onopen = () => {
                console.log("Reconnected")
            }
        }, 3000)
    }
}
export const useSocket = defineStore('socket',{

    state: ()=>{
        return{
            socket,
            connesso
        }
    },
    actions: {
        sendMessage(message) {
            socket.send(message)
        }
    }
})
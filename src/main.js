import { createApp} from 'vue';
import App from './App.vue';
import router from "@/router";
import {createPinia} from "pinia";
import Cookies from 'js-cookie';

import "@/style/Main.scss";
import "@/style/View.scss";
import "@/style/HomeView.scss";
import "@/style/CardComp.scss";
import "@/style/NavigationMenu.scss";
import "@/style/SearchField.scss";
import "@/style/ReaderView.scss";
import "@/style/MediaView.scss";
import "@/style/AccountView.scss";

import {useSocket} from "@/store/webSocket";


const app = createApp(App);
const pinia = createPinia();


app.use(router);
app.use(pinia);
app.mount("#app");

const socket = useSocket();
const username = Cookies.get('username');
const email = Cookies.get('email');
const token = Cookies.get('token');

if (username && email && token){
    const userCredentials = {
        action: 'signIn',
        username: username,
        email: email,
        token: token
    }
    socket.socket.onopen = () => {
        socket.sendMessage(JSON.stringify(userCredentials))
    }
}

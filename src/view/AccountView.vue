<template>
    <div class="view accountView">
        <LoginComp @signIn="signIn" v-if="loginView"/>
    </div>
</template>

<script>
import LoginComp from "@/components/LoginComp.vue";
import {useSocket} from "@/store/webSocket";
import {useSessionData} from "@/store/sessionData";
import Cookies from 'js-cookie';
export default {
    name: "AccountView",
    components: {
        LoginComp,
    },
    data() {
        return {
            socket: null,
            session: null,
            loginView: true,
        }
    },
    created() {
        this.socket = useSocket()
        this.session = useSessionData()
        this.socket.socket.onmessage = (event) => {
            let message = JSON.parse(event.data)
            if (message.signIn) {
                this.session.setState(message.signIn)
                if (this.session.logged){
                    Cookies.set('username', this.session.username, {expires: 15})
                    Cookies.set('email', this.session.email, {expires: 15})
                    Cookies.set('token', this.session.token, {expires: 15})
                    this.$router.push('/')
                }
            }
        }
    },
    methods: {
        signIn(data) {
            this.session.setToken('96b778f99cb0f8c8a6567efc3b4778c1330cb97566fd3621e44dc793d576faed')
            const params = {
                action: 'signIn',
                username: data.username,
                password: data.password,
                token: this.session.token
            }
            this.socket.sendMessage(JSON.stringify(params))
        }
    },
}
</script>

<style scoped>

</style>
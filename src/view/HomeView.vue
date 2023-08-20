<template>
  <div class="view ">
      <div class="cardContainer" v-if="session.logged">
          <CardComp v-for="(x,y) in 15" :img="'ciao'" :link="'ciao'" :title="'ciao'" :key="y"/>
      </div>
      <div v-else>
          ciao
      </div>
  </div>
</template>

<script>
import CardComp from "@/components/CardComp.vue";
import {useSocket} from "@/store/webSocket";
import {useSessionData} from "@/store/sessionData";

export default {
    name: "HomeView",
    components: {
        CardComp,
    },
    data() {
        return {
            socket: null,
            session: null
        }
    },
    created() {
        this.socket = useSocket()
        this.session = useSessionData()

        this.socket.socket.onmessage = (event) => {
            let message = JSON.parse(event.data)
            if (message.signIn)
                this.session.setState(message.signIn)
        }
    },

}
</script>

<style scoped>

</style>
<template>
    <div class="accountSubView">
        <div class="head">
            <p>Sign in</p>
        </div>
        <div class="main">
            <input type="text" class="textField" placeholder="Username.." v-model="username">
            <input type="password" class="textField" placeholder="Password.." v-model="password">
            <button class="submit" @click="signIn">Login</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "LoginComp",
    data() {
        return {
            username: null,
            password: null
        }
    },
    methods: {
        signIn() {
            this.$emit('signIn', {username: this.username, password: this.password})
        }
    },
}
</script>

<style scoped>

</style>
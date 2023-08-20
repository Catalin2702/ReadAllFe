<!--suppress JSUnusedGlobalSymbols -->
<template>
    <img v-bind:src="img" alt=""
         v-bind:style="{width: size, height: size}"
         :class="color"
        >
</template>

<script>
export default {
    name: "IconSVG",
    props: {
        name: String,
        size: String,
        color: String,
    },
    data(){
        return{
            img : String
        }
    },
    created() {
        this.img = require("@/assets/icons/"+this.name)
    }
}
</script>

<style scoped lang="scss">
    .impactColor {
        filter: invert(86%) sepia(63%) saturate(3840%) hue-rotate(186deg) brightness(91%) contrast(115%);
    }
    .darkestColor {
        filter: invert(10%) sepia(20%) saturate(6691%) hue-rotate(267deg) brightness(86%) contrast(112%);
    }
</style>
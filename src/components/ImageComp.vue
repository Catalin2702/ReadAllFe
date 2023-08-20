<template>
    <img :src="img" alt="" :class="imageClass" class="notranslate">
</template>

<script>
export default {
    name: "ImageComp",
    props: {
        imageClass: String,
        img: String,
    }
}
</script>

<style scoped>

</style>
<template>
    <div class = "column">
        <Post v-for = "count in 10" :key = "count"/>
    </div>
</template>

<script>
import Post from "components/Post";

export default {
    name: "PostPage",
    components: {Post}
}
</script>

<style scoped>

</style>

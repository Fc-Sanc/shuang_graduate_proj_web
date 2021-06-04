<template>
    <div class = "row justify-center q-ma-md">
        <PostBox v-for = "model in posts" :key = "model.id" :post = "model"/>
    </div>
</template>

<script>
import PostBox from "components/PostBox";

export default {
    name: "PostPageBox",
    components: {PostBox},
    props: {
        posts: {
            type: Array
        }
    }
}
</script>

<style scoped>

</style>

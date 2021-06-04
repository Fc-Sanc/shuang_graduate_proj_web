<template>
    <q-page class = "page row justify-center items-center">
        <LoginBox class = "q-ml-md"/>
    </q-page>
</template>

<script>
import LoginBox from "components/LoginBox";

export default {
    name: "LoginPage",
    components: {LoginBox}
}
</script>

<style scoped>
.page {
    height: 100%;
    width: 100%;
}
</style>

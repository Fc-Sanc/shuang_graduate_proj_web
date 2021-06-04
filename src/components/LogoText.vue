<template>
    <div>
        <span ref = "prefix" :class = "dark ? 'text-white' : 'text-black'">In</span>
        <span ref = "suffix" :class = "dark ? 'text-black' : 'text-white'">Somnia</span>
    </div>
</template>

<script>
export default {
    name: "LogoText",
    data() {
        return {
            dark: false,
            link: "/",
        }
    },
    watch: {
        '$q.dark.isActive'(val) {
            this.dark = val
        }
    }
}
</script>

<style scoped>

</style>

<template>
    <div id = "q-app">
        <router-view/>
    </div>
</template>
<script>

export default {
    name: 'App',
    provide() {
        return {
            reload: 'reload',
        }
    },
    data() {
        return {}
    },
    computed: {
    },
    methods: {
        init() {
            console.log('app.vue')

        },
    },
    mounted() {
        this.init()
    }
}
</script>

<template>
  <div id = "q-app">
    <router-view v-if = "!routing"/>
  </div>
</template>
<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      routing: false
    }
  },
  method: {
    reload() {
      this.routing = true
      this.$nextTick(() => {
        this.routing = false
      })
    }
  }
}
</script>

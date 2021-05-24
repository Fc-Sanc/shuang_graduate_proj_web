<template>
  <q-page class = "flex flex-center">
    <!--    <img-->
    <!--      alt = "InSomnia logo"-->
    <!--      src = "~assets/moon_1.png"-->
    <!--      width="500px"-->
    <!--    >-->
    <div class = "column">
      <div class = "text-h6">
        <q-icon :name = "icon" :size = "size"/>
        <span class = "text-primary">{{ text }}</span>
      </div>
      <div class = "q-pa-lg text-center text-secondary text-italic">
        {{ quotes }}
      </div>
    </div>
  </q-page>
</template>

<script>
import {Api} from "src/router";

export default {
  name: 'PageIndex',
  data() {
    return {
      text: '愿求职不再使年轻人失眠，买房不再是年轻人的梦想',
      icon: 'nightlight',
      size: 'xl',
      quotes: '',
      hitokoto: Api.api_third_party.hitokoto
    }
  },
  mounted() {
    fetch(this.hitokoto.url, {
      method: Api.api_third_party.hitokoto.method
    })
      .then(result => result.json())
      .then(result => {
        this.quotes = result.hitokoto
      })
  }
}
</script>

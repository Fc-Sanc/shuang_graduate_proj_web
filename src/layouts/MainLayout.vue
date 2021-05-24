<template>
  <q-layout view = "lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          ref = "menu_btn"
          flat dense round
          :icon = "icon"
          aria-label = "Menu"
          @click = "clickMenu"
        />

        <q-separator dark vertical/>

        <q-toolbar-title class = "text-weight-bolder">
          <LogoText/>
        </q-toolbar-title>

        <q-space/>

        <q-btn-group push>
          <q-btn
            ref = "btn_register"
            dense
            color = "white"
            class = "text-black"
            label = "Register"
            @click = "goRegister"/>

          <q-btn
            ref = "btn_login"
            dense
            color = "secondary"
            label = "Login"/>
        </q-btn-group>

      </q-toolbar>
      <q-toolbar>

        <div class = "row">
          <q-btn
            ref = "btn_go_back"
            flat dense round
            icon = "arrow_back_ios_new"
            aira_label = "GoBack"
            @click = "goBack"/>
          <q-toolbar-title class = "text-weight-regular">
            返回
          </q-toolbar-title>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model = "leftDrawerOpen"
      show-if-above
      bordered
    >
      <!--      content-class = "bg-grey-1"-->
      <q-list class = "text-bott">
        <q-item-label
          header
          class = "text-grey-8"
        >
          导航栏
        </q-item-label>
        <NaviLinkItem
          v-for = "link in naviLinkItems"
          :key = "link.id"
          v-bind = "link"
        />
        <q-item-label
          header
          class = "text-grey-8"
        >
          设置
        </q-item-label>
        <q-toggle
          v-model = "nightModeOpen"
          color = "gray"
          label = "夜晚模式"
          @input = "nightModeToggle"
        />
      </q-list>


    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

    <q-footer class = "reveal elevated">
      <q-toolbar class = "row justify-between">
        <WeatherBar/>

        <div class = "text-right" style = "padding-right: 10px">
          Powered by Quasar v{{ $q.version }}, Shuang presented.
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<style>
* {
  font-family: 'Monaco', 'Sarasa UI SC', monospace;
}
</style>

<script>
import NaviLinkItem from 'components/NavigatorLink.vue'
import LogoText from "components/LogoText";
import {Api, candidate_navi_items} from "src/router";
import WeatherBar from "components/WeatherBar";

export default {
  name: 'MainLayout',
  components: {WeatherBar, LogoText, NaviLinkItem},
  data() {
    return {
      leftDrawerOpen: false,
      icon: 'nightlight',
      naviLinkItems: candidate_navi_items,
      nightModeOpen: false,
      weather: Api.api_third_party.weather
    }
  },
  methods: {
    clickMenu() {
      this.leftDrawerOpen = !this.leftDrawerOpen
      console.log(this.leftDrawerOpen)
      if (this.leftDrawerOpen) {
        this.icon = "nightlight"
      } else {
        this.icon = "menu"
      }
    },
    nightModeToggle() {
      this.$q.dark.set(this.nightModeOpen)
      console.log(this.nightModeOpen)
    },
    goBack() {
      this.$router.back()
    },
    goRegister() {
      this.$router.push({path: '/login'})
    }
  },

}
</script>

<template>
    <q-layout view = "hHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn flat dense round
                       ref = "menu_btn" aria-label = "Menu"
                       :icon = "icon"
                       @click = "clickMenu"/>

                <q-separator vertical
                             class = "q-my-sm q-mx-md"/>

                <q-toolbar-title class = "text-weight-bolder">
                    <LogoText/>
                </q-toolbar-title>

                <q-space/>

                <UserInfoBar/>

            </q-toolbar>
        </q-header>

        <q-drawer
            v-model = "leftDrawerOpen"
            show-if-above
            bordered
            :mini = "miniState"
            @mouseover = "miniState = false"
            @mouseout = "miniState = true"
        >
            <q-list class = "text-bott">
                <NaviLinkItem v-for = "link in naviLinkItems" :key = "link.id" v-bind = "link"/>
            </q-list>


        </q-drawer>

        <q-page-container>
            <router-view/>
        </q-page-container>

        <q-footer class = "reveal elevated">
            <q-toolbar class = "row justify-between">
                <WeatherBar/>
                <q-space/>

                <q-btn flat no-caps
                       icon = "coffee" label = "请作者喝杯咖啡"
                       @click = "payDialog = true"/>

                <q-space/>
                <div class = "text-right" style = "padding-right: 10px">
                    Powered by Quasar v{{ $q.version }}, Shuang presented.
                </div>
            </q-toolbar>
        </q-footer>

        <q-dialog v-model = "payDialog">
            <q-img :src = "alipay" style = "width:20vw"/>
        </q-dialog>
    </q-layout>
</template>

<style>
* {
    font-family: 'Monaco', '-apple-system', monospace;
}
</style>

<script>
import NaviLinkItem from 'components/NavigatorLink.vue'
import LogoText from "components/LogoText";
import WeatherBar from "components/WeatherBar";
import {Cookies} from 'quasar';
import UserInfoBar from "components/UserInfoBar";
import {api_third_party} from "assets/js/api";
import {candidate_navi_items} from "assets/js/navi_items/candidate_navi_items";
import {getImageUrl} from "assets/js/getImage";

export default {
    name: 'MainLayout',
    components: {UserInfoBar, WeatherBar, LogoText, NaviLinkItem},
    data() {
        return {
            miniState: true,
            leftDrawerOpen: false,
            icon: 'nightlight',
            naviLinkItems: candidate_navi_items,
            nightModeOpen: false,
            weather: api_third_party.weather,
            alipay: getImageUrl('jpg/alipay.jpg'),
            payDialog: false,
        }
    },
    methods: {
        clickMenu() {
            this.leftDrawerOpen = !this.leftDrawerOpen
            if (this.leftDrawerOpen) {
                this.icon = "nightlight"
            } else {
                this.icon = "menu"
            }
        },
        nightModeToggle() {
            this.$q.dark.set(!this.$q.dark.isActive)
            Cookies.set('dark_mode', this.$q.dark.isActive.toString())
        },
        goBack() {
            this.$router.back()
        },
    },
    mounted() {
        this.nightModeOpen = Cookies.get('dark_mode')
        if (this.nightModeOpen === null) {
            this.nightModeOpen = false
        }
        this.$q.dark.set(this.nightModeOpen)
    }

}
</script>

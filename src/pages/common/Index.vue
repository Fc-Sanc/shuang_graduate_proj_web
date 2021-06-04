<template>
    <q-page class = "flex flex-center">
        <div class = "column items-center">
            <q-icon name = "o_nightlight"
                    style = "font-size: 6rem"
                    class = "q-ma-lg"/>
            <div class = "text-h6">
                <span class = "text-primary">{{ slogan }}</span>
            </div>
            <div class = "q-pa-lg text-center text-secondary text-italic">
                {{ quotes }}
            </div>
        </div>
    </q-page>
</template>

<script>
import {api_third_party} from "assets/js/api";
import {fetch_tp} from "assets/js/method/fetch_extension";

export default {
    name: 'PageIndex',
    data() {
        return {
            slogan: '愿求职不再使年轻人失眠，买房不再是年轻人的梦想',
            quotes: '',
            api: {
                hitokoto: api_third_party.hitokoto
            }
        }
    },
    methods: {},
    mounted() {
        fetch_tp(this.api.hitokoto.url, {
            method: this.api.hitokoto.method
        }).then(result => {
            this.quotes = result.hitokoto
        })
    }
}
</script>

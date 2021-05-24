<template>
  <div>
    <q-ajax-bar ref = "ajax_bar" skip-hijack position = "bottom"/>
    <div class = "text-h4 text-center q-pa-md">注册</div>
    <div class = "row justify-center">

      <div class = "form">
        <q-input filled v-model = "register_api.params.username" label = "Username"/>
        <br/>
        <q-input type = "password" filled v-model = "register_api.params.password" label = "Password"/>
        <br/>
        <q-input filled v-model = "register_api.params.email" label = "E-mail"/>
        <br/>
        <q-input filled v-model = "register_api.params.name" label = "Real Name"/>
        <br/>
        <div class = "row justify-evenly">
          <q-radio v-model = "register_api.params.type" val = "social" label = "社会人士"/>
          <q-radio v-model = "register_api.params.type" val = "student" label = "在校学生"/>
        </div>
        <div class = "row justify-evenly">
          <q-btn color = "primary" label = "Register" @click = "register"/>

          <q-btn flat round color = "primary" label = "reset" @click = "onreset"/>
        </div>
      </div>
    </div>

    <q-dialog v-model = "alert">
      <q-card>

        <q-card-section>
          <div class = "text-h6">Alert</div>
        </q-card-section>

        <q-card-section class = "q-pt-none">
          {{ result }}
        </q-card-section>

        <q-card-actions align = "right">
          <q-btn flat label = "OK" color = "primary" v-close-popup/>
        </q-card-actions>

      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {Api} from "src/router";

import cookie from "js-cookie"
import {fetch_s} from "assets/js/method/fetch_extension";

export default {
  name: "RegisterBox",
  data() {
    return {
      alert: false,
      result: '',
      register_api: Api.api.register
    }
  },
  methods: {
    register() {
      this.$refs.ajax_bar.start()
      fetch_s(this.register_api.url, {
        method: this.register_api.method,
        body: JSON.stringify(this.register_api.params),
        headers: {
          'Content-Type': "application/json;charset=utf-8"
        }
      }).then(result => result.json())
        .then(json => {
          if (json.code === 0 && json.data['token'] !== null) {
            this.result = '注册成功，即将跳转到主页^_^'
            cookie.set('jwt', json.data['token'])
            setTimeout(() => {
              this.$router.push({path: '/'})
            }, 3000)
          } else {
            this.result = '注册失败，用户名或邮箱重复，请更换后重新注册'
          }
          this.alert = true
          this.$refs.ajax_bar.stop()
        })
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.form {
  min-width: 400px;
}
</style>

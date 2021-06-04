<template>
    <div class = "card">
        <q-ajax-bar ref = "ajax_bar" skip-hijack position = "bottom"/>
        <div class = "text-h4 text-center q-pa-md">注册</div>
        <div class = "row justify-center q-ma-md">
            <q-form ref = "register_form"
                    autocorrect = "off" autocapitalize = "off"
                    autocomplete = "off" spellcheck = "false"
                    @submit = "onSubmit" @reset = "onReset"
                    class = "q-gutter-md">
                <q-input outlined
                         v-model = "api.register.body.username"
                         label = "Username" hint = "请输入您的用户名"
                         :rules = "[val => val && val.length !== 0 || '必填项']"
                         class = "q-ma-sm input"/>
                <br/>
                <q-input outlined
                         v-model = "api.register.body.password"
                         type = "password" label = "Password" hint = "请输入您的密码"
                         :rules = "[val => val && val.length !== 0 || '必填项']"
                         class = "q-ma-sm input"/>
                <br/>
                <q-input outlined
                         v-model = "api.register.body.email"
                         label = "E-mail" hint = "请输入您的电子邮箱"
                         :rules = "[val => val && val.length !== 0 || '必填项']"
                         class = "q-ma-sm input"/>
                <br/>
                <q-input outlined
                         v-model = "api.register.body.name"
                         label = "Real Name" hint = "请输入您的真实名称，您的名称会被用于简历中，请认真填写"
                         :rules = "[val => val && val.length !== 0 || '必填项']"
                         class = "q-ma-sm input"/>
                <br/>
                <div class = "row justify-evenly">
                    <q-radio v-model = "api.register.body.type"
                             val = "social" label = "社会人士"/>
                    <q-radio v-model = "api.register.body.type"
                             val = "student" label = "在校学生"/>
                </div>
                <div class = "row justify-evenly">
                    <q-btn no-caps
                           color = "secondary" label = "Register" type = "submit"
                           class = "btn"/>

                    <q-btn outline no-caps
                           color = "primary" label = "Reset" type = "reset"
                           class = "btn"/>
                </div>
            </q-form>
        </div>
    </div>
</template>

<script>
import {Cookies} from 'quasar'
import {fetch_get, fetch_post_json_body} from "assets/js/method/fetch_extension";
import {api} from "assets/js/api";

export default {
    name: "RegisterBox",
    data() {
        return {
            api: {
                register: api.candidate.register(),
                selfInfo: api.candidate.getSelfInfo()
            }
        }
    },
    methods: {
        register() {
            this.$refs.ajax_bar.start()
            fetch_post_json_body(this.api.register.url, {
                body: JSON.stringify(this.api.register.body),
            }).then(result => {
                if (result.code === 0 && result.data['token'] !== null) {
                    Cookies.set('token', result.data['token'])
                    fetch_get(this.api.selfInfo.url).then(result => {
                        Cookies.set('user_id', result.data.id)
                        Cookies.set('user_type', 'candidate')
                        Cookies.set('username', result.data.username)
                        Cookies.set('avatar_url', result.data.avatarUrl)
                    })
                    this.$q.notify({
                        message: '注册成功，即将跳转到主页^_^',
                        color: 'primary',
                        timeout: 1000,
                        progress: true
                    })
                    setTimeout(() => {
                        this.$router.push({path: '/'})
                        setTimeout(() => {
                            this.$router.go(0)
                        }, 100)
                    }, 3000)
                } else {
                    this.$q.notify('注册失败，用户名或邮箱重复，请更换后重新注册')
                }
                this.$refs.ajax_bar.stop()
            })
        },
        onSubmit() {
            this.$refs.register_form.validate().then(success => {
                if (success) {
                    this.register()
                }
            })
        },
        onReset() {
            this.api.register = api.candidate.register()
        }
    },
    mounted() {
    }
}
</script>

<style scoped>
.card {
    width: 40vw;
}

.input {
    width: 30vw;
}

.btn {
    width: 10vw;
}
</style>

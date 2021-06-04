<template>
    <div class = "card">
        <q-ajax-bar ref = "ajax_bar" skip-hijack position = "bottom"/>
        <div class = "text-h4 text-center q-pa-md">登录</div>
        <div class = "row justify-center q-ma-md">
            <q-form ref = "register_form"
                    autocorrect = "off" autocapitalize = "off"
                    autocomplete = "off" spellcheck = "false"
                    @submit = "onSubmit"
                    class = "q-gutter-md form">
                <q-input outlined
                         v-model = "api.login.body.username"
                         label = "Username Or E-mail" hint = "请输入您的用户名或注册邮箱"
                         :rules = "[val => val && val.length !== 0 || '必填项']"
                         class = "q-ma-sm input"/>
                <q-input outlined
                         v-model = "api.login.body.password"
                         type = "password" label = "Password" hint = "请输入您的密码"
                         :rules = "[val => val && val.length !== 0 || '必填项']"
                         class = "q-ma-sm input"/>
                <div class = "row justify-evenly">
                    <q-btn no-caps
                           color = "secondary" label = "Login" type = "submit"
                           class = "btn"/>

                    <q-btn outline no-caps
                           color = "primary" label = "Register"
                           @click = "goRegister"
                           class = "btn"/>
                </div>
            </q-form>
        </div>
    </div>
</template>

<script>
import {api} from "assets/js/api";
import {fetch_get, fetch_post_json_body} from "assets/js/method/fetch_extension";
import {Cookies} from "quasar";
import {mapState} from "vuex";
import {checkLogin} from "assets/js/utils/checkLogin";

export default {
    name: "LoginBox",
    data() {
        return {
            api: {
                login: api.candidate.login(),
                selfInfo: api.candidate.getSelfInfo(),
                getUserSig: api.im.getUserSig()
            }
        }
    },
    computed: {
        ...mapState({user: state => state.user.info}),
    },
    methods: {
        login() {
            this.$refs.ajax_bar.start()
            fetch_post_json_body(this.api.login.url,
                {
                    body: JSON.stringify(this.api.login.body)
                }).then(result => {
                    if (result.code === 0 && result.data && result.data.token) {
                        let user = {
                            token: result.data.token
                        }
                        Cookies.set('token', result.data.token)
                        fetch_get(this.api.selfInfo.url).then(result => {
                            user.userId = result.data.id
                            user.username = result.data.username
                            user.avatarUrl = result.data.avatarUrl
                            Cookies.set('user_id', result.data.id)
                            Cookies.set('user_type', 'candidate')
                            Cookies.set('username', result.data.username)
                            Cookies.set('avatar_url', result.data.avatarUrl)
                            this.getUserSig = api.im.getUserSig(result.data.id)
                            fetch_get(this.getUserSig.url).then(result => {
                                user.imUserSig = result.data
                                this.$store.commit('user/setUserInfo', user)
                                this.$refs.ajax_bar.stop()
                                this.$q.notify({
                                    message: '登录成功，即将跳转到主页', color: 'secondary',
                                    timeout: 1000, progress: true
                                })
                                setTimeout(() => {
                                    this.$router.push({path: '/'})
                                    setTimeout(() => {
                                        this.$router.go(0)
                                    }, 100)
                                }, 3000)
                            })
                        })
                    } else {
                        this.$refs.ajax_bar.stop()
                        this.$q.notify({
                            message: '登录失败，请检查填入信息', color: 'negative',
                            timeout: 1000, progress: true
                        })
                    }
                }
            )
        },
        onSubmit() {
            this.$refs.register_form.validate().then(success => {
                if (success) {
                    this.login()
                }
            })
        },
        goRegister() {
            this.$router.push({path: '/candidate/register'})
        }
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
</style>

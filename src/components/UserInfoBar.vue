<template>
    <div>
        <q-btn dense flat no-caps v-if = "hasSignedIn">
            <q-item>
                <q-chip square color = "secondary">
                    <q-avatar square size = "25px">
                        <q-img :src = "model.avatarUrl" ratio = "1"/>
                    </q-avatar>
                    {{ model.username }}
                </q-chip>
            </q-item>

            <q-menu fit>
                <div class = "row no-wrap q-pa-md">

                    <div class = "column">
                        <q-list separator
                                style = "text-align: center"
                                class = "q-mb-md">
                            <q-btn outline
                                   icon = "o_account_circle" label = "账户管理" color = "primary"
                                   to = "/account"
                                   style = "width: 100%">
                            </q-btn>
                        </q-list>

                        <div class = "text-h6 q-mb-md row items-center">
                            <q-icon name = "settings" size = "sm"/>
                            <div class = "q-pl-sm">系统设置</div>
                        </div>

                        <q-toggle v-model = "darkMode" label = "夜晚模式" @input = "toggleDarkMode"/>
                    </div>

                    <q-separator vertical class = "q-mx-lg"/>

                    <div class = "column items-center">
                        <q-avatar size = "72px">
                            <q-img :src = "model.avatarUrl"/>
                        </q-avatar>

                        <div class = "text-subtitle1 q-mt-md q-mb-xs">{{ model.username }}</div>

                        <q-btn push v-close-popup
                               color = "primary" label = "注销" size = "sm"
                               @click = "logout"
                        />
                    </div>
                </div>
            </q-menu>
        </q-btn>
        <div v-else>
            <q-btn-group rounded>
                <q-btn
                    ref = "btn_register"
                    dense
                    color = "white"
                    class = "text-black q-pl-sm q-pr-sm"
                    label = "注册"
                    @click = "goToRegister"/>

                <q-btn
                    ref = "btn_login"
                    dense
                    class = "q-pr-sm q-pl-sm"
                    color = "secondary"
                    label = "登录"
                    @click = "goToLogin"/>
            </q-btn-group>
            <q-btn round flat icon = "settings">
                <q-menu fit>
                    <div class = "column q-pa-md">
                        <div class = "text-h6 q-mb-md">Settings</div>
                        <q-toggle v-model = "darkMode" label = "dark mode" @input = "toggleDarkMode"/>
                    </div>
                </q-menu>
            </q-btn>
        </div>
    </div>
</template>

<script>
import {getImageUrl} from "assets/js/getImage";

export default {
    name: "UserInfoBar",
    data() {
        return {
            hasSignedIn: false,
            darkMode: false,
            model: {
                username: '',
                avatarUrl: '',
            }
        }
    },
    methods: {
        goToRegister() {
            this.$router.push({path: '/candidate/register'})
        },
        goToLogin() {
            this.$router.push({path: '/candidate/login'})
        },
        logout() {
            this.$q.cookies.remove('token');
            this.$q.cookies.remove('user_id')
            this.$q.cookies.remove('user_type')
            this.$q.cookies.remove('username')
            this.$q.cookies.remove('avatar_url')
            this.$router.push({path: '/'})
            setTimeout(() => {
                this.$router.go(0)
            }, 200)
        },
        toggleDarkMode(isOpen) {
            this.$q.cookies.set('dark_mode', isOpen)
            this.$q.dark.set(isOpen)
        },
        init() {
            if (this.$q.cookies.get('dark_mode') != null) {
                this.$q.dark.set(this.$q.cookies.get('dark_mode'))
                this.darkMode = this.$q.cookies.get('dark_mode')
            }
            if (this.$q.cookies.get('token') != null) {
                this.hasSignedIn = true
                this.model.username = this.$q.cookies.get('username')
                this.model.avatarUrl = getImageUrl(this.$q.cookies.get('avatar_url'))
            }
        },
        toAccountManagement() {
            this.$router.push({path: '/account'})
        }
    },
    mounted() {
        this.init()
    }
}
</script>

<style scoped>

</style>

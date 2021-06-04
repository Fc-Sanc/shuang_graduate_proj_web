<template>
    <q-intersection once
                    transition = "fade"
                    class = "card">
        <q-card class = "q-ma-md shadow-6 ">
            <q-slide-item
                left-color = "warning" right-color = "secondary"
                @left = "favorite" @right = "applyForJob">
                <template v-slot:left>
                    <q-icon name = "favorite"/>
                    收藏职位
                </template>
                <template v-slot:right>
                    发送申请
                    <q-icon name = "local_post_office"/>
                </template>

                <q-item clickable v-ripple
                        @click = "detailDialog = true"
                        class = "q-pa-md column">

                    <q-item-section avatar>
                        <q-avatar rounded
                                  size = "80px">
                            <q-img alt = "avatar" :src = "model.imageUrl" ratio = "1"/>
                        </q-avatar>
                    </q-item-section>

                    <q-item-section>
                        <q-item-label class = "q-my-sm">
                            <div class = "text-h6 text-left text-bold">
                                {{ model.name }} - {{ model.company.name }}
                            </div>
                        </q-item-label>
                        <q-item-label class = "q-my-sm">
                            {{ model.company.location }} {{ model.timeShown }} {{ model.resting }}
                        </q-item-label>
                        <q-item-label class = "q-my-sm text-body1 text-weight-bold text-left text-secondary text-right">
                            {{ model.salaryShown }}
                        </q-item-label>
                        <q-item-label class = "q-my-sm">
                            <q-chip outline dense color = "primary" class = "glossy">
                                <q-avatar size = "20px">
                                    <q-img alt = "avatar" :src = "model.humanResource.avatarUrl" ratio = "1"/>
                                </q-avatar>
                                <div class = "text-body1 text-left">
                                    HR: {{ model.humanResource.name }}·{{ model.humanResource.postName }}
                                </div>
                            </q-chip>
                        </q-item-label>
                    </q-item-section>


                </q-item>
            </q-slide-item>

            <q-dialog
                v-model = "detailDialog">
                <PostDetailBox :post = "model"/>
            </q-dialog>


        </q-card>
    </q-intersection>
</template>

<script>
import PostDetailBox from "components/PostDetailBox";
import {api} from "assets/js/api";
import {fetch_post_json_body} from "assets/js/method/fetch_extension";

export default {
    name: "PostBox",
    components: {PostDetailBox},
    data() {
        return {
            model: {},
            detailDialog: false,
            isLikedLoading: false,
            hrDialog: false,
            api: {
                apply: api.post.apply(),
            }
        }
    },
    props: {
        post: {
            type: Object
        }
    },
    methods: {
        init() {
            this.model = this.post
        },
        favorite({reset}) {
            this.$q.notify('favorite triggered.')
            this.isLikedLoading = true
            setTimeout(() => {
                this.isLikedLoading = false
                this.model.isLiked = !this.model.isLiked
            }, 500)
            this.finalize(reset)
        },

        applyForJob({reset}) {
            this.api.apply.body.candidateId = this.$q.cookies.get('user_id')
            this.api.apply.body.postId = this.model.id
            this.$q.loadingBar.start()
            fetch_post_json_body(this.api.apply.url, {body: JSON.stringify(this.api.apply.body)}).then(result => {
                if (result.data) {
                    this.$q.notify({
                        message: '申请成功，请耐心等待HR回应', color: 'secondary',
                        timeout: 1000, progress: true
                    })
                } else {
                    this.$q.notify({
                        message: '您已申请过该职位，请耐心等待HR回应', color: 'warning',
                        timeout: 1000, progress: true
                    })
                }
                this.$q.loadingBar.stop()
            })
            this.finalize(reset)
        },

        finalize(reset) {
            this.timer = setTimeout(() => {
                reset()
            }, 1000)
        }
    },
    mounted() {
        this.init()
    }
}
</script>

<style scoped>
.card {
    width: 25%;
}

.dialog {
    width: 80vw;
    height: 80vh;
}

</style>

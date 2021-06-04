<template>
    <q-card class = "dialog q-pa-md">
        <q-card-section
            style = "height: 8vh"
            class = "row items-center">
            <div class = "text-h6">职位详情</div>
            <q-space/>
            <q-btn flat round v-close-popup
                   icon = "close"/>
        </q-card-section>

        <q-separator/>

        <q-card-section>
            <q-card-section
                class = "row items-center justify-evenly">
                <q-avatar rounded size = "100px">
                    <q-img ratio = "1"
                           :src = "model.imageUrl">
                    </q-img>
                </q-avatar>
                <q-item class = "column">
                    <div class = "text-h6 text-primary text-weight-bold">
                        {{ model.name }}
                    </div>
                    <q-space/>
                    <div class = "text-body1 text-secondary">
                        {{ model.salaryShown }}
                    </div>
                </q-item>
            </q-card-section>
            <q-card-section>
                <div class = "text-body2 text-grey-8">
                    发布时间: {{ model.releaseTime }}
                </div>
            </q-card-section>
            <q-card-section class = "row items-center">
                <div class = "text-body1 q-mr-sm">
                    <q-icon name = "place" size = "sm"/>
                    {{ model.location }}
                </div>
                <div class = "text-body1 q-mr-sm">
                    <q-icon name = "schedule" size = "sm"/>
                    {{ model.timeShown }}
                </div>
                <div class = "text-body1 q-mr-sm">
                    <q-icon name = "local_cafe" size = "sm"/>
                    {{ model.resting }}
                </div>
            </q-card-section>

            <q-card-section v-if = "model.humanResource">
                <q-card style = "width: 100%">
                    <q-item clickable v-ripple
                            @click = "hrDialog = true"
                            class = "row items-center">
                        <q-avatar class = "q-mr-md">
                            <q-img ratio = "1"
                                   :src = "model.humanResource.avatarUrl"/>
                        </q-avatar>

                        <div class = "column">
                            <div>{{ model.humanResource.name }}</div>
                            <div class = "row">
                                {{ model.company.name }} · {{ model.humanResource.postName }}
                            </div>
                        </div>

                        <q-space/>

                        <q-icon name = "keyboard_arrow_right" size = "md" color = "grey"/>
                    </q-item>
                </q-card>
            </q-card-section>

            <q-separator/>

            <q-card-section class = "column">
                <div class = "text-h6 q-mb-md text-weight-bold">
                    职位详情
                </div>
                <div class = "text-body1">
                    {{ model.desc }}
                </div>
            </q-card-section>
            <q-separator/>

            <q-card-actions align = "right">
                <q-btn
                    :flat = "!model.isLiked"
                    color = "warning"
                    :icon = "model.isLiked ? 'done' : 'star'" :loading = "isLikedLoading"
                    @click = "favorite"
                    class = "q-px-md q-mt-sm q-py-sm shadow-6"/>
                <q-space/>
                <q-btn icon = "chat" label = "立即沟通" color = "primary"
                       style = "width: 80%"
                       class = "q-mt-sm q-py-sm shadow-6"/>
            </q-card-actions>
        </q-card-section>

        <q-dialog v-if = "model.humanResource" v-model = "hrDialog">
            <HRBox :hr-id = "model.humanResource.id" class = "dialog"/>
        </q-dialog>
    </q-card>
</template>

<script>
import HRBox from "components/HRBox";

export default {
    name: "PostDetailBox",
    components: {HRBox},
    data() {
        return {
            model: {},
            detailDialog: false,
            isLikedLoading: false,
            hrDialog: false,
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
        showDetailDialog() {
            this.detailDialog = true
        },
        favorite() {
            this.$q.notify('favorite triggered.')
            this.isLikedLoading = true
            setTimeout(() => {
                this.isLikedLoading = false
                this.model.isLiked = !this.model.isLiked
            }, 500)
        },

        applyForJob({reset}) {
            this.$q.notify('apply triggered.')
            this.finalize(reset)
        },

    },
    mounted() {
        this.init()
    }
}
</script>

<style scoped>

.dialog {
    width: 80vw;
    height: 80vh;
}

</style>

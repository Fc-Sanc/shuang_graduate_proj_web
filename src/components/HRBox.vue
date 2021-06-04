<template>
    <q-card class = "q-pa-md">

        <q-card-section
            style = "height: 8vh"
            class = "row items-center">
            <div class = "text-h6">人事详情</div>
            <q-space/>
            <q-btn flat round v-close-popup
                   icon = "close"/>
        </q-card-section>

        <q-separator/>

        <q-card-section class = "row items-center">
            <q-avatar size = "80px"
                      class = "q-mr-md">
                <q-img ratio = "1"
                       :src = "model.avatarUrl"/>
            </q-avatar>

            <div class = "column">
                <div class = "text-body1">{{ model.name }}</div>
                <div class = "row">
                    {{ model.company.name }} · {{ model.postName }}
                </div>
            </div>

            <q-dialog v-model = "dialog.company">
                <CompanyBox :company = "model.company"/>
            </q-dialog>
        </q-card-section>

        <q-card-section>
            <q-card style = "width: 100%">
                <q-item clickable v-ripple
                        @click = "dialog.company = true"
                        class = "row items-center">
                    <q-avatar class = "q-mr-md">
                        <q-img ratio = "1"
                               :src = "model.company.logoUrl"/>
                    </q-avatar>

                    <div class = "column">
                        <div>{{ model.company.name }}</div>
                        <div class = "row">
                            {{ model.company.location }} · {{ model.company.headCount }}人
                        </div>
                    </div>

                    <q-space/>

                    <q-icon name = "keyboard_arrow_right" size = "md" color = "grey"/>
                </q-item>
            </q-card>
        </q-card-section>

        <q-separator/>

        <q-card-section class = "column">
            <q-tabs dense inline-label outside-arrows mobile-arrows
                    v-model = "tab.crtTab"
                    align = "left" indicator-color = "primary">
                <q-tab v-for = "tab in tab.tabs" :key = "tab"
                       :name = "tab" :label = "tab"/>
            </q-tabs>

            <q-tab-panels animated
                          v-model = "tab.crtTab">
                <q-tab-panel :name = "tab.tabs[0]">
                    <div class = "text-h6 q-mb-md text-weight-bold">人事介绍</div>
                    <div class = "text-body1">{{ model.introduction }}</div>
                </q-tab-panel>
                <q-tab-panel :name = "tab.tabs[1]">
                    <q-list>
                        <q-card v-for = "post in model.posts" :key = "post.id"
                                class = "q-mb-md">
                            <q-item clickable v-ripple
                                    @click = "dialog.postDetail = true">
                                <q-item-section>
                                    <q-avatar rounded>
                                        <q-img :src = "post.imageUrl"/>
                                    </q-avatar>
                                </q-item-section>

                                <q-item-section>
                                    <q-item-label>
                                        {{ post.name }}
                                    </q-item-label>
                                    <q-item-label>
                                        {{ post.salaryShown }}
                                    </q-item-label>
                                </q-item-section>
                            </q-item>

                            <q-dialog v-model = "dialog.postDetail">
                                <PostDetailBox :post = "post"/>
                            </q-dialog>
                        </q-card>
                    </q-list>
                </q-tab-panel>
            </q-tab-panels>
        </q-card-section>
    </q-card>
</template>

<script>
import {api} from "assets/js/api";
import {fetch_get} from "assets/js/method/fetch_extension";
import {HRModel} from "assets/js/viewModel/HRModel";
import PostDetailBox from "components/PostDetailBox";
import CompanyBox from "components/CompanyBox";

export default {
    name: "HRBox",
    components: {CompanyBox, PostDetailBox},
    data() {
        return {
            model: {
                id: 0,
                name: '',
                email: '',
                postName: '',
                avatarUrl: '',
                introduction: '',
                posts: [],
                company: {}
            },
            api: {
                getHRById: api.hr.getById(this.hrId)
            },
            tab: {
                crtTab: '介绍',
                tabs: ['介绍', '发布中的岗位']
            },
            dialog: {
                company: false,
                postDetail: false
            }
        }
    },
    props: {
        hrId: {
            type: Number
        }
    },
    methods: {
        init() {
            fetch_get(this.api.getHRById.url).then(result => {
                this.model = HRModel(result.data)
                console.log(this.model)
            })
        }
    },
    mounted() {
        this.init()
    }
}
</script>

<style scoped>


</style>

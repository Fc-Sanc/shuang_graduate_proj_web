<template>
    <q-page>
        <q-tabs v-model = "tab.crtTab"
                indicator-color = "primary" align = "justify"
                @input = "val => getAPage(val)">
            <q-tab name = "all" icon = "apps" label = "全部职位"/>
            <q-tab name = "type" icon = "class" label = "分类"/>
            <q-tab name = "fav" icon = "star" label = "收藏"/>
        </q-tabs>

        <q-tab-panels animated
                      v-model = "tab.crtTab"
                      class = "q-mx-md">
            <q-tab-panel name = "all">
                <div class = "row justify-center q-ma-md">
                    <PostBox v-for = "model in page.models" :key = "model.id" :post = "model"/>
                </div>
                <div class = "row justify-center">
                    <q-pagination boundary-numbers boundary-links direction-links
                                  v-model = "page.currentPage"
                                  :max = "page.totalPages" :max-pages = "6"
                                  @input = "val => getPage(val, 'all')"
                                  class = "q-ma-md"/>
                </div>
            </q-tab-panel>

            <q-tab-panel name = "type">
                <q-tabs dense inline-label outside-arrows mobile-arrows
                        v-model = "tab.crtType" @input = "getPage(1, tab.crtType)"
                        indicator-color = "secondary">
                    <q-tab v-for = "type in tab.types" :key = "type.id"
                           :name = "type.id" :label = "type.name"/>
                </q-tabs>

                <q-tab-panels animated
                              v-model = "tab.crtType">
                    <q-tab-panel v-for = "type in tab.types" :key = "type.id"
                                 :name = "type.id">
                        <div class = "row justify-center q-ma-md">
                            <PostBox v-for = "model in page.models" :key = "model.id" :post = "model"/>
                        </div>
                        <div class = "row justify-center">
                            <q-pagination boundary-numbers boundary-links direction-links
                                          v-model = "page.currentPage"
                                          :max = "page.totalPages" :max-pages = "6"
                                          @input = "val => getPage(val, tab.crtType)"
                                          class = "q-ma-md"/>
                        </div>
                    </q-tab-panel>

                </q-tab-panels>
            </q-tab-panel>

            <q-tab-panel name = "fav">
                <div class = "row justify-center q-ma-md">
                    <PostBox v-for = "model in page.models" :key = "model.id" :post = "model"/>
                </div>
                <div class = "row justify-center">
                    <q-pagination boundary-numbers boundary-links direction-links
                                  v-model = "page.currentPage"
                                  :max = "page.totalPages" :max-pages = "6"
                                  @input = "val => getPage(val, 'all')"
                                  class = "q-ma-md"/>
                </div>
            </q-tab-panel>
        </q-tab-panels>
    </q-page>
</template>

<script>
import {api} from "assets/js/api";
import {fetch_get} from "assets/js/method/fetch_extension";
import {PostModel} from "assets/js/viewModel/PostModel";
import PostBox from "components/PostBox";
import {QSpinnerGrid} from "quasar";

export default {
    name: "PostPage",
    components: {PostBox},
    data() {
        return {
            tab: {
                crtTab: 'all',
                crtType: '',
                types: []
            },
            page: {
                models: [],
                currentPage: 1,
                totalPages: 10,
                pageSize: 10
            },
            api: {
                getPosts: api.post.getPosts(),
                getPostTypes: api.postType.getAll()
            }
        }
    },
    methods: {
        init() {
            this.getAll(1)
            this.getPostTypes()
        },
        getAPage(tab) {
            switch (tab) {
                case 'type':
                    this.getPostTypes()
                    this.getPage(1, this.tab.crtType)
                    break
                case 'fav':
                    this.getFav(1)
                    break
                case 'all':
                default:
                    this.getAll(1)
                    break
            }
        },
        getAll(page) {
            this.getPage(page, 'all')
        },
        getPage(page, type) {
            this.$q.loading.show({
                spinner: QSpinnerGrid,
                spinnerColor: 'primary',
                spinnerSize: 140,
                message: 'Hang on...',
                messageColor: 'black'
            })
            this.api.getPosts = api.post.getPosts(page - 1, this.page.pageSize, type)
            fetch_get(this.api.getPosts.url).then(result => {
                let data = result.data
                this.page.currentPage = data["crt_page"] + 1
                this.page.totalPages = data["total_pages"]
                this.page.models = []
                let posts = data.content
                console.log(posts)
                for (let index in posts) {
                    if (posts.hasOwnProperty(index)) {
                        this.page.models.push(PostModel(posts[index]))
                        this.page.models.push(PostModel(posts[index]))
                        this.page.models.push(PostModel(posts[index]))
                        this.page.models.push(PostModel(posts[index]))
                        this.page.models.push(PostModel(posts[index]))
                        this.page.models.push(PostModel(posts[index]))
                        this.page.models.push(PostModel(posts[index]))
                        this.page.models.push(PostModel(posts[index]))
                        this.page.models.push(PostModel(posts[index]))
                        this.page.models.push(PostModel(posts[index]))
                    }
                }
                setTimeout(() => {
                    this.$q.loading.hide()
                }, 1000)
            })
        },
        getFav(page) {
            this.getPage(page, 'all')
        },
        getPostTypes() {
            fetch_get(this.api.getPostTypes.url).then(result => {
                this.tab.types = result.data
                this.tab.crtType = result.data[0].id
            })
        },
    },
    mounted() {
        this.init()
    }
}
</script>

<style scoped>

</style>

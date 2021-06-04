<template>
    <q-page>
        account
    </q-page>
</template>

<script>
import {api} from "assets/js/api";
import {Cookies} from "quasar";
import {fetch_get} from "assets/js/method/fetch_extension";

export default {
    name: "CandidateAccountPage",
    data() {
        return {
            api: {
                getRequiringPosts: api.post.get_requiring_posts_by_candidate_id(Cookies.get('user_id'))
            },
        }
    },
    methods: {
        init() {
            this.getPosts()
        },
        getPosts() {
            fetch_get(this.api.getRequiringPosts.url).then(result => {
                console.log(result)
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

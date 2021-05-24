<template>
    <q-card class = "q-ma-md shadow-10">
        <q-item clickable v-ripple class = "q-pa-sm">
            <q-item-section avatar>
                <q-avatar size = "80px">
                    <img alt = "avatar" src = "../assets/images/img_1.png" style = "object-fit: fill;"/>
                </q-avatar>
            </q-item-section>

            <q-item-section>
                <q-item-label>
                    <div class = "text-h6 text-left text-bold">{{ model.post_name }}</div>
                </q-item-label>
                <q-item-label>
                    <q-chip outline dense color = "primary" class = "glossy">
                        <q-avatar size = "20px">
                            <img alt = "avatar" src = "../assets/images/img.png" style = "object-fit: fill;"/>
                        </q-avatar>
                        <div class = "text-body1 text-left">HR: {{ model.hr }}·{{ model.hr_post }}</div>
                    </q-chip>
                </q-item-label>
                <q-item-label>
                    {{ model.company }} {{ model.location }}
                </q-item-label>
            </q-item-section>

            <q-item-section>
                <q-item class = "text-body1 text-left text-secondary">{{ model.salary }}</q-item>
            </q-item-section>

            <q-item-section>
                <q-btn color = "secondary" class = "q-mr-md text-body2 text-left text-white">APPLY NOW!</q-btn>
            </q-item-section>

            <q-item-section side>
                <q-btn ref = "btn_dislike" round color = "negative"
                       class = "q-mr-md text-body2 text-left text-white"
                       icon = "mood_bad" @click = "dislike"/>
            </q-item-section>

        </q-item>

        <q-dialog persistent v-model = "model.show_dialog">
            <q-card style = "width: 350px">
                <q-card-section class = "row items-center">
                    <span class = "q-ml-sm">不喜欢？我们可以为您暂时删除这条数据</span>
                </q-card-section>
                <q-separator/>
                <q-card-actions align = "right">
                    <q-btn outline label = "不，留着吧" color = "grey" v-close-popup/>
                    <q-btn icon = "delete" label = "删掉" color = "negative" v-close-popup/>
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-card>
</template>

<script>
export default {
    name: "Post",
    data() {
        return {
            model: {
                post_name: '干架师',
                avatar_url: '',
                salary: '10k~15k · 14薪',
                company: '嶋野组',
                hr: '真岛吾朗',
                hr_post: '若头, 嶋野的狂犬',
                location: '日本·神室町',
                show_dialog: false
            }
        }
    },
    methods: {
        dislike() {
            this.model.show_dialog = true
            console.log('dislike touched')
        }
    }
}
</script>

<style scoped>

</style>

<template>
    <div>
        <q-separator v-if = "split"></q-separator>
        <q-item
            v-if = "!split"
            clickable
            tag = "a"
            target = "_blank"
            @click = "toNextPage(link)"
        >
            <q-item-section
                v-if = "icon"
                avatar
            >
                <q-icon :name = "icon"/>
            </q-item-section>

            <q-item-section>
                <q-item-label class = "text-weight-bold">{{ title }}</q-item-label>
                <q-item-label caption>
                    {{ caption }}
                </q-item-label>
            </q-item-section>
        </q-item>
    </div>
</template>

<script>
export default {
    name: 'NaviLinkItem',
    props: {
        title: {
            type: String,
            default: ''
        },
        caption: {
            type: String,
            default: ''
        },
        link: {
            type: String,
            default: '#'
        },
        icon: {
            type: String,
            default: ''
        },
        split: {
            type: Boolean,
            default: false
        }
    },
    // inject: ['reload'],
    methods: {
        toNextPage(path) {
            if (path.startsWith('http')) { // from outside
                window.open(path, '_blank')
            } else {
                this.$router.push({path})
                // this.reload()
            }
        }
    }
}
</script>

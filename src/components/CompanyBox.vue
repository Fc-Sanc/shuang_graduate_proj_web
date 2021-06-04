<template>
    <q-card class = "dialog q-pa-md">

        <q-card-section
            style = "height: 8vh"
            class = "row items-center">
            <div class = "text-h6">公司详情</div>
            <q-space/>
            <q-btn flat round v-close-popup
                   icon = "close"/>
        </q-card-section>

        <q-separator/>

        <q-card-section class = "row items-center">
            <q-avatar size = "80px"
                      class = "q-mr-md">
                <q-img ratio = "1"
                       :src = "model.logoUrl"/>
            </q-avatar>

            <div class = "column">
                <div class = "text-body1">{{ model.name }}</div>
                <div class = "row">
                    {{ model.companyType.name }} · {{ model.location }} · {{ model.headCount }}人
                </div>
            </div>


        </q-card-section>

        <q-separator/>

        <q-card-section>
            <div class = "text-h6 q-mb-md text-weight-bold">公司介绍</div>
            <div class = "text-body1">{{ model.introduction }}</div>
        </q-card-section>
    </q-card>
</template>

<script>
export default {
    name: "CompanyBox",
    data() {
        return {
            model: {}
        }
    },
    props: {
        company: {
            type: Object
        }
    },
    methods: {
        init() {
            this.model = this.company
        }
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

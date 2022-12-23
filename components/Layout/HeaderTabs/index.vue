<template>
    <v-tabs class="tabs__header ma-0 pa-0">
        <v-tab v-for="(item, index) in data" :key="index" @click.native="handleClick(item.value)">{{ item.title }}</v-tab>
    </v-tabs>
</template>

<script>
export default {
    props: { data: Object },
    data() {
        return {
            tab_val: 'all',
        }
    },
    methods: {
        handleClick(payload) {
            this.tab_val = payload
            this.$emit('tabValue', this.tab_val)
        },
    }
}
</script>

<style>

</style>
<template>
  <v-menu
    transition="slide-y-transition"
    rounded="lg"
    offset-y
    >
    <template v-slot:activator="{ attrs, on }">
        <v-btn
        class="tall__btn"
        color="primary"
        outlined
        v-bind="attrs"
        v-on="on"
        >
        <div class="flex_row justify-space-around">
            <NDProfile />
            <span class="n_text text--text mx-2">NathanDigital</span>
            <LightArrow style="max-width: 10px;"/>
        </div>
        </v-btn>
    </template>
    <v-list>
        <v-list-item
        v-for="(item, index) in accounts"
        :key="index"
        link
        >
        <v-list-item-title class="flex_row">
            <v-avatar size="25" color="#EDEEF2" v-if="item.name=='Add New'">
            <v-icon color="subtext" x-small>fa-plus</v-icon>
            </v-avatar>
            <NDProfile v-else />
            <span class="n_text text--text ml-2">{{ item.name }}</span>
        </v-list-item-title>
        </v-list-item>
    </v-list>
    </v-menu>
</template>

<script>
import NDProfile from '@/assets/images/DashboardLayout/NathanDigital-profilepic.svg'
import LightArrow from '@/assets/images/Light-Arrow-icon.svg'

export default {
    props: {
        accounts: Array
    },
    data() {
        return {

        }
    },
    components: { NDProfile, LightArrow }

}
</script>

<style>

</style>
<template>
    <div class="flex_row">
        <v-card color='card_bg'  class="totals_card flex_column" v-for="item in data" :key="item.name">
            <span class="subtext--text">{{ item.name }}</span>
            <h1 class="pt-2"><h1 class="ma-0 pa-0 d-inline subtext--text font-weight-thin pr-1">AED</h1>{{ item.amount }}</h1>
        </v-card>
    </div>
</template>

<script>
import '@/assets/scss/utils/Cards/_totalsCard.scss'
export default {
    props: { data: Array },
}
</script>

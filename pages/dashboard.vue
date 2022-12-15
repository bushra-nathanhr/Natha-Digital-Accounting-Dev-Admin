<template>
  <v-row class="">

    <!-- ROW-1 -->
    <v-row>

      <!-- overview -->
      <v-col sm="12" md="6" lg="4">
        <v-card id="card">
          <v-card-title id="card-title">
            <h4>Overview</h4>
            <div class="flex_row justify-space-between">
              <v-btn class="short__btn mr-2" outlined>Month</v-btn>
              <v-btn class="short__btn" color="primary">Year</v-btn>
            </div>
          </v-card-title>
          <v-card-text id="card-text">
            <div class="overview_total__con">
              <OverviewTotalsViewer :data="overview_data"/>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- alerts -->
      <v-col sm="12" md="6" lg="4">
        <v-card id="card">
          <v-card-title id="card-title">
            <h4>Alerts</h4>
            <div class="flex_row align-start">
              <h5 class="text-text ma-0 pa-0 mr-3">Notify Me</h5>
              <v-switch
              class="ma-0 pa-0"
                  inset
                  color="primary"
                ></v-switch>
            </div>
          </v-card-title>
          <v-card-text id="card-text">
            <div class="alert__con" >
              <div v-for="item in alerts" :key="item.id">
              <div class="flex_row my-2" >
                <RedBellIcon v-if="item.priority == 'High Priority'" />
                <YellowBellIcon v-if="item.priority == 'Low Priority'" />
                <div class="flex_column ml-3">
                  <h5 class="text--text">{{ item.title }}</h5>
                  <span class="text--subtitle pt-1">{{ item.subtitle }}</span>
                </div>
                <v-spacer></v-spacer>
                <p class="red--text">{{ priority }}</p>
              </div>
              <v-divider id="divider" class="ml-9"></v-divider>
            </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>







    </v-row>
  </v-row>
</template>

<script>
import '@/assets/scss/Dashboard/_dashboard.scss'

import RedBellIcon from '@/assets/images/Alerts/red-bell-icon.svg'
import YellowBellIcon from '@/assets/images/Alerts/yellow-bell-icon.svg'

import OverviewTotalsViewer from '@/components/Dashboard/OverviewTotalsViewer/index.vue'


export default {
  layout: 'dashboard',
  components: { 
    OverviewTotalsViewer,
    RedBellIcon,
    YellowBellIcon,
   },
  data() {
    return {
      alerts: [
        { title: 'Receivable Alerts !', subtitle: 'Recievable exceeds 3 months', priority: 'High Priority' },
        { title: 'Overdue Alert', subtitle: 'You have 100k overdue.', priority: 'High Priority' },
        { title: 'Bank Notification', subtitle: 'Monthly service charges', priority: 'Low Priority' },
      ],
      overview_data: [
        { name: 'Total Income', amount: '3,27,970.0', color: 'blue' },
        { name: 'Total Income', amount: '3,27,970.0', color: 'red' },
        { name: 'Total Income', amount: '3,27,970.0', color: 'yellow' },
        { name: 'Total Income', amount: '3,27,970.0', color: 'green' },
        { name: 'Total Income', amount: '3,27,970.0', color: 'yellow' },
        { name: 'Total Income', amount: '3,27,970.0', color: 'blue' },
      ],
    }
  }

}
</script>

<style>

</style>
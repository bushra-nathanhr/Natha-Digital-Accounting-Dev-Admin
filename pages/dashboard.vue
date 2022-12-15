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
            <div class="flex_row">
              <h5 class="text-text ma-0 pa-0 mr-3 pb-4">Notify Me</h5>
              <v-switch
              class="ma-0 pa-0"
                  inset
                  color="primary"
                ></v-switch>
            </div>
          </v-card-title>
          <v-card-text id="card-text" style="margin-top: 20px !important;">
            <div class="alert__con" >
              <div v-for="item in alerts" :key="item.id">
              <div class="flex_row my-3" >
                <RedBellIcon v-if="item.priority == 'High Priority'" />
                <YellowBellIcon v-if="item.priority == 'Low Priority'" />
                <div class="flex_column ml-3">
                  <h5 class="text--text">{{ item.title }}</h5>
                  <span class="text--subtitle pt-1">{{ item.subtitle }}</span>
                </div>
                <v-spacer></v-spacer>
                <p class="accent2--text mb-0" v-if="item.priority=='High Priority'">{{ item.priority }}</p>
                <p class="primary--text mb-0" v-if="item.priority=='Med Priority'">{{ item.priority }}</p>
                <p class="accent3--text mb-0" v-if="item.priority=='Low Priority'">{{ item.priority }}</p>
              </div>
              <v-divider id="divider" class="ml-9"></v-divider>
            </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>


      <!-- Expense Breakdown -->
      <v-col sm="12" md="6" lg="4">
        <v-card id="card">
          <v-card-title id="card-title">
            <h4>Expense Breakdown</h4>
            <div class="flex_row justify-space-between">
              <v-btn class="short__btn mr-2" outlined>Year</v-btn>
            </div>
          </v-card-title>
          <v-card-text id="card-text">
            <div class="ex_br__con flex_row align-center justify-space-around">
              <div style="min-width: 200px; min-height: 200px;"></div>
              <div class="flex_row align-center justify-space-between">
                <div class="dote mr-2" style="min-width: 15px;min-height: 6px;background: #F3654A;border-radius: 3px;"></div>
                <span>text here</span>
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
     Office maintaince - 30%- 5.1k Salary - 102k - 25% DEWA - 10k - 2% Office Rent -10k - 5%
    return {
      breakdown_data: [
        { title: 'Business -35.1k- 30%', color: ''},
      ],
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
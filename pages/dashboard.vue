<template>
  <v-row class="wrapper-row">

    <!-- ROW-1 -->
    <v-row class="row1">

      <!-- Overview -->
      <!-- component: OverviewTotalsViewer  -->
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

      <!-- Alerts -->
      <!-- obj: alerts_data  -->
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
              <div v-for="item in alerts_data" :key="item.id">
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
      <!-- obj: breakdown_data  -->
      <v-col sm="12" md="6" lg="4">
        <v-card id="card">
          <v-card-title id="card-title">
            <h4 class="text--text">Expense Breakdown</h4>
            <div class="flex_row justify-space-between">
              <v-btn class="short__btn mr-2" outlined>Year</v-btn>
            </div>
          </v-card-title>
          <v-card-text id="card-text">
            <div class="ex_br__con flex_row align-center justify-space-around">
              <div style="min-width: 100px; min-height: 100px;"></div>
              <div class="flex_column">
                <div class="flex_row align-center pa-2" v-for="item in breakdown_data" :key="item.id">
                  <div :class="item.color" class="dote mr-2" style="min-width: 15px;min-height: 6px;border-radius: 3px;"></div>
                  <span class="subtext--text">{{ item.name }} - {{ item.amount }} - {{ item.percentage }}%</span>
                </div>
            </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>

    <!-- ROW-2 -->
    <v-row class="row2">

      <!-- Unpaid Invoice -->
      <!-- obj: unpaid_invoice_data  -->
      <v-col sm="12" md="6" lg="4">
        <v-card id="card">
          <v-card-title id="card-title">
            <h4>Unpaid Invoice</h4>
            <div class="flex_row justify-space-between">
              <v-btn class="short__btn mr-2" outlined>Month</v-btn>
              <v-btn class="short__btn" color="primary">Year</v-btn>
            </div>
          </v-card-title>
          <v-card-text id="card-text">
            <div class="unpaid_invoice__con flex_column">
              <div class="flex_row justify-space-between">
                <h5 class="text--text">Last 365days</h5>
                <h4 class="text--text">AED {{ unpaid_invoice_data.last365Days }}</h4>
              </div>
              <div class="mt-5 flex_row justify-space-between">
                <div class="flex_column justify-start">
                  <span class="caption subtext--text">Overdue</span>
                  <h5 class="text--text">AED {{ unpaid_invoice_data.overDue }}</h5>
                </div>
                <div class="flex_column justify-start">
                  <span class="caption subtext--text">Not due yet</span>
                  <h5 class="text--text">AED {{ unpaid_invoice_data.notDueYet }}</h5>
                </div>
              </div>
              <div class="graph__con mt-9">
                <div style="background: #E2E7F1; min-width: 85%; min-height: 50px;border-radius: 10px;">
                  <div style="background: #F3654A; max-width: 80%; min-height: 50px;border-radius: 10px;"/>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Paid Invoice -->
      <!-- obj: paid_invoice_data  -->
      <v-col sm="12" md="6" lg="4">
        <v-card id="card">
          <v-card-title id="card-title">
            <h4>Paid Invoice</h4>
            <div class="flex_row justify-space-between">
              <v-btn class="short__btn mr-2" outlined>Month</v-btn>
              <v-btn class="short__btn" color="primary">Year</v-btn>
            </div>
          </v-card-title>
          <v-card-text id="card-text">
            <div class="unpaid_invoice__con flex_column">
              <div class="flex_row justify-space-between">
                <h5 class="text--text">Last 30days</h5>
                <h4 class="text--text">AED {{ paid_invoice_data.last30Days }}</h4>
              </div>
              <div class="mt-5 flex_row justify-space-between">
                <div class="flex_column justify-start">
                  <span class="caption subtext--text">Not Deposited</span>
                  <h5 class="text--text">AED {{ paid_invoice_data.notDeposited }}</h5>
                </div>
                <div class="flex_column justify-start">
                  <span class="caption subtext--text">Deposited</span>
                  <h5 class="text--text">AED {{ paid_invoice_data.deposited }}</h5>
                </div>
              </div>
              <div class="graph__con mt-9">
                <div style="background: #E2E7F1; min-width: 85%; min-height: 50px;border-radius: 10px;">
                  <div style="background: #1AD598; max-width: 40%; min-height: 50px;border-radius: 10px;"/>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Total Revenue by Product -->
      <!-- obj: revenue_data  -->
      <v-col sm="12" md="6" lg="4">
        <v-card id="card">
          <v-card-title id="card-title">
            <h4 class="text--text">Total Revenue by Product</h4>
            <div class="flex_row justify-space-between">
              <v-btn class="short__btn mr-2" outlined>Year</v-btn>
            </div>
          </v-card-title>
          <v-card-text id="card-text">
            <div class="ex_br__con flex_row align-center justify-space-around">
              <div style="min-width: 100px; min-height: 100px;"></div>
              <div class="flex_column">
                <div class="flex_row align-center pa-2" v-for="item in revenue_data" :key="item.id">
                  <div :class="item.color" class="dote mr-2" style="min-width: 15px;min-height: 6px;border-radius: 3px;"></div>
                  <span class="subtext--text">{{ item.name }} - {{ item.percentage }}% </span>
                </div>
            </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>

    <!-- ROW-3 -->
    <v-row class="row3">

      <!-- Top 5 Customers by over due amount -->
      <!-- obj: customers_by_overdue -->
      <v-col sm="12" md="8" lg="8">
        <v-card id="card">
          <v-card-title id="card-title">
            <h4>Top 5 Customers by over due amount</h4>
          </v-card-title>
          <v-card-text id="card-text">
            <div class="name__con">
              <v-simple-table class="customersByOverDueAmount__table">
                <template v-slot:default>
                  <thead class="customersByOverDueAmount__thead">
                    <tr class="customersByOverDueAmount__tr">
                      <th class="customersByOverDueAmount__th text-left text--text h6 pr_5">
                        Customer<br/>Name
                      </th>
                      <th class="customersByOverDueAmount__th text-left text--text h6 pr_5">
                        Balance<br/>Due
                      </th>
                      <th class="customersByOverDueAmount__th text-left text--text h6 pr_5">
                        Within<br/>Due
                      </th>
                      <th class="customersByOverDueAmount__th text-left text--text h6 pr_5">
                        Over<br/>Due
                      </th>
                      <th class="customersByOverDueAmount__th text-left text--text h6">
                        Due<br/>Invoices
                      </th>
                      <th class="customersByOverDueAmount__th text-right text--text h6 credit_limit__con">
                        Above Credit<br/>Limit
                      </th>
                    </tr>
                    <div class="my-4"></div>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in customers_by_overdue" :key="index" class="ma-0 pa-0">
                      <td class="customersByOverDueAmount__td text-left text--text h6">{{ item.c_name }}</td>
                      <td class="customersByOverDueAmount__td text-left text--text pr_5 balance_due__td">
                        <div class="progress_bar__con">
                          <div class="progress_bar__line">
                            <span class="text--text txt_inside_pbl">AED{{ item.balance_due }}</span>
                          </div>
                        </div>
                      </td>
                      <td class="customersByOverDueAmount__td text-left text--text pr_5">{{ item.within_due }}</td>
                      <td class="customersByOverDueAmount__td text-left text--text pr_5">{{ item.over_due }}</td>
                      <td class="customersByOverDueAmount__td text-left text--text ">{{ item.due_invoice }}</td>
                      <td class="customersByOverDueAmount__td text-right text--text">{{ item.above_credit_limit }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table> 
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      
      <!-- Age analysis of due balance -->
      <!-- obj:  -->
      <v-col sm="12" md="4" lg="4">
        <v-card id="card">
          <v-card-title id="card-title">
            <h4>Age analysis of due balance</h4>
          </v-card-title>
          <v-card-text id="card-text">
            <div class="age_graph__con mt-5">
              <LineGraph />
              <v-divider id="divider"></v-divider>
              <div class="age_graph__titles flex_row justify-space-around mt-2">
                <span class="caption">Title</span>
                <span class="caption">Title</span>
                <span class="caption">Title</span>
                <span class="caption">Title</span>
                <span class="caption">Title</span>
              </div>
              </div>
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>

    <!-- ROW-4 -->
    <v-row class="row4" style="min-height: 900px"></v-row>

  </v-row>
</template>

<script>
import '@/assets/scss/Dashboard/_dashboard.scss'
import '@/assets/scss/utils/Tables/_customersByOverDueAmount.scss'

import RedBellIcon from '@/assets/images/Alerts/red-bell-icon.svg'
import YellowBellIcon from '@/assets/images/Alerts/yellow-bell-icon.svg'

import OverviewTotalsViewer from '@/components/Dashboard/OverviewTotalsViewer/index.vue'
import LineGraph from '@/components/Graphs/LineGraph/index.vue'


export default {
  layout: 'dashboard',
  components: { 
    OverviewTotalsViewer,
    RedBellIcon,
    YellowBellIcon,
    LineGraph
   },
  data() {
    return {
      customers_by_overdue: [
        { c_name:'Massive Dynamic', balance_due: '23,785', within_due: '1/2/2023', over_due: '1,25,489', due_invoice: '13', above_credit_limit: 'Yes' },
        { c_name:'Massive Dynamic', balance_due: '23,785', within_due: '1/2/2023', over_due: '1,25,489', due_invoice: '13', above_credit_limit: 'Yes' },
        { c_name:'Massive Dynamic', balance_due: '23,785', within_due: '1/2/2023', over_due: '1,25,489', due_invoice: '13', above_credit_limit: 'Yes' },
        { c_name:'Massive Dynamic', balance_due: '23,785', within_due: '1/2/2023', over_due: '1,25,489', due_invoice: '13', above_credit_limit: 'Yes' },
        { c_name:'Massive Dynamic', balance_due: '23,785', within_due: '1/2/2023', over_due: '1,25,489', due_invoice: '13', above_credit_limit: 'Yes' },
      ],
      revenue_data: [
        { name: 'ERP', percentage: '50', color: 'accent2'},
        { name: 'ATS', percentage: '23', color: 'primary'},
        { name: 'CRM', percentage: '20', color: 'accent1'},
        { name: 'Accounting', percentage: '10', color: 'accent4'},
        { name: 'Others', percentage: '1', color: 'accent3'},
      ],
      paid_invoice_data: { last30Days: '38,058', notDeposited: '8,785', deposited: '18,522.2' },
      unpaid_invoice_data: { last365Days: '328,137', overDue: '440,652', notDueYet: '2541.20' },
      breakdown_data: [
        { name: 'Business', amount: '35.1k', percentage: '43', color: 'accent2'},
        { name: 'Office maintaince', amount: '5.1k', percentage: '30', color: 'primary'},
        { name: 'Salary', amount: '102k', percentage: '25', color: 'accent4'},
        { name: 'DEWA', amount: '10k', percentage: '2', color: 'accent1'},
        { name: 'Office Rent', amount: '10k', percentage: '5', color: 'accent3'},
      ],
      alerts_data: [
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
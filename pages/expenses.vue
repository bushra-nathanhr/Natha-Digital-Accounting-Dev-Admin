<template>
  <v-row class="wrapper_row">


    <!-- SNACKBAR -->
    <v-snackbar v-show="snackbar_data.snackbar" class="snackbar" :timeout="snackbar_data.timeout" v-model="snackbar_data.snackbar" top min-width="100%" min-height="30px" rounded="0" elevation="0" :color="snackbar_data.color">
      <div>
        <v-icon small color="white" v-if="snackbar_data.color=='success'">fa-check</v-icon>
        <v-icon small color="error" v-else>fa-close</v-icon>
        <span class="text_light--text ml-3">{{ snackbar_data.text }}</span>
      </div>
    </v-snackbar>


    
    <!-- FILTER DIALOG -->
    <v-dialog id="custom_dialog" v-model="filterDialog" persistent max-width="500px">
      <v-card id="card" style="padding: 20px 30px !important">
        <v-card-title id="card-title">
            <h4 class="text--text">Filter</h4>
            <v-icon small color="subtext" class="ml-5" @click="filterDialog=false">fa-close</v-icon>
        </v-card-title>
        <v-card-text id="card-text">
          <v-container class="ma-0 pa-0">
              <v-radio-group v-model="radioGroup">
              <v-radio value="all">
                  <template v-slot:label>
                    <span class="text--text">All</span>
                  </template>
              </v-radio>
              <v-radio value="week">
                  <template v-slot:label>
                    <span class="text--text">Week to date</span>
                  </template>
              </v-radio>
              <v-radio value="month">
                  <template v-slot:label>
                    <span class="text--text">This month to date</span>
                  </template>
              </v-radio>
              <v-radio value="quarter">
                  <template v-slot:label>
                    <span class="text--text">This quarter to date</span>
                  </template>
              </v-radio>
              <v-radio value="year">
                  <template v-slot:label>
                    <span class="text--text">This year to date</span>
                  </template>
              </v-radio>
              <v-radio value="specific">
                <template v-slot:label>
                  <span class="text--text" @click="customDataDisabled=!customDataDisabled">Specific dates</span>
                </template>
              </v-radio>
              </v-radio-group>
              <div class="custom_data">
                <v-row class="ma-0 pa-0">
                  <v-spacer></v-spacer>
                  <v-col cols="8" class="ma-0 pa-0">
                    <div class="flex_row align-baseline ">
                      <span>From</span>
                    <div><v-select :disabled="customDataDisabled" :items="daysOfWeek" placeholder="12" style="max-width: 90px !important" class="ml-9"></v-select></div>
                    <div><v-select :disabled="customDataDisabled" :items="monthsOfYear" placeholder="Jan" style="max-width: 90px !important" class="ml-3"></v-select></div>
                    <div><v-select :disabled="customDataDisabled" :items="Years" placeholder="2022" style="max-width: 120px !important" class="ml-3"></v-select></div>
                    </div>
                  </v-col>
                </v-row>
                <v-row class="ma-0 pa-0">
                  <v-spacer></v-spacer>
                  <v-col cols="8" class="ma-0 pa-0">
                    <div class="flex_row align-baseline ">
                      <span>Till</span>
                    <div><v-select :disabled="customDataDisabled" :items="daysOfWeek" placeholder="14" style="max-width: 90px !important" class="ml-9"></v-select></div>
                    <div><v-select :disabled="customDataDisabled" :items="monthsOfYear" placeholder="Mar" style="max-width: 90px !important" class="ml-3"></v-select></div>
                    <div><v-select :disabled="customDataDisabled" :items="Years" placeholder="2022" style="max-width: 120px !important" class="ml-3"></v-select></div>
                  </div>
                  </v-col>
                </v-row>
              </div>
              <div class="other_filters mt-2">
                <v-row>
                  <v-col cols="6" class="ma-0 pa-0"><v-checkbox color="primary" label="Customer"></v-checkbox></v-col>
                  <v-col cols="6" class="ma-0 pa-0"><v-select :items="customerFilter" label="All"></v-select></v-col>
                  <v-col cols="6" class="ma-0 pa-0"><v-checkbox color="primary" label="Status"></v-checkbox></v-col>
                  <v-col cols="6" class="ma-0 pa-0"><v-select :items="statusFilter" label="Paid"></v-select></v-col>
                </v-row>
              </div>
              <v-row class="action_btn mt-5">
                <v-col cols="5" class="ma-0 pa-0"><v-btn class="tall__btn" color="subtext" block outlined><span class="primary--text">Clear All</span></v-btn></v-col>
                <v-spacer></v-spacer>
                <v-col cols="6" class="ma-0 pa-0"><v-btn class="tall__btn" color="primary" block @click="handleApplyFilter">Apply</v-btn></v-col>
              </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>


    
    <!-- *** TOTALS CARDS *** -->
    <TotalsCard v-if="currentTab == 'all'" :data="total_expenses" />
    <TotalsCard v-if="currentTab == 'suppliers'" :data="total_suppliers" />
    <TotalsCard v-if="currentTab == 'forecast'" :data="total_forecast" />
    <TotalsCard v-if="currentTab == 'reimbursement'" :data="total_reimbursement" />



    <!-- *** Expense Breakdown *** -->
    <!-- obj: breakdown_data  -->
    <v-col sm="12" md="4" lg="4" v-if="currentTab == 'breakdown'">
      <v-card color='card_bg'  id="card">
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



    <!-- *** MID CARDS *** -->
    <v-row class="mid_row" v-if="currentTab == 'forecast'">

    <v-col sm="12" md="4" lg="4">
      <v-card color="card_bg" id="card">
        <v-card-title id="card-title">
          <h4>Forecasted & Target Sales</h4>
          <div class="flex_row justify-space-between align-center">
            <v-btn class="small__btn" style="border-radius: 5px !important;" color="primary" x-small>M</v-btn>
            <v-btn class="small__btn ml-1" style="border-radius: 5px !important;" outlined color="outline" x-small>W</v-btn>
            <v-btn class="small__btn ml-1" style="border-radius: 5px !important;" outlined color="outline" x-small>Y</v-btn>
          </div>
        </v-card-title>
        <v-card-text id="card-text">
          <div class="flex_row align-center justify-space-around">
            <h5 class="flex_row align-center">
              <div class="dote mr-3 accent2" style="min-width: 5px;max-width: 5px;min-height: 25px;border-radius: 3px;"></div>
              Closed Sales (29)
            </h5>
            <h5 class="flex_row align-center">
              <div class="dote mr-3 primary" style="min-width: 5px;max-width: 5px;min-height: 25px;border-radius: 3px;"></div>
              Forecasted Sales (15)
            </h5>
          </div>
          <div class="graph__con pt-9">
              <div style="background: #E2E7F1; min-width: 85%; min-height: 50px;border-radius: 10px;border: 3px solid #E2E7F1;">
                <div class="flex_row align-center justify-end" style="background: #F3654A; max-width: 80%; min-height: 50px;border-radius: 10px;border: 3px solid #E2E7F1;">
                  <div style="margin-right: -30px;background: yellowgreen; min-width: 50%; min-height: 50px;border-radius: 10px;border: 5px solid yellowgreen;"></div>
                </div>
              </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>


    <v-col sm="12" md="8" lg="8">
      <v-card id="card">
        <v-card-title id="card-title">
          <h4>Sales Forecast</h4>
          <div class="flex_row">
              <div class="flex_row align-center pa-2 mr-2" v-for="item in forecast_titles" :key="item.id">
                <div :class="item.color" class="dote mr-2" style="min-width: 15px;min-height: 6px;border-radius: 3px;"></div>
                <span class="subtext--text">{{ item.name }}</span>
              </div>
          </div>
        </v-card-title>
        <v-card-text id="card-text">
          <!-- chart.js -->
        </v-card-text>
      </v-card>
    </v-col>

    </v-row>



    <!-- *** TABLES *** -->
    <v-row class="row1" v-if="currentTab == 'all'||currentTab == 'suppliers'||currentTab == 'forecast'||currentTab == 'reimbursement'">

      <v-col sm="12" md="12" lg="12">
        <v-card color='card_bg'  id="card">
          <v-card-text id="card-text" style="margin-top: 0 !important;">


            <v-data-table id="ALL_EXPENSES" v-if="currentTab == 'all'"
            class="main__table elevation-0"
            :v-model="expenses_data"
            :headers="expenses_headers"
            :items="expenses_data"
            :search="expenses_search"
            item-key="expenses_selected"
            selectable-key="id"
            show-select
            hide-default-footer
            >
            
            <!-- Top -->
            <template v-slot:top>
              <div class="top__con">

                <!-- Search Bar -->
                <v-text-field
                  class="search_bar"
                  v-model="expenses_search"
                  label="Search By"
                  color="outline"
                  outlined
                  solo
                  flat
                  hide-details
                  dense
                  height="45px"
                  >
                  <template slot="prepend-inner">
                    <v-btn icon><v-icon small>fa-search</v-icon></v-btn>
                  </template>
                </v-text-field>
                <!-- Action Buttons -->
                <div class="action__btn">
                  <v-btn class="tall__btn mr-2 subtext--text" color="subtext" outlined @click="handleInvoiceView">Invoice View</v-btn>
                  <v-menu
                  transition="slide-y-transition"
                  rounded="lg"
                  offset-y
                  >
                    <template v-slot:activator="{ attrs, on }">
                      <v-btn class="tall__btn" color="primary" v-bind="attrs" v-on="on">
                        New Transaction
                        <LightArrow class="ml-2" style="max-width: 10px;"/>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item v-for="(item, index) in new_transaction_menu" :key="index" link>
                      <v-list-item-title class="">
                          <span class="n_text text--text ml-2">{{ item. title }}</span>
                      </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                  <v-btn class="tall__btn ml-2 subtext--text" color="subtext" outlined @click="handlePrint">
                    <v-icon class="mr-2" small>fa-print</v-icon>
                    Print
                  </v-btn>
                  <v-btn class="tall__btn ml-2 subtext--text" color="subtext" outlined @click="filterDialog=true">
                    <v-icon class="mr-2" small>fa-filter</v-icon>
                    Filter
                  </v-btn>
                </div>
              </div>
            </template>
            <!-- Table Rows -->
            <template v-slot:item="{ item,index }">
              <tr style="">
                <td class="pa-0 ma-0">
                  <div class="flex_row align-center justify-center" :style="{ borderLeft: '4px solid' + item.color }">
                    <v-checkbox color="info" on-icon="fa-light fa-square-check" off-icon="fa-regular fa-square" class="mx-auto mb-2" dense hide-details :v-model="selected" ></v-checkbox>
                  </div>
                </td>
                <td class="pa-0 ma-0">{{ item.dueDate }}</td>
                <td class="pa-0 ma-0">{{ item.type }}</td>
                <td class="pa-0 ma-0">{{ item.payee }}</td>
                <td class="pa-0 ma-0">{{ item.category }}</td>
                <td class="pa-0 ma-0">{{ item.tax }}</td>
                <td class="pa-0 ma-0">{{ item.total }}</td>
                <!-- <td class="pa-0 ma-0" style="text-align: end;"><v-btn class="" color="subtext" icon><v-icon small>fa-solid fa-ellipsis-vertical</v-icon></v-btn></td> -->
                <td class="pa-0 ma-0" style="width: 30px;">
                  <div class="actions__con">
                    <span class="print primary--text">Print</span>
                    <v-btn color="subtext" icon><v-icon small>fa-solid fa-ellipsis-vertical</v-icon></v-btn>
                  </div>
                </td>
              </tr>
            </template>
            </v-data-table>


            <v-data-table id="SUPPLIERS" v-if="currentTab == 'suppliers'"
            class="main__table elevation-0"
            :v-model="suppliers_data"
            :headers="suppliers_headers"
            :items="suppliers_data"
            :search="suppliers_search"
            item-key="suppliers_selected"
            selectable-key="id"
            show-select
            hide-default-footer
            >
            <template v-slot:top>
              <div class="top__con">
                <v-text-field
                  class="search_bar"
                  v-model="suppliers_search"
                  label="Search By"
                  color="outline"
                  outlined
                  solo
                  flat
                  hide-details
                  dense
                  height="45px"
                  >
                  <template slot="prepend-inner">
                    <v-btn icon><v-icon small>fa-search</v-icon></v-btn>
                  </template>
                </v-text-field>
                <div class="action__btn">
                  <v-btn class="tall__btn text_light--text" color="primary">
                    <v-icon small class="mr-2">fa-plus</v-icon>
                    Add Supplier
                  </v-btn>
                  <v-btn class="tall__btn ml-2 subtext--text" color="subtext" outlined @click="filterDialog=true">
                    <v-icon class="mr-2" small>fa-filter</v-icon>
                    Filter
                  </v-btn>
                </div>
              </div>
            </template>
            <template v-slot:item="{ item,index }">
              <tr style="">
                <td class="pa-0 ma-0">
                  <div class="flex_row align-center justify-center" :style="{ borderLeft: '4px solid' + item.color }">
                    <v-checkbox color="info" on-icon="fa-light fa-square-check" off-icon="fa-regular fa-square" class="mx-auto mb-2" dense hide-details :v-model="selected" ></v-checkbox>
                  </div>
                </td>
                <td class="pa-0 ma-0">{{ item.supplier }}</td>
                <td class="pa-0 ma-0">{{ item.w_phone }}</td>
                <td class="pa-0 ma-0">{{ item.h_phone }}</td>
                <td class="pa-0 ma-0">{{ item.email }}</td>
                <td class="pa-0 ma-0" style="width: 150px;">
                  <div class="actions__con">
                    <span class="print primary--text">Create Expense</span>
                    <v-btn color="subtext" icon><v-icon small>fa-solid fa-ellipsis-vertical</v-icon></v-btn>
                  </div>
                </td>
              </tr>
            </template>
            </v-data-table>


            <v-data-table id="FORECAST" v-if="currentTab == 'forecast'"
            class="main__table elevation-0"
            :v-model="forecast_data"
            :headers="forecast_headers"
            :items="forecast_data"
            :search="forecast_search"
            item-key="forecast_selected"
            selectable-key="id"
            show-select
            hide-default-footer
            >
            <template v-slot:top>
              <h4 class="mb-5">Upcomming Expenses</h4>
              <div class="top__con">
                <v-text-field
                  class="search_bar"
                  v-model="forecast_search"
                  label="Search By"
                  color="outline"
                  outlined
                  solo
                  flat
                  hide-details
                  dense
                  height="45px"
                  >
                  <template slot="prepend-inner">
                    <v-btn icon><v-icon small>fa-search</v-icon></v-btn>
                  </template>
                </v-text-field>
                <div class="action__btn">
                  <v-btn class="tall__btn ml-2 subtext--text" color="subtext" outlined @click="filterDialog=true">
                    <v-icon class="mr-2" small>fa-filter</v-icon>
                    Filter
                  </v-btn>
                </div>
              </div>
            </template>
            <template v-slot:item="{ item,index }">
              <tr style="">
                <td class="pa-0 ma-0">
                  <div class="flex_row align-center justify-center" :style="{ borderLeft: '4px solid' + item.color }">
                    <v-checkbox color="info" on-icon="fa-light fa-square-check" off-icon="fa-regular fa-square" class="mx-auto mb-2" dense hide-details :v-model="selected" ></v-checkbox>
                  </div>
                </td>
                <td class="pa-0 ma-0">{{ item.date }}</td>
                <td class="pa-0 ma-0">{{ item.expense }}</td>
                <td class="pa-0 ma-0">{{ item.value }}</td>
                <td class="pa-0 ma-0" style="min-width: fit-content !important;max-width: 100px !important;">
                  <div class="status__con">
                    <span class="status light_accent4 accent4--text" v-if="item.status=='paid'">{{ item.status }}</span>
                    <span class="status light_accent3 accent3--text" v-if="item.status=='closed'">{{ item.status }}</span>
                    <span class="status light_primary primary--text" v-if="item.status=='converted'">{{ item.status }}</span>
                    <span class="status light_accent1 accent1--text" v-if="item.status=='partially paid'">{{ item.status }}</span>
                  </div>
                </td>
                <td class="pa-0 ma-0" style="width: 30px;">
                  <div class="actions__con">
                    <span class="print primary--text">Print</span>
                    <v-btn color="subtext" icon><v-icon small>fa-solid fa-ellipsis-vertical</v-icon></v-btn>
                  </div>
                </td>
              </tr>
            </template>
            </v-data-table>


            <v-data-table id="REIMBURSEMENT" v-if="currentTab == 'reimbursement'"
            class="main__table elevation-0"
            :v-model="reimbursement_data"
            :headers="reimbursement_headers"
            :items="reimbursement_data"
            :search="reimbursement_search"
            item-key="reimbursement_selected"
            selectable-key="id"
            show-select
            hide-default-footer
            >
            
            <!-- Top -->
            <template v-slot:top>
              <h4 class="mb-5">Reimbursement Request</h4>
              <div class="top__con">

                <!-- Search Bar -->
                <v-text-field
                  class="search_bar"
                  v-model="reimbursement_search"
                  label="Search By"
                  color="outline"
                  outlined
                  solo
                  flat
                  hide-details
                  dense
                  height="45px"
                  >
                  <template slot="prepend-inner">
                    <v-btn icon><v-icon small>fa-search</v-icon></v-btn>
                  </template>
                </v-text-field>
                <!-- Action Buttons -->
                <div class="action__btn">
                  <v-btn class="tall__btn ml-2 subtext--text" color="subtext" outlined @click="filterDialog=true">
                    <v-icon class="mr-2" small>fa-filter</v-icon>
                    Filter
                  </v-btn>
                </div>
              </div>
            </template>
            <!-- Table Rows -->
            <template v-slot:item="{ item,index }">
              <tr style="">
                <td class="pa-0 ma-0">
                  <div class="flex_row align-center justify-center" :style="{ borderLeft: '4px solid' + item.color }">
                    <v-checkbox color="info" on-icon="fa-light fa-square-check" off-icon="fa-regular fa-square" class="mx-auto mb-2" dense hide-details :v-model="selected" ></v-checkbox>
                  </div>
                </td>
                <td class="pa-0 ma-0">{{ item.employee }}</td>
                <td class="pa-0 ma-0">{{ item.type }}</td>
                <td class="pa-0 ma-0">{{ item.memo }}</td>
                <td class="pa-0 ma-0">{{ item.date }}</td>
                <td class="pa-0 ma-0">{{ item.amount }}</td>
                <td class="pa-0 ma-0" style="min-width: fit-content !important;max-width: 100px !important;">
                  <div class="status__con">
                    <span class="status light_accent4 accent4--text" v-if="item.status=='paid'">{{ item.status }}</span>
                    <span class="status light_accent3 accent3--text" v-if="item.status=='closed'">{{ item.status }}</span>
                    <span class="status light_primary primary--text" v-if="item.status=='converted'">{{ item.status }}</span>
                    <span class="status light_accent1 accent1--text" v-if="item.status=='partially paid'">{{ item.status }}</span>
                  </div>
                </td>
                <td class="pa-0 ma-0 text-right">
                    <v-btn class="short__btn text--text ml-2" color="subtext" outlined>View Receipt</v-btn>
                    <v-btn class="short__btn text_light--text ml-2" color="success">Approve</v-btn>
                    <v-btn class="short__btn text_light--text ml-2" color="error">Decline</v-btn>
                </td>
              </tr>
            </template>
            </v-data-table>


          </v-card-text>
        </v-card>
      </v-col>

    </v-row>

</v-row>
</template>

<script>
import '@/assets/scss/Sales/_sales.scss'
import '@/assets/scss/utils/Tables/_mainTable.scss'
import TotalsCard from '@/components/Cards/TotalsCard/index.vue'
import LightArrow from '@/assets/images/White-Light-Arrow-icon.svg'

export default {
  layout: 'dashboard',
  components: { TotalsCard, LightArrow }, 
  data() { 
    return {
      // SNACKBAR
      snackbar_data: { snackbar: false, text: 'Successfully', color: 'success', timeout: 2000 },
      
      // INVOICE VIEW
      invoiceView: false,


      // FILTER
      filterDialog: false,
      filter_by: [ 'All', 'Week to date', 'This month to date', 'This quarter to date', 'This year to date', 'Specific dates'], 
      customerFilter: ['All', 'Other',],
      statusFilter: ['Paid', 'Unpaid'],
      daysOfWeek: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      monthsOfYear: ['Jan', 'Feb', 'Mar', 'Apr'],
      Years: [2022, 2021, 2020],
      customDataDisabled: true,


      forecast_titles: [
        { name: 'Sales', color: 'accent2' },
        { name: 'Forecasted sales', color: 'accent1' },
        { name: 'Reoccurring Revenue', color: 'primary' },
        { name: 'Sales Target', color: 'accent3' },
      ],
      breakdown_data: [
        { name: 'Business', amount: '35.1k', percentage: '43', color: 'accent2'},
        { name: 'Office maintained', amount: '5.1k', percentage: '30', color: 'primary'},
        { name: 'Salary', amount: '102k', percentage: '25', color: 'accent4'},
        { name: 'DEWA', amount: '10k', percentage: '2', color: 'accent1'},
        { name: 'Office Rent', amount: '10k', percentage: '5', color: 'accent3'},
      ],
      currentTab:'all',
      new_transaction_menu: [
        { title: 'Invoice', value: 'invoice' },
        { title: 'Payment', value: 'payment' },
        { title: 'Estimate', value: 'estimate' },
        { title: 'Sales Reciept', value: 'sales_reciept' },
        { title: 'Tax Credit Note', value: 'tax_credit' },
        { title: 'Time Activity', value: 'time_activity' },
        { title: 'Journal Entry', value: 'journal_entry' },
      ],



      // Expenses
      expenses_search: '',
      expenses_selected: [],
      expenses_data: [
        { 
          id: 0,
          dueDate: '12-07-2022',
          type: 'Business Expense',
          payee: 'Payee',
          category: 'Bank',
          tax: 'Exempt -0%',
          total: '1050',
          color: '#1AD598',
          action: '',
        },
      ],
      expenses_headers: [
        { text: 'Due Date', value: 'dueDate' },
        { text: 'Type', value: 'type' },
        { text: 'Payee', value: 'payee' },
        { text: 'Category', value: 'category' },
        { text: 'Tax', value: 'tax' },
        { text: 'Total Amount', value: 'total' },
        { text: 'Action', value: 'action', sortable: false },
      ],
      total_expenses: [
        { name: 'Total Expenses (10)', amount: '109,186' },
        { name: 'Approved Expenses (10)', amount: '540,500' },
        { name: 'Paid Expenses (5)', amount: '3,27,970.0' },
        { name: 'New expense this week (15)', amount: '540,500' },
      ],



      // Suppliers
      suppliers_search: '',
      suppliers_selected: [],
      suppliers_data: [
        { 
          id: 0,
          supplier: 'Globex Corp',
          w_phone: '+97 52 365 9885',
          h_phone: '+97 52 365 9885',
          email: 'contact@globexcorp.com',
          color: '#1AD598',
          action: '',
        },
      ],
      suppliers_headers: [
        { text: 'Supplier/Company', value: 'supplier' },
        { text: 'Work Phone', value: 'w_phone' },
        { text: 'Home Phone', value: 'h_phone' },
        { text: 'Email', value: 'email' },
        { text: 'Action', value: 'action', sortable: false },
      ],
      total_suppliers: [
        { name: 'Purchase Order (15)', amount: '0' },
        { name: 'Overdue (10)', amount: '10,500' },
        { name: 'Open bill (5)', amount: '300,137' },
        { name: '1 Paid in the last 30 days (15)', amount: '604,200' },
      ],



      // Forecast
      forecast_search: '',
      forecast_selected: [],
      forecast_data: [
        { 
          id: 0,
          date: '12-12-2022',
          expense: 'Rent',
          value: 'AED8,000',
          status: 'paid',
          color: '#1AD598',
          action: '',
        },
      ],
      forecast_headers: [
        { text: 'Date', value: 'date' },
        { text: 'Expense', value: 'expense' },
        { text: 'Value', value: 'value' },
        { text: 'Status', value: 'status' },
        { text: 'Action', value: 'action', sortable: false },
      ],
      total_forecast: [
        { name: 'Expense forecast (Year End)', amount: '2,150,523' },
      ],



      // Reimbursement
      reimbursement_search: '',
      reimbursement_selected: [],
      reimbursement_data: [
        { 
          id: 0,
          employee: 'Apollo Nida',
          type: 'Reimbursement expense',
          memo: 'Client meeting- saudi',
          date: '00-00-0000',
          amount: 'AED 5232',
          status: 'paid',
          color: '#1AD598',
          action: '',
        },
      ],
      reimbursement_headers: [
        { text: 'Employee', value: 'employee' },
        { text: 'Type', value: 'type' },
        { text: 'Memo', value: 'memo' },
        { text: 'Request Date', value: 'date' },
        { text: 'Amount', value: 'amount' },
        { text: 'Status', value: 'status' },
        { text: 'Action', value: 'action', sortable: false, align: 'center' },
      ],
      total_reimbursement: [
        { name: 'Total Reimbursement this year', amount: '06' },
        { name: 'Most Reimbursed category', amount: '-' },
        { name: 'Avg Reimbursement', amount: '0' },
      ],

    }
  },
  created() {
    this.$nuxt.$on('tabChanged', ($event) => {
			this.changeTab($event)
    })
  },
	beforeDestroy(){
    this.$nuxt.$off('tabChanged')
  },
  methods: {
    handlePrint() {
      this.snackbar_data = { snackbar: true, text: 'Printed Successfully', color: 'success', timeout: 2000 }
    },
    handleInvoiceView() {
      this.invoiceView = true
    },
    handleApplyFilter() {
      this.filterDialog = false
    },
    changeTab(event){
      console.log("Ex Clicked Tab is =>",  event)
      this.currentTab = event
    }
  },
  computed: {
    computedTab(){
      console.log("here")
    }
  }
}
</script>
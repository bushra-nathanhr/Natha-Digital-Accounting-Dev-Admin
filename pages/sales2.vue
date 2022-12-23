<template>
    <v-row class="wrapper_row">
      
  
  
      <!-- *** TOTALS CARDS *** -->
      <TotalsCard v-if="currentTab!='products'" :data="total_data" />
  
  
  
      <!-- *** TABLES *** -->
      <v-row class="row1">
        <v-col sm="12" md="12" lg="12">
          <v-card color="card_bg" id="card">
            <v-card-text id="card-text" style="margin-top: 0 !important;">
  
              <!-- main objs: all_data_headers / all_data / all_data_search / selected / new_transaction_menu -->
              
              <v-data-table
              class="main__table elevation-0"
              :v-model="table_data"
              :headers="table_headers"
              :items="table_data"
              :search="table_search"
              item-key="selected"
              selectable-key="id"
              show-select
              hide-default-footer
              >
              <template v-slot:top>
                <div class="top__con">
                  <v-text-field
                    class="search_bar"
                    v-model="table_search"
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
                    <v-btn class="tall__btn ml-2 subtext--text" color="subtext" outlined>
                      <v-icon class="mr-2" small>fa-filter</v-icon>
                      Filter
                    </v-btn>
                  </div>
  
                </div>
              </template>
              <template v-slot:item="{ item,index }">
                <tr style="">
                  <!-- Checkbox -->
                  <td class="pa-0 ma-0">
                    <div class="flex_row align-center justify-center" :style="{ borderLeft: '4px solid' + item.color }">
                      <v-checkbox color="info" on-icon="fa-light fa-square-check" off-icon="fa-regular fa-square" class="mx-auto mb-2" dense hide-details :v-model="selected" ></v-checkbox>
                    </div>
                  </td>
                  <!-- 1 -->
                  <td class="pa-0 ma-0">{{ item.one }}</td>
                  <!-- 2 -->
                  <td class="pa-0 ma-0">{{ item.two }}</td>
                  <!-- 3 -->
                  <td class="pa-0 ma-0">{{ item.three }}</td>
                  <!-- 4 -->
                  <td class="pa-0 ma-0">{{ item.four }}</td>
                  <!-- 5 -->
                  <td class="pa-0 ma-0">{{ item.five }}</td>
                  <!-- 6 -->
                  <td class="pa-0 ma-0">{{ item.six }}</td>
                  <!-- 7 -->
                  <td class="pa-0 ma-0">{{ item.seven }}</td>
                  <!-- 8 -->
                  <td class="pa-0 ma-0">{{ item.eight }}</td>
                  <!-- Status -->
                  <td class="pa-0 ma-0" style="min-width: fit-content !important;max-width: 100px !important;">
                    <div class="status__con">
                      <span class="status light_accent4 accent4--text" v-if="item.status=='paid'">{{ item.status }}</span>
                      <span class="status light_accent3 accent3--text" v-if="item.status=='closed'">{{ item.status }}</span>
                      <span class="status light_primary primary--text" v-if="item.status=='converted'">{{ item.status }}</span>
                      <span class="status light_accent1 accent1--text" v-if="item.status=='partially paid'">{{ item.status }}</span>
                    </div>
                  </td>
                  <!-- Actions -->
                  <td class="pa-0 ma-0" style="width: 30px;">
                    <div class="actions__con">
                      <span class="print primary--text">Print</span>
                      <v-btn color="subtext" icon><v-icon small>fa-solid fa-ellipsis-vertical</v-icon></v-btn>
                    </div>
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
        currentTab:'sales',
        new_transaction_menu: [
          { title: 'Invoice', value: 'invoice' },
          { title: 'Payment', value: 'payment' },
          { title: 'Estimate', value: 'estimate' },
          { title: 'Sales Reciept', value: 'sales_reciept' },
          { title: 'Tax Credit Note', value: 'tax_credit' },
          { title: 'Time Activity', value: 'time_activity' },
          { title: 'Journal Entry', value: 'journal_entry' },
        ],
        selected: [],
  
  
        // Main Data Table Template
        table_headers: [],
        table_data: [],
        table_search: '',
        total_data: [],
  
        // Forecast 
        forecast_headers: [
          { text: 'Expected Close Date', value: 'one', align: 'start' },
          { text: 'Customer', value: 'two' },
          { text: 'Value', value: 'three' },
          { text: 'Description', value: 'four' },
          { text: 'Status', value: 'status', align: 'center' },
          { text: 'Action', value: 'action', sortable: false },
        ],
        forecast_data: [
          { 
            id: 0,
            one: '22-01-2022', 
            two: 'Rare Assembly',
            three: 'AED 10,265',
            four: '-',
            status: 'paid',
            color: '#1AD598',
            action: '',
          },
        ],
        forecast_search: '',
        forecast_total: [
          { name: 'Sales forecast (next 30d)', amount: 'AED 0' },
          { name: 'Sales pipeline forecast', amount: 'AED 0' },
          { name: 'Monthly Reccuring Revenue', amount: 'AED 50,896' },
        ],
  
        // Products
        products_headers: [
          { text: 'Service', value: 'one', align: 'start' },
          { text: 'SKU', value: 'two' },
          { text: 'Type', value: 'three' },
          { text: 'Sales Description', value: 'four' },
          { text: 'Sales Price', value: 'five' },
          { text: 'Cost ', value: 'six' },
          { text: 'QTY ', value: 'seven' },
          { text: 'Reorder ', value: 'eight' },
          { text: 'Action', value: 'action', sortable: false },
        ],
        products_data: [
          { 
            id: 0,
            one: 'ERP', 
            two: '85432522',
            three: 'Service',
            four: '-',
            five: 'AED 20,100',
            six: 'AED 2500',
            seven: '01',
            eight: '01',
            color: '#1AD598',
            action: '',
          },
        ],
        products_search: '',
  
        // Invoices 
        invoices_headers: [
          { text: 'Date', value: 'one', align: 'start' },
          { text: 'No', value: 'two' },
          { text: 'Customer', value: 'three' },
          { text: 'Amount', value: 'four' },
          { text: 'Status', value: 'status', align: 'center' },
          { text: 'Action', value: 'action', sortable: false },
        ],
        invoices_data: [
          { 
            id: 0,
            one: '22-01-2022', 
            two: '1004',
            three: 'EasyBox',
            four: 'AED 10,265',
            status: 'paid',
            color: '#1AD598',
            action: '',
          },
        ],
        invoices_search: '',
        invoices_total: [
          { name: 'Total', amount: '900000' },
          { name: 'Average Sale', amount: '700000' },
        ],
  
        // All Sales 
        sales_headers: [
          { text: 'Date', value: 'one', align: 'start' },
          { text: 'Customer', value: 'two' },
          { text: 'Type', value: 'three' },
          { text: 'Due Date', value: 'four' },
          { text: 'Before Tax', value: 'five' },
          { text: 'Tax', value: 'six' },
          { text: 'Total', value: 'seven' },
          { text: 'Status', value: 'status', align: 'center' },
          { text: 'Action', value: 'action', sortable: false },
        ],
        sales_data: [
          { 
            id: 0,
            one: '23-01-2022', 
            two: 'Soylent Corp',
            three: 'Invoice',
            four: '18-01-2022',
            five: 'AED 65,500',
            six: 'Exempt -0%',
            seven: 'AED 65,500',
            status: 'paid',
            color: '#1AD598',
            action: '',
          },
          { 
            id: 0,
            one: '23-01-2022', 
            two: 'Bushra Aboubida',
            three: 'Invoice',
            four: '18-01-2022',
            five: 'AED 65,500',
            six: 'Exempt -0%',
            seven: 'AED 65,500',
            status: 'paid',
            color: '#1AD598',
            action: '',
          },
        ],
        sales_search: '',
        sales_total: [
          { name: 'Total Sales (5)', amount: '3,27,970.0' },
          { name: 'Average Sale', amount: '540,500' },
          { name: 'Highest Sale', amount: '3,27,970.0' },
          { name: 'Paid invoices Due', amount: '540,500' },
          { name: 'Unpaid invoices Due', amount: '3,27,970.0' },
        ],
      }
    },
    created() {
      // ?? Listen to tabChanged Event => then fire a function call changeTab and pass the payload to it as an argument 
      this.$nuxt.$on('tabChanged', ($event) => {
              this.changeTab($event)
      })
    },
      beforeDestroy(){
      this.$nuxt.$off('tabChanged')
    },
    mounted(){
    },
    methods: {
      changeTab(event){
        console.log("Clicked Tab is =>",  event)
        this.currentTab = event
  
        if(this.currentTab=='sales') {
          this.table_headers = this.sales_headers
          this.table_data = this.sales_data
          this.table_search = this.sales_search
          this.total_data = this.sales_total
        } else if(this.currentTab=='invoices') {
          this.table_headers = this.invoices_headers
          this.table_data = this.invoices_data
          this.table_search = this.invoices_search
          this.total_data = this.invoices_total
        } else if(this.currentTab=='products') {
          this.table_headers = this.products_headers
          this.table_data = this.products_data
          this.table_search = this.products_search
        } else if(this.currentTab=='forecast') {
          this.table_headers = this.forecast_headers
          this.table_data = this.forecast_data
          this.table_search = this.forecast_search
          this.total_data = this.forecast_total
        }
      }
    },
    computed: {
      computedTab(){
        console.log("here"  )
        // if(localStorage){
  
          // return localStorage.getItem("selected_tab")
        // }
      },
      getValues() {
        // return this.$store.getters['tabs/toggleCurrentTab']
        return this.$store.state.tabs.tab_current_val
      }
    }
  }
  </script>
  
<template>
  <v-row class="wrapper_row">
    


    <!-- *** TOTALS CARDS *** -->
    <TotalsCard v-if="currentTab == 'all'" :data="total_sales" />
    <TotalsCard v-if="currentTab == 'invoices'" :data="total_invoices" />
    <TotalsCard v-if="currentTab == 'forecast'" :data="total_forecast" />



    <!-- *** MID CARDS *** -->
    <v-row class="mid_row" v-if="currentTab == 'forecast'">

      <v-col sm="12" md="4" lg="4">
        <v-card id="card">
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
                Forcasted Sales (15)
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
    <v-row class="row1">
      <v-col sm="12" md="12" lg="12">
        <v-card color="card_bg" id="card">
          <v-card-text id="card-text" style="margin-top: 0 !important;">
            <!-- main objs: item_headers / item_data / item_search / item_selected -->


            
            <v-data-table id="SALES" v-if="currentTab == 'all'"
            class="main__table elevation-0"
            :v-model="sales_data"
            :headers="sales_headers"
            :items="sales_data"
            :search="sales_search"
            item-key="sales_selected"
            selectable-key="id"
            show-select
            hide-default-footer
            >
            <template v-slot:top>
              <div class="top__con">
                <v-text-field
                  class="search_bar"
                  v-model="sales_search"
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
                <td class="pa-0 ma-0">
                  <div class="flex_row align-center justify-center" :style="{ borderLeft: '4px solid' + item.color }">
                    <v-checkbox color="info" on-icon="fa-light fa-square-check" off-icon="fa-regular fa-square" class="mx-auto mb-2" dense hide-details :v-model="sales_selected" ></v-checkbox>
                  </div>
                </td>
                <td class="pa-0 ma-0">{{ item.date }}</td>
                <td class="pa-0 ma-0">{{ item.customer }}</td>
                <td class="pa-0 ma-0">{{ item.type }}</td>
                <td class="pa-0 ma-0">{{ item.dueDate }}</td>
                <td class="pa-0 ma-0">{{ item.b_tax }}</td>
                <td class="pa-0 ma-0">{{ item.tax }}</td>
                <td class="pa-0 ma-0">{{ item.total }}</td>
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




            
            
            <v-data-table id="INVOICES" v-if="currentTab == 'invoices'"
            class="main__table elevation-0"
            :v-model="invoices_data"
            :headers="invoices_headers"
            :items="invoices_data"
            :search="invoices_search"
            item-key="invoices_selected"
            selectable-key="id"
            show-select
            hide-default-footer
            >
            <template v-slot:top>
              <div class="top__con">
                <v-text-field
                  class="search_bar"
                  v-model="invoices_search"
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
                <td class="pa-0 ma-0">
                  <div class="flex_row align-center justify-center" :style="{ borderLeft: '4px solid' + item.color }">
                    <v-checkbox color="info" on-icon="fa-light fa-square-check" off-icon="fa-regular fa-square" class="mx-auto mb-2" dense hide-details :v-model="invoices_selected" ></v-checkbox>
                  </div>
                </td>
                <td class="pa-0 ma-0">{{ item.date }}</td>
                <td class="pa-0 ma-0">{{ item.no }}</td>
                <td class="pa-0 ma-0">{{ item.customer }}</td>
                <td class="pa-0 ma-0">{{ item.amount }}</td>
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
                    <span class="print primary--text">Receive Payment</span>
                    <v-btn color="subtext" icon><v-icon small>fa-solid fa-ellipsis-vertical</v-icon></v-btn>
                  </div>
                </td>
              </tr>
            </template>
            </v-data-table>




            
            <v-data-table id="PRODUCTS" v-if="currentTab == 'products'"
            class="main__table elevation-0"
            :v-model="products_data"
            :headers="products_headers"
            :items="products_data"
            :search="products_search"
            item-key="products_selected"
            selectable-key="id"
            show-select
            hide-default-footer
            >
            <template v-slot:top>
              <div class="top__con">
                <v-text-field
                  class="search_bar"
                  v-model="products_search"
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
            <!-- Table Rows -->
            <template v-slot:item="{ item,index }">
              <tr style="">
                <td class="pa-0 ma-0">
                  <div class="flex_row align-center justify-center" :style="{ borderLeft: '4px solid' + item.color }">
                    <v-checkbox color="info" on-icon="fa-light fa-square-check" off-icon="fa-regular fa-square" class="mx-auto mb-2" dense hide-details :v-model="products_selected" ></v-checkbox>
                  </div>
                </td>
                <td class="pa-0 ma-0">{{ item.service }}</td>
                <td class="pa-0 ma-0">{{ item.sku }}</td>
                <td class="pa-0 ma-0">{{ item.type }}</td>
                <td class="pa-0 ma-0">{{ item.description }}</td>
                <td class="pa-0 ma-0">{{ item.price }}</td>
                <td class="pa-0 ma-0">{{ item.cost }}</td>
                <td class="pa-0 ma-0">{{ item.qty }}</td>
                <td class="pa-0 ma-0">{{ item.reorder }}</td>
                <td class="pa-0 ma-0" style="width: 30px;">
                  <div class="actions__con">
                    <span class="print primary--text">Edit</span>
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
                <td class="pa-0 ma-0">
                  <div class="flex_row align-center justify-center" :style="{ borderLeft: '4px solid' + item.color }">
                    <v-checkbox color="info" on-icon="fa-light fa-square-check" off-icon="fa-regular fa-square" class="mx-auto mb-2" dense hide-details :v-model="forecast_selected" ></v-checkbox>
                  </div>
                </td>
                <td class="pa-0 ma-0">{{ item.date }}</td>
                <td class="pa-0 ma-0">{{ item.customer }}</td>
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
                    <span class="print primary--text">View</span>
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
      forecast_titles: [
        { name: 'Sales', color: 'accent2' },
        { name: 'Forecasted sales', color: 'accent1' },
        { name: 'Reoccurring Revenue', color: 'primary' },
        { name: 'Sales Target', color: 'accent3' },
      ],
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
     

      // Forecast 
      forecast_search: '',
      forecast_selected: [],
      forecast_data: [
        { 
          id: 0,
          date: '23-01-2022', 
          customer: 'Rare Assembly',
          value: 'AED 65,500',
          status: 'paid',
          color: '#1AD598',
          action: '',
        },
      ],
      forecast_headers: [
        { text: 'Expected Close Date', value: 'date', align: 'start' },
        { text: 'Customer', value: 'customer' },
        { text: 'Value', value: 'value' },
        { text: 'Status', value: 'status', align: 'center' },
        { text: 'Action', value: 'action', sortable: false },
      ],
      total_forecast: [
        { name: 'Sales forecast (next 30d)', amount: '0' },
        { name: 'Sales pipeline forecast', amount: '0' },
        { name: 'Monthly Reoccurring Revenue', amount: '50,896' },
      ],


      // Products
      products_search: '',
      products_selected: [],
      products_data: [
        { 
          id: 0,
          service: 'ERP', 
          sku: '85432522',
          type: 'Service',
          description: '-',
          price: 'AED 65,500',
          cost: 'AED 2500',
          qty: '01',
          reorder: '01',
          color: '#1AD598',
          action: '',
        },
      ],
      products_headers: [
        { text: 'Service', value: 'service', align: 'start' },
        { text: 'SKU', value: 'sku' },
        { text: 'Type', value: 'type' },
        { text: 'Sales Description', value: 'description' },
        { text: 'Sales Price', value: 'price' },
        { text: 'Cost', value: 'cost' },
        { text: 'QTY', value: 'qty' },
        { text: 'Reorder', value: 'reorder' },
        { text: 'Action', value: 'action', sortable: false },
      ],


      // Invoices 
      invoices__selected: [],
      invoices_search: '',
      invoices_data: [
        { 
          id: 0,
          no: '1022', 
          date: '23-01-2022', 
          customer: 'Soylent Corp',
          amount: 'AED 65,500',
          status: 'paid',
          color: '#1AD598',
          action: '',
        },
      ],
      invoices_headers: [
        { text: 'Date', value: 'date', align: 'start' },
        { text: 'No', value: 'no' },
        { text: 'Customer', value: 'customer' },
        { text: 'Amount', value: 'amount' },
        { text: 'Status', value: 'status', align: 'center' },
        { text: 'Action', value: 'action', sortable: false },
      ],
      total_invoices: [
        { name: 'Total Sales (5)', amount: '3,27,970.0' },
        { name: 'Average Sale', amount: '540,500' },
        { name: 'Highest Sale', amount: '3,27,970.0' },
        { name: 'Paid invoices Due', amount: '540,500' },
        { name: 'Unpaid invoices Due', amount: '3,27,970.0' },
      ],


      // Sales 
      sales_search: '',
      sales_selected: [],
      sales_data: [
        { 
          id: 0,
          date: '23-01-2022', 
          customer: 'Soylent Corp',
          type: 'Invoice',
          dueDate: '18-01-2022',
          b_tax: 'AED 65,500',
          tax: 'Exempt -0%',
          total: 'AED 65,500',
          status: 'paid',
          color: '#1AD598',
          action: '',
        },
        { 
          id: 1,
          date: '24-01-2022', 
          customer: 'BGoylent Corp',
          type: 'Invoice',
          dueDate: '18-01-2022',
          b_tax: 'AED 65,500',
          tax: 'Exempt -0%',
          total: 'AED 65,500',
          status: 'closed',
          color: '#FFB536',
          action: '',
        },
        { 
          id: 2,
          date: '26-01-2022', 
          customer: 'Mylent Corp',
          type: 'Invoice',
          dueDate: '18-01-2022',
          b_tax: 'AED 65,500',
          tax: 'Exempt -0%',
          total: 'AED 65,500',
          status: 'converted',
          color: '#0A94FF',
          action: '',
        },
        { 
          id: 3,
          date: '26-01-2022', 
          customer: 'Lif Corp',
          type: 'Invoice',
          dueDate: '18-01-2022',
          b_tax: 'AED 65,500',
          tax: 'Exempt -0%',
          total: 'AED 65,500',
          status: 'partially paid',
          color: '#895BF1',
          action: '',
        },
      ],
      sales_headers: [
        { text: 'Date', value: 'date', align: 'start' },
        { text: 'Customer', value: 'customer' },
        { text: 'Type', value: 'type' },
        { text: 'Due Date', value: 'dueDate' },
        { text: 'Before Tax', value: 'b_tax' },
        { text: 'Tax', value: 'tax' },
        { text: 'Total', value: 'total' },
        { text: 'Status', value: 'status', align: 'center' },
        { text: 'Action', value: 'action', sortable: false },
      ],
      total_sales: [
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

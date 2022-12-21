<template>
  <v-row class="wrapper-row">
    
    <!-- TOTALS CARDS -->
    <!-- component: TotalsCard  -->
    <TotalsCard :data="total_sales_data" />

    <!-- ROW-1 -->
    <v-row class="row1">

      <!-- Sales Table -->
      <!-- obj: all_data_headers /  all_data / all_data_search / selected / new_transaction_menu -->
      <v-col sm="12" md="12" lg="12">
        <v-card id="card">
          <v-card-text id="card-text" style="margin-top: 0 !important;">
            <v-data-table
            class="main__table elevation-0"
            :v-model="all_data"
            :headers="all_data_headers"
            :items="all_data"
            :search="all_data_search"
            item-key="selected"
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
                  v-model="all_data_search"
                  label="Search By"
                  color="outline"
                  outlined
                  solo
                  flat
                  hide-details
                  dense
                  height="45px"
                  >
                  <v-template slot="prepend-inner">
                    <v-btn icon><v-icon small>fa-search</v-icon></v-btn>
                  </v-template>
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

            <!-- Table Header -->
            <!-- <template v-slot:header="{ props }">
              <th v-for="head in props.all_data_headers" :key="head">{{ head.text }}</th>
            </template> -->
            <!-- <template v-for="item in all_data_headers" v-slot:[`header.${item.value}`]="{ header }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <h5 v-on="on">{{ item.text }}</h5>
                </template>
                <span>{{ item.text }}</span>
              </v-tooltip>
            </template> -->

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
                <td class="pa-0 ma-0">
                  <v-btn class="" color="subtext" icon><v-icon small>fa-solid fa-ellipsis-vertical</v-icon></v-btn>
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
import '@/assets/scss/utils/Tables/_MainTable.scss'
import TotalsCard from '@/components/Cards/TotalsCard/index.vue'
import LightArrow from '@/assets/images/White-Light-Arrow-icon.svg'

export default {
  layout: 'dashboard',
  components: { TotalsCard, LightArrow }, 
  data() { 
    return {
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
      all_data_search: '',
      all_data: [
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
      all_data_headers: [
        { text: 'Due Date', value: 'dueDate' },
        { text: 'Type', value: 'type' },
        { text: 'Payee', value: 'payee' },
        { text: 'Category', value: 'category' },
        { text: 'Tax', value: 'tax' },
        { text: 'Total Amount', value: 'total' },
        { text: 'Action', value: 'action', sortable: false, align: 'end' },
      ],
      total_sales_data: [
        { name: 'Total Sales (5)', amount: '3,27,970.0' },
        { name: 'Average Sale', amount: '540,500' },
        { name: 'Highest Sale', amount: '3,27,970.0' },
        { name: 'Paid invoices Due', amount: '540,500' },
        { name: 'Unpaid invoices Due', amount: '3,27,970.0' },
     ],
    }
  }
}
</script>
<template>
  <v-row class="wrapper-row">
    
    <!-- TOTALS CARDS -->
    <!-- component: TotalsCard  -->
    <TotalsCard :data="total_sales_data" />

    <!-- ROW-1 -->
    <v-row class="row1">

      <!-- Sales Table -->
      <!-- obj:   -->
      <v-col sm="12" md="12" lg="12">
        <v-card id="card">
          <v-card-text id="card-text">
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
                  <v-btn class="tall__btn" color="primary">New Transaction</v-btn>
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

            <!-- Table Rows -->
            <template v-slot:item="{ item,index }">
              <tr>
                <td class="pa-0 ma-0">
                  <div class="flex_row align-center justify-center">
                    <v-checkbox color="outline" on-icon="fa-light fa-square-check" off-icon="fa-regular fa-square" class="mx-auto mb-2" dense hide-details :v-model="selected" ></v-checkbox>
                  </div>
                </td>
                <td class="pa-0 ma-0">{{ item.date }}</td>
                <td class="pa-0 ma-0">{{ item.customer }}</td>
                <td class="pa-0 ma-0">{{ item.type }}</td>
                <td class="pa-0 ma-0">{{ item.dueDate }}</td>
                <td class="pa-0 ma-0">{{ item.b_tax }}</td>
                <td class="pa-0 ma-0">{{ item.tax }}</td>
                <td class="pa-0 ma-0">{{ item.total }}</td>
                <td class="pa-0 ma-0" style="min-width: fit-content !important;max-width: 130px !important;">
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
export default {
  layout: 'dashboard',
  components: { TotalsCard }, 
  data() { 
    return {
      selected: [],
      all_data_search: '',
      all_data: [
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
          action: '',
        },
      ],
      all_data_headers: [
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

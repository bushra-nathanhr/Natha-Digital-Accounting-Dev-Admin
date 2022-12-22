<template>
  <v-row class="wrapper_row">
    <v-row class="row1">
      <!-- Chart Of Accounts Table -->
      <!-- obj: all_data_headers /  all_data / all_data_search / selected / new_transaction_menu -->
      <v-col sm="12" md="12" lg="12">
        <v-card color='card_bg'  id="card">
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

                <!-- Search bar + New Menu -->
                <div class="flex_row">
                  <v-menu
                    transition="slide-y-transition"
                    rounded="lg"
                    offset-y
                    >
                      <template v-slot:activator="{ attrs, on }">
                        <v-btn class="tall__btn" color="primary" v-bind="attrs" v-on="on">
                          New
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

                  <v-text-field
                    class="search_bar ml-2"
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
                    <template slot="prepend-inner">
                      <v-btn icon><v-icon small>fa-search</v-icon></v-btn>
                    </template>
                  </v-text-field>
                </div>

                <!-- Action Buttons -->
                <div class="action__btn">
                  <v-btn class="tall__btn ml-2 subtext--text" color="subtext" outlined>
                    <v-icon class="mr-2" small>fa-filter</v-icon>
                    Filter
                  </v-btn>

                  <v-btn class="tall__btn ml-2 text_light--text" color="primary">
                    <v-icon class="mr-2" small>fa-light fa-pen</v-icon>
                    Edit
                  </v-btn>

                  <v-btn class="tall__btn ml-2 subtext--text" color="subtext" outlined>
                    Batch Actions
                  </v-btn>

                  <v-btn class="tall__btn ml-2 subtext--text" color="subtext" outlined>
                    <v-icon class="mr-2" small>fa-print</v-icon>
                    Print
                  </v-btn>

                  <v-btn class="tall__btn ml-2 subtext--text" color="subtext" outlined small>
                    <v-icon small>fa-gear</v-icon>
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
                <td class="pa-0 ma-0">{{ item.no }}</td>
                <td class="pa-0 ma-0">{{ item.name }}</td>
                <td class="pa-0 ma-0">{{ item.type }}</td>
                <td class="pa-0 ma-0">{{ item.d_type }}</td>
                <td class="pa-0 ma-0">{{ item.balance }}</td>
                <td class="pa-0 ma-0">{{ item.tax }}</td>
                <td class="pa-0 ma-0">{{ item.b_balance }}</td>
                <td class="pa-0 ma-0" style="width: 30px;">
                  <div class="actions__con">
                    <span class="print primary--text">Acc_History</span>
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
          no: '1001', 
          name: '1001 Cash',
          type: 'Cash and cashequivalents',
          d_type: 'Cash on hand',
          tax: 'Exempt -0%',
          balance: 'AED 4522.0',
          b_balance: 'AED 65,500',
          status: 'paid',
          color: '#1AD598',
          action: '',
        },
        { 
          id: 1,
          no: '1002', 
          name: '1002 EmiratesNBD',
          type: 'Expense',
          d_type: 'Bank',
          tax: 'Exempt -0%',
          balance: 'AED 65,500',
          b_balance: 'AED 65,500',
          status: 'closed',
          color: '#FFB536',
          action: '',
        },
        { 
          id: 2,
          no: '1003', 
          name: 'Mylent Corp',
          type: 'Cash and cashequivalents',
          d_type: 'Bank',
          tax: 'Exempt -0%',
          balance: 'AED 65,500',
          b_balance: 'AED 65,500',
          status: 'converted',
          color: '#0A94FF',
          action: '',
        },
        { 
          id: 3,
          no: '1004', 
          name: 'Lif Corp',
          type: 'Cash and cashequivalents',
          d_type: 'Bank',
          tax: 'Exempt -0%',
          balance: 'AED 65,500',
          b_balance: 'AED 65,500',
          status: 'partially paid',
          color: '#895BF1',
          action: '',
        },
      ],
      all_data_headers: [
        { text: 'No.', value: 'no', align: 'start' },
        { text: 'Name', value: 'name' },
        { text: 'Type', value: 'type' },
        { text: 'Details Type', value: 'd_type' },
        { text: 'Tax Rate', value: 'tax' },
        { text: 'Balance', value: 'balance' },
        { text: 'Bank Balance', value: 'b_balance' },
        { text: 'Action', value: 'action', sortable: false },
      ],
    }
  }
}
</script>

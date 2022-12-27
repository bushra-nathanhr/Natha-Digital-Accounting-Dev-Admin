<template>
  <v-row class="wrapper_row">

    <!-- SNACKBAR -->
    <v-snackbar v-show="printedSnackbar.snackbar" class="snackbar" :timeout="printedSnackbar.timeout" v-model="printedSnackbar.snackbar" top min-width="100%" min-height="30px" rounded="0" elevation="0" :color="printedSnackbar.color">
      <div>
        <v-icon small color="white" v-if="printedSnackbar.color=='success'">fa-check</v-icon>
        <v-icon small color="error" v-else>fa-close</v-icon>
        <span class="text_light--text ml-3">{{ printedSnackbar.text }}</span>
      </div>
    </v-snackbar>
    <v-snackbar v-show="itemAddedSnackbar.snackbar" class="snackbar" :timeout="itemAddedSnackbar.timeout" v-model="itemAddedSnackbar.snackbar" top min-width="100%" min-height="30px" rounded="0" elevation="0" :color="itemAddedSnackbar.color">
      <div>
        <v-icon small color="white" v-if="itemAddedSnackbar.color=='success'">fa-check</v-icon>
        <v-icon small color="error" v-else>fa-close</v-icon>
        <span class="text_light--text ml-3">{{ itemAddedSnackbar.text }}</span>
      </div>
    </v-snackbar>

    <!-- ADD NEW DIALOG -->
    <v-dialog v-model="addNewDialog" class="ma-0 pa-0">
      <div class="my_dialog">
        <v-card id="tall_dialog">
          <v-card-title id="card-title">
              <h4 class="text--text">Account</h4>
              <div class="flex_row justify-lg-space-between">
                <v-btn class="tall__btn mr-2 px-5" color="subtext" outlined>Cancel</v-btn>
                <v-btn class="tall__btn px-9" color="primary" min-width="150px" @click="handleAddNewItem">Add</v-btn>
              </div>
          </v-card-title>
          <v-divider id="divider" class="mt-5"></v-divider>
          <v-card-text id="card-text">
            <v-container class="px-0 pt-0 mt-0">
              <v-row>
                <v-col cols="4" class="px-0">
                  <CustomInputContainer label="Account type">
                    <div slot="input">
                      <v-select v-model="new_account.type" :items="allAccountsTypes" placeholder="Select Account Type" outlined hide-details></v-select>
                    </div>
                  </CustomInputContainer>
                </v-col>
                <v-col cols="4">
                  <CustomInputContainer label="Bank Name">
                    <div slot="input">
                      <v-text-field v-model="new_account.name" placeholder="Bank" outlined hide-details></v-text-field>
                    </div>
                  </CustomInputContainer>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="8" class="px-0">
                  <CustomInputContainer label="Description">
                    <div slot="input">
                      <v-text-field v-model="description" placeholder="Enter Desc" outlined hide-details></v-text-field>
                    </div>
                  </CustomInputContainer>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="8" class="flex_row align-end px-0">
                  <v-checkbox label="is sub-account" v-model="isSubAccount"></v-checkbox>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4" class="px-0">
                  <CustomInputContainer label="sub-account">
                    <div slot="input">
                      <v-select v-model="sub_account" :items="allSubAccounts" placeholder="Enter parent account" outlined hide-details :disabled="!isSubAccount"></v-select>
                    </div>
                  </CustomInputContainer>
                </v-col>
                <v-col cols="4">
                  <CustomInputContainer label="Default Tax code">
                    <div slot="input">
                      <v-select v-model="new_account.tax" :items="allTaxCodes" placeholder="Select Tax Code" outlined hide-details></v-select>
                    </div>
                  </CustomInputContainer>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4" class="px-0">
                  <CustomInputContainer label="Balance">
                    <div slot="input">
                      <v-select v-model="new_account.balance" :items="allBalances" placeholder="Enter Balance" outlined hide-details></v-select>
                    </div>
                  </CustomInputContainer>
                </v-col>
                <v-col cols="4">
                  <CustomInputContainer label="As of">
                    <div slot="input">
                      <v-text-field v-model="as_of" placeholder="Select Date" outlined hide-details></v-text-field>
                    </div>
                  </CustomInputContainer>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </div>
    </v-dialog>

    

    <!-- FILTER DIALOG -->
    <v-dialog id="custom_dialog" v-model="filterDialog" persistent max-width="500px">
      <v-card id="card" style="padding: 20px 30px !important">
        <v-card-title id="card-title">
            <h4 class="text--text">Filter</h4>
            <v-icon small color="subtext" class="ml-5" @click="filterDialog=false">fa-close</v-icon>
        </v-card-title>
        <v-card-text id="card-text">
          <v-container class="ma-0 pa-0">
              <v-radio-group>
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


    <!-- ACTIONS DIALOG -->
    <v-dialog id="custom_dialog" v-model="actionsDialog" persistent max-width="500px">
      <v-card id="card" style="padding: 20px 30px !important">
        <v-card-title id="card-title">
            <h4 class="text--text">Batch Actions</h4>
            <v-icon small color="subtext" class="ml-5" @click="actionsDialog=false">fa-close</v-icon>
        </v-card-title>
        <v-card-text id="card-text">
        </v-card-text>
      </v-card>
    </v-dialog>


    <!-- SETTING DIALOG -->
    <v-dialog id="custom_dialog" v-model="settingDialog" persistent max-width="500px">
      <v-card id="card" style="padding: 20px 30px !important">
        <v-card-title id="card-title">
            <h4 class="text--text">Settings</h4>
            <v-icon small color="subtext" class="ml-5" @click="settingDialog=false">fa-close</v-icon>
        </v-card-title>
        <v-card-text id="card-text">
        </v-card-text>
      </v-card>
    </v-dialog>


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
                <div class="flex_row">
                  <v-btn class="tall__btn" color="primary" @click="addNewDialog=true">
                    <v-icon small color="white" class="mr-2">fa-plus</v-icon>
                    New
                  </v-btn>
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
                  <v-btn class="tall__btn ml-2 subtext--text" color="subtext" outlined @click="filterDialog=true">
                    <v-icon class="mr-2" small>fa-filter</v-icon>
                    Filter
                  </v-btn>

                  <v-btn class="tall__btn ml-2 text_light--text" color="primary">
                    <v-icon class="mr-2" small>fa-light fa-pen</v-icon>
                    Edit
                  </v-btn>

                  <v-btn class="tall__btn ml-2 subtext--text" color="subtext" outlined @click="actionsDialog=true">
                    Batch Actions
                  </v-btn>

                  <v-btn class="tall__btn ml-2 subtext--text" color="subtext" outlined @click="handlePrint">
                    <v-icon class="mr-2" small>fa-print</v-icon>
                    Print
                  </v-btn>

                  <v-btn class="tall__btn ml-2 subtext--text" color="subtext" outlined small @click="settingDialog=true">
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
import CustomInputContainer from '@/components/utils/CustomInputContainer.vue'

export default {
  layout: 'dashboard',
  components: { TotalsCard, LightArrow, CustomInputContainer }, 
  data() { 
    return {

      // 

      // ADD NEW ACCOUNT DIALOG
      new_account: { id: 3, no: '110', name:'', type:'', d_type: 'Bank', tax: '', balance:'', b_balance: 'AED 65,500', status: 'paid', color: '#1AD598', action: '' },
      description: '',
      sub_account: '',
      as_of: '',


      allAccountsTypes: ['Type1', 'Type2'],
      allSubAccounts: ['Account1', 'Account2'],
      allTaxCodes: ['Code1', 'Code2'],
      allBalances: ['Balance1', 'Balance2'],
      isSubAccount: false,



      addNewDialog: false,
      actionsDialog: false,
      settingDialog: false,

      // SNACKBAR
      printedSnackbar: { snackbar: false, text: 'Successfully', color: 'success', timeout: 2000 },
      itemAddedSnackbar : { snackbar: false, text: 'Item Added Successfully', color: 'success', timeout: 2000 },

      // FILTER
      filterDialog: false,
      filter_by: [ 'All', 'Week to date', 'This month to date', 'This quarter to date', 'This year to date', 'Specific dates'], 
      customerFilter: ['All', 'Other',],
      statusFilter: ['Paid', 'Unpaid'],
      daysOfWeek: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      monthsOfYear: ['Jan', 'Feb', 'Mar', 'Apr'],
      Years: [2022, 2021, 2020],
      customDataDisabled: true,


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
  },
  methods: {
    handleAddNewItem() {
      this.all_data.push(this.new_account)
      this.addNewDialog = false
      this.itemAddedSnackbar.snackbar = true
    },
    handlePrint() {
      this.printedSnackbar = { snackbar: true, text: 'Printed Successfully', color: 'success', timeout: 2000 }
    },
    handleApplyFilter() {
      this.filterDialog = false
    },
  }
}
</script>

<template>
  <v-row class="wrapper_row">

    <!-- ADD NEW INVOICE -->
    <v-dialog v-model="addNewInvoiceDialog" class="ma-0 pa-0" style="height: 100vh !important">
      <div class="my_dialog">
        <v-card id="tall_dialog">
          <v-card-title id="card-title">
              <h4 class="text--text" v-if="stage==0">Invoice #255</h4>
              <v-btn class="tall__btn" color="text" min-width="150px" icon v-if="stage==1" @click="stage--">
                <v-icon small color="text" class="mr-2">fa-close</v-icon>
                Go Back
              </v-btn>
              <div class="flex_row justify-lg-space-between">
                <v-btn class="tall__btn mr-2 px-5" color="subtext" outlined @click="addNewInvoiceDialog=false" v-if="stage==0">Close</v-btn>
                <v-btn class="tall__btn px-9" color="primary" min-width="150px" v-if="stage==0" @click="stage++">Show Invoice</v-btn>
                <v-btn class="tall__btn mr-2 px-5" color="subtext" outlined v-if="stage==1" onclick="window.open('MyPDF.pdf', '_blank', 'fullscreen=yes'); return false;"><v-icon class="mr-2" small>fa-download</v-icon>Download</v-btn>
                <v-btn class="tall__btn mr-2 px-5" color="subtext" outlined v-if="stage==1" @click="print"><v-icon class="mr-2" small>fa-print</v-icon>Print</v-btn>
                <v-btn class="tall__btn px-9" color="primary" min-width="150px" v-if="stage==1" @click="handleSaveInvoice(new_invoice_data)"><v-icon class="mr-2" small>fa-check</v-icon>Create Invoice</v-btn>
              </div>
          </v-card-title>
          <v-divider id="divider" class="mt-5"></v-divider>
          <v-card-text id="card-text">

            <!-- ADDING INVOICES -->
            <v-container v-if="stage==0">

              <!-- INPUTS -->
              <v-row>
                
                <v-col cols="3" class="pa-0">
                    <v-col cols="12">
                      <CustomInputContainer label="Customer">
                        <div slot="input">
                          <v-select v-model="new_invoice.customer" :items="sales_data.customer" placeholder="Enter Customer Name" outlined hide-details></v-select>
                        </div>
                      </CustomInputContainer>
                    </v-col>
                    <v-col cols="12">
                      <CustomInputContainer label="Customer Email">
                        <div slot="input">
                          <v-text-field v-model="new_invoice.email" placeholder="Enter Customer Email" outlined hide-details></v-text-field>
                        </div>
                      </CustomInputContainer>
                    </v-col>
                </v-col>

                <v-col cols="3" class="pa-0">
                  <v-col cols="12">
                    <CustomInputContainer label="Amount">
                      <div slot="input">
                        <v-text-field v-model="new_invoice.amount" placeholder="Enter Terms" outlined hide-details></v-text-field>
                      </div>
                    </CustomInputContainer>
                  </v-col>
                  <v-col cols="12">
                    <CustomInputContainer label="Tax">
                      <div slot="input">
                        <v-text-field v-model="new_invoice.tax" placeholder="Enter Tax" outlined hide-details></v-text-field>
                      </div>
                    </CustomInputContainer>
                  </v-col>
                </v-col>

                <v-col cols="3" class="pa-0">
                  <v-col cols="12">
                    <CustomInputContainer label="Due date">
                    <div slot="input">
                      <v-text-field v-model="new_invoice.due_date" placeholder="Enter Due Date" outlined hide-details></v-text-field>
                    </div>
                  </CustomInputContainer>
                  </v-col>
                  <v-col cols="12">
                    <CustomInputContainer label="Terms">
                    <div slot="input">
                      <v-text-field v-model="new_invoice.terms" placeholder="Enter Invoice Terms" outlined hide-details></v-text-field>
                    </div>
                  </CustomInputContainer>
                  </v-col>
                </v-col>

                
                <v-col cols="3" class="pa-0">
                  <v-col cols="12">
                    <CustomInputContainer label="Invoice Date">
                    <div slot="input">
                      <v-text-field v-model="new_invoice.date" placeholder="Enter Date" outlined hide-details></v-text-field>
                    </div>
                  </CustomInputContainer>
                  </v-col>
                  <v-col cols="12">
                    <CustomInputContainer label="Location">
                    <div slot="input">
                      <v-text-field v-model="new_invoice.location" placeholder="Enter Location " outlined hide-details></v-text-field>
                    </div>
                  </CustomInputContainer>
                  </v-col>
                </v-col>
                
                <v-row>
                  <v-spacer></v-spacer>
                  <v-btn class="tall__btn mr-2 mt-2" outlined color="error" @click="clear"><v-icon small color="error">fa-close</v-icon></v-btn>
                  <v-btn class="tall__btn mr-5 mt-2" outlined color="primary" @click="handleAddInvoiceToThePreviewTable(new_invoice)"><v-icon small color="primary">fa-plus</v-icon></v-btn>
                </v-row>
              </v-row>

              <!-- OUTPUTS -->
              <v-row class="mt-9">
                <v-col cols="12">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr class="outline">
                          <th v-for="item in addNewInvoicePreviewTableHeaders" :key="item" class="text-left">{{ item }}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in new_invoice_data" :key="item">
                          <td>#</td>
                          <td>{{ item.amount }}</td>
                          <td>{{ item.due_date }}</td>
                          <td>{{ item.date }}</td>
                          <td>1</td>
                          <td>0</td>
                          <td>{{ item.terms }}</td>
                          <td>{{ item.tax }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
              
            </v-container>


            <!-- PREVIEWING INVOICE -->
            <v-container class="inv_con ma-0 pa-0" v-if="stage==1">
              <div class="a4__con mx-auto" style="max-width: 900px;min-height: 85vh;">
                
                <!-- PDF HEADER -->
                <v-row class="ma-0 pa-0">
                  <v-col cols="8">
                    <div class="n__logo">
                      <h1 class="primary--text my-5">Nathan&Nathan</h1>
                    </div>
                  </v-col>
                </v-row>
                <v-row class="ma-0 pa-0">
                  <v-col cols="6">
                    <p class="ma-0 pa-0 text--text">Office 1005, 10Th Floor, Marina Plaza, Dubai Marina</p>
                    <p class="ma-0 pa-0 text--text">Dubai, UAE 68128 AE</p>
                    <p class="ma-0 pa-0 text--text">Accounts@Nathanhr.Com www.nathanhr.com</p>
                    <p class="ma-0 pa-0 text--text">federal tax authority registration no.: 100323347300003</p>
                  </v-col>
                </v-row>
                
                <!-- INVOICE DETAILS -->
                <h1 class="ml-3 py-3 text--text">Invoice</h1>
                <v-row class="ma-0 pa-0">
                  <v-col cols="5">
                    <h5 class="ma-0 pa-0 pb-2 subtext--text">Invoice Details</h5>
                    <p class="ma-0 pa-0 text--text">{{invoice_pdf.c_name}}</p>
                    <p class="ma-0 pa-0 text--text">{{invoice_pdf.address}}</p>
                    <p class="ma-0 pa-0 text--text">{{invoice_pdf.country}}</p>
                    <p class="ma-0 pa-0 text--text">{{invoice_pdf.vat_no}}</p>
                    <v-col cols="auto" class="px-0">
                      <h5 class="ma-0 pa-0 pb-2 subtext--text">Invoice No.</h5>
                      <p class="ma-0 pa-0 text--text">{{invoice_pdf.invoice_no}}</p>
                    </v-col>
                  </v-col>
                  <v-col cols="5">
                    <v-col cols="auto">
                      <h5 class="ma-0 pa-0 pb-2 subtext--text">Invoice No.</h5>
                      <p class="ma-0 pa-0 text--text">{{invoice_pdf.invoice_no}}</p>
                    </v-col>
                    <v-row>
                      <v-col cols="6">
                        <h5 class="ma-0 pa-0 pb-2 subtext--text">Invoice Date</h5>
                        <p class="ma-0 pa-0 text--text">{{invoice_pdf.date}}</p>
                      </v-col>
                      <v-col cols="6">
                        <h5 class="ma-0 pa-0 pb-2 subtext--text">Invoice Due Date</h5>
                        <p class="ma-0 pa-0 text--text">{{invoice_pdf.due_date}}</p>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>

                <!-- INPUTS -->
                <v-row class="mt-9 mb-0 pb-0">
                  <v-spacer></v-spacer>
                  <v-col cols="12">
                    <v-simple-table
                      fixed-header
                    >
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-center text--text">Pro/Ser</th>
                            <th class="text-center text--text">Tax</th>
                            <th class="text-center text--text">Rate</th>
                            <th class="text-center text--text">Qty</th>
                            <th class="text-center text--text">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="outline">
                            <td class="text-center font-weight-medium" v-for="item in invoice_pdf.input" :key="item">{{ item }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-col>
                  <v-spacer></v-spacer>

                </v-row>

                <!-- FOOTER -->
                <div class="mx-auto mt-9 pt-9 text-center">
                  <span class="subtext--text ">This Is A System Generated Invoice And Does Not Require Signature.</span>
                </div>
                
              </div>
            </v-container>

          </v-card-text>
        </v-card>
      </div>
    </v-dialog>

    <v-row class="row1">
      <v-col sm="12" md="12" lg="12">
        <v-card color="card_bg" id="card">
          <v-card-text id="card-text" style="margin-top: 0 !important;">

            <v-data-table id="ALL_SALES" v-if="currentTab == 'all'"
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
                      <v-list-item v-for="(item, index) in new_transaction_menu" :key="index" link  @click="handleNewTransaction(item.title)">
                      <v-list-item-title class="">
                          <span class="n_text text--text ml-2">{{ item.title }}</span>
                      </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
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
                    <v-checkbox color="info" on-icon="fa-light fa-square-check" off-icon="fa-regular fa-square" class="mx-auto mb-2" dense hide-details :v-model="sales_selected" ></v-checkbox>
                  </div>
                </td>
                <td class="pa-0 ma-0">{{ item.date }}</td>
                <td class="pa-0 ma-0">{{ item.customer }}</td>
                <td class="pa-0 ma-0">{{ item.type }}</td>
                <td class="pa-0 ma-0">{{ item.due_date }}</td>
                <td class="pa-0 ma-0">{{ item.tax }}</td>
                <td class="pa-0 ma-0">{{ item.tax }}</td>
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
import CustomInputContainer from '@/components/utils/CustomInputContainer.vue'

export default {
  layout: 'dashboard',
  components: { TotalsCard, LightArrow, CustomInputContainer }, 
  data() { 
    return {


      // CURRENT SELECTED COMPANY DATA
      current_selected_company_data: {
        name: '',
        email: '',
        phone: '',
        address: '',
      },


      // INVOICE TEMPLATE PDF DATA
      invoice_pdf: {
        invoice_no: 'DF-2206-663',
        date: '2022-06-23',
        due_date: '2022-06-23',
        po_no: '460695',
        c_name: 'EasyBox',
        address: 'San Francisco, CA 94114-8777',
        country: 'United States',
        vat_no: 'Vat No. 86-2769183',
        input: ['Item 1', '1%', '12023', '1', 'AED 10,900']
      },

      // ADD NEW INVOICE
      addNewInvoiceDialog : false,
      stage: 1,
      new_invoice: {},
      new_invoice_data: [],
      addNewInvoicePreviewTableHeaders: [
        '#',
        'Service Date',
        'Product/Service',
        'Description',
        'QTY',
        'Rate',
        'Amount',
        'Tax',
      ],



      // *** MAIN SALES DATA ***
      sales_headers: [
        { text: 'Date', value: 'date', align: 'start' },
        { text: 'Customer', value: 'customer' },
        { text: 'Type', value: 'type' },
        { text: 'Due Date', value: 'due_date' },
        { text: 'Before Tax', value: 'tax' },
        { text: 'Tax', value: 'tax' },
        { text: 'Total', value: 'amount' },
        { text: 'Status', value: 'status', align: 'center' },
        { text: 'Action', sortable: false },
      ],
      sales_data: [
        {
          no: '1001',
          data: '22-05-2022',
          due_date: '22-05-2022',
          type: 'invoice',
          amount: '00',
          status: 'paid',
          customer: 'bushra aboubida',
          phone: '055532323',
          email: 'email@email.com',
          location: 'Dubai',
          tax: '0.5%',
          terms: '1',
          color: '#1AD598',
        },
        {
          no: '1001',
          data: '22-05-2022',
          due_date: '22-05-2022',
          type: 'payment',
          amount: '00',
          status: 'closed',
          customer: 'osama aboubida',
          phone: '055532323',
          email: 'email@email.com',
          location: 'Dubai',
          tax: '0.5%',
          terms: '1',
          color: '#FFB536',
        },
      ],



      // OTHERS
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
    }
  },
  methods: {
    print() {
      window.print()
    },
    handleSaveInvoice(value) {
      // this.sales_data.push(...value)
      console.log('final objects ==>', value)
    },
    handleAddInvoiceToThePreviewTable(value) {
      this.new_invoice_data.push(this.new_invoice)
      this.new_invoice = {}
    },
    clear(){
      this.new_invoice = {}
    },
    handleNewTransaction(value) {
      if(value=='Invoice') {
        this.addNewInvoiceDialog=!this.addNewInvoiceDialog
      } else if(value=='Payment') {
        this.addNewPaymentDialog=!this.addNewPaymentDialog
      } else if(value=='Estimate') {
        this.addNewEstimateDialog=!this.addNewEstimateDialog
      } else if(value=='Sales Reciept') {
        this.addNewSalesDialog=!this.addNewSalesDialog
      } else if(value=='Tax Credit Note') {
        this.addNewTaxDialog=!this.addNewTaxDialog
      } else if(value=='Time Activity') {
        this.addNewActivityDialog=!this.addNewActivityDialog
      } else if(value=='Journal Entry') {
        this.addNewEntryDialog=!this.addNewEntryDialog
      } 
    },
    handleShowInvoice() {
      this.addNewInvoicePreviewTableData.push({no: '#',service: '0-0-2020',product: 'ERP',description: 'lorem ipsum..',qty: '1',rate: '1044',amount: '20,890',tax: '1%'})
      this.invoices_data.push(this.addNewInvoicePreviewTableData)
    },
    changeTab(event){
      this.currentTab = event
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
}
</script>
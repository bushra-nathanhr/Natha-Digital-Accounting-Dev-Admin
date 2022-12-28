<template>
  <v-row class="wrapper_row">


    <!-- ADD NEW INVOICE DIALOG -->
    <v-dialog v-model="addNewInvoiceDialog" class="ma-0 pa-0" style="height: 100vh !important">
      <div class="my_dialog">
        <v-card id="tall_dialog">
          <v-card-title id="card-title">
              <h4 class="text--text" v-if="stage=='default'">Invoice #255</h4>
              <h4 class="text--text" v-if="stage=='recurring'">Recurring Invoice</h4>
              <v-btn class="tall__btn" color="text" min-width="150px" icon v-if="stage==='pdf'" @click="stage='default'">
                <v-icon small color="text" class="mr-2">fa-close</v-icon>
                Go Back
              </v-btn>
              <div class="flex_row justify-lg-space-between">
                <h4 class="text--text mr-9" v-if="stage=='recurring'">Balance due : 0.00</h4>
                <v-btn class="tall__btn mr-2 px-5" color="subtext" outlined @click="addNewInvoiceDialog=false">Close</v-btn>
                <v-btn class="tall__btn mr-2 px-5" color="subtext" outlined @click="stage='recurring'" v-if="stage==='default'">Make Recurring</v-btn>
                <v-btn class="tall__btn mr-2 px-5" color="subtext" outlined @click="stage='default'" v-if="stage==='recurring'">Not Recurring</v-btn>
                <v-btn class="tall__btn px-9" color="primary" min-width="150px" v-if="stage==='default'||stage==='recurring'" @click="stage='pdf'">View Invoice</v-btn>
                <v-btn class="tall__btn mr-2 px-5" color="subtext" outlined v-if="stage==='pdf'" onclick="window.open('MyPDF.pdf', '_blank', 'fullscreen=yes'); return false;"><v-icon class="mr-2" small>fa-download</v-icon>Download</v-btn>
                <v-btn class="tall__btn mr-2 px-5" color="subtext" outlined v-if="stage==='pdf'" @click="print"><v-icon class="mr-2" small>fa-print</v-icon>Print</v-btn>
                <v-btn class="tall__btn px-9" color="primary" min-width="150px" v-if="stage==='pdf'" @click="handleSaveInvoice(new_invoice_data)"><v-icon class="mr-2" small>fa-check</v-icon>Create Invoice</v-btn>
              </div>
          </v-card-title>
          <v-divider id="divider" class="mt-5"></v-divider>
          <v-card-text id="card-text">

            <!-- ADDING INVOICES -->
            <v-container v-if="stage==='default'">

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
            <v-container class="inv_con ma-0 pa-0" v-if="stage==='pdf'">
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


            <!-- MAKE RECURRING -->
            <v-container v-if="stage==='recurring'">

              <!-- INPUTS -->
              <v-row>
                
                <v-row>
                  <v-col cols="3">
                    <CustomInputContainer label="Template name">
                      <div slot="input">
                        <v-text-field v-model="new_invoice.amount" placeholder="Enter Type" outlined hide-details></v-text-field>
                      </div>
                    </CustomInputContainer>
                  </v-col>
                  <v-col cols="3">
                    <CustomInputContainer label="Type">
                      <div slot="input">
                        <v-select v-model="new_invoice.customer" :items="sales_data.customer" placeholder="Enter Type" outlined hide-details></v-select>
                      </div>
                    </CustomInputContainer>
                  </v-col>
                  <v-col cols="2">
                    <CustomInputContainer label="Create">
                      <div slot="input">
                        <v-text-field v-model="new_invoice.amount" placeholder="Enter Create" outlined hide-details></v-text-field>
                      </div>
                    </CustomInputContainer>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="4">
                    <CustomInputContainer label="Customer">
                      <div slot="input">
                        <v-text-field v-model="new_invoice.amount" placeholder="Enter Customer" outlined hide-details></v-text-field>
                      </div>
                    </CustomInputContainer>
                  </v-col>
                  <v-col cols="4">
                    <CustomInputContainer label="Customer Email">
                      <div slot="input">
                        <v-text-field v-model="new_invoice.amount" placeholder="Enter Customer Email" outlined hide-details></v-text-field>
                      </div>
                    </CustomInputContainer>
                  </v-col>
                </v-row>

                <v-row class="mt-9">
                  <v-col cols="2">
                    <CustomInputContainer label="Interval">
                      <div slot="input">
                        <v-select v-model="new_invoice.customer" :items="sales_data.customer" placeholder="Interval" outlined hide-details></v-select>
                      </div>
                    </CustomInputContainer>
                  </v-col>                  
                  <v-col cols="2">
                    <CustomInputContainer label="Interval">
                      <div slot="input">
                        <v-select v-model="new_invoice.customer" :items="sales_data.customer" placeholder="Interval" outlined hide-details></v-select>
                      </div>
                    </CustomInputContainer>
                  </v-col>                  
                  <v-col cols="2">
                    <CustomInputContainer label="Start date">
                      <div slot="input">
                        <v-select v-model="new_invoice.customer" :items="sales_data.customer" placeholder="Start date" outlined hide-details></v-select>
                      </div>
                    </CustomInputContainer>
                  </v-col>                  
                  <v-col cols="2">
                    <CustomInputContainer label="End Date">
                      <div slot="input">
                        <v-select v-model="new_invoice.customer" :items="sales_data.customer" placeholder="End Date" outlined hide-details></v-select>
                      </div>
                    </CustomInputContainer>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="3" class="pb-0 mb-0">
                    <CustomInputContainer label="Billing Address" class="pb-0 mb-0">
                      <div slot="input">
                        <v-textarea placeholder="Enter Billing Address" hide-details flat solo outlined color="primary"></v-textarea>
                      </div>
                    </CustomInputContainer>
                  </v-col>
                  <v-col cols="3">
                    <div class="flex_column">
                    <CustomInputContainer label="Terms">
                      <div slot="input">
                        <v-text-field v-model="new_invoice.amount" placeholder="Enter Terms" outlined hide-details></v-text-field>
                      </div>
                    </CustomInputContainer>
                    <CustomInputContainer label="Sale Location" class="mt-3">
                      <div slot="input">
                        <v-text-field v-model="new_invoice.amount" placeholder="Enter Sale Location" outlined hide-details></v-text-field>
                      </div>
                    </CustomInputContainer>
                    </div>
                  </v-col>
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

          </v-card-text>
        </v-card>
      </div>
    </v-dialog>

    <!-- ADD NEW PAYMENT DIALOG -->
    <v-dialog v-model="addNewPaymentDialog" class="ma-0 pa-0">
      <div class="my_dialog">
        <v-card id="tall_dialog">
          <v-card-title id="card-title">
              <h4 class="text--text">Payment #255</h4>
              <div class="flex_row justify-lg-space-between">
                <!-- <v-btn class="tall__btn mr-2 px-5" color="subtext" outlined>Make Recuring</v-btn> -->
                <v-btn class="tall__btn mr-2 px-5" color="subtext" outlined @click="addNewPaymentDialog=false">Done</v-btn>
                <v-btn class="tall__btn px-9" color="primary" min-width="150px" @click="handleAddNewPayment" :disabled="!enabled">Add Payment</v-btn>
              </div>
          </v-card-title>
          <v-divider id="divider" class="mt-5"></v-divider>
          <v-card-text id="card-text" class="mt-0 pt-0">
            <v-container>

                <!-- INPUTS -->
                <v-row>
                
                  <v-row>
                    <v-col cols="3">
                        <CustomInputContainer label="Customer">
                        <div slot="input">
                            <v-select v-model="new_invoice.customer" :items="allCustomers" placeholder="Enter Customer Name" outlined hide-details></v-select>
                        </div>
                        </CustomInputContainer>
                    </v-col>
                    <v-col cols="3">
                        <CustomInputContainer label="Email">
                        <div slot="input">
                            <v-text-field v-model="new_invoice.email" placeholder="Enter Email" outlined hide-details></v-text-field>
                        </div>
                        </CustomInputContainer>
                    </v-col>
                  </v-row>

                <v-row>
                      <v-col cols="3">
                      <CustomInputContainer label="Payment Date">
                          <div slot="input">
                          <v-text-field v-model="new_invoice.terms" placeholder="Select Payment Date" outlined hide-details></v-text-field>
                          </div>
                      </CustomInputContainer>
                      </v-col>
                      <v-col cols="3">
                      <CustomInputContainer label="Payment Method">
                          <div slot="input">
                          <v-text-field v-model="new_invoice.date" placeholder="Enter Date" outlined hide-details></v-text-field>
                          </div>
                      </CustomInputContainer>
                      </v-col>
                      <v-col cols="3">
                      <CustomInputContainer label="Ref no">
                          <div slot="input">
                          <v-text-field v-model="new_invoice.date" placeholder="Enter Date" outlined hide-details></v-text-field>
                          </div>
                      </CustomInputContainer>
                      </v-col>
               </v-row>

               <v-row>
                <v-col cols="6" class="pa-0">
                    <v-col cols="12">
                    <CustomInputContainer label="Description">
                    <div slot="input">
                        <v-text-field v-model="new_invoice.dueDate" placeholder="Enter Description" outlined hide-details></v-text-field>
                    </div>
                    </CustomInputContainer>
                    </v-col>
                </v-col>
              </v-row>
                
                </v-row>

                <!-- OUTPUTS-01 -->
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
                        <tr v-for="item in addNewInvoicePreviewTableData" :key="item.name">
                            <td>{{ item.no }}</td>
                            <td>{{ item.service }}</td>
                            <td>{{ item.product }}</td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.qty }}</td>
                            <td>{{ item.rate }}</td>
                            <td>{{ item.amount }}</td>
                            <td>{{ item.tax }}</td>
                        </tr>
                        </tbody>
                    </template>
                    </v-simple-table>
                </v-col>
                </v-row>

                
                <!-- OUTPUTS-02 -->
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
                        <tr v-for="item in addNewInvoicePreviewTableData" :key="item.name">
                            <td>{{ item.no }}</td>
                            <td>{{ item.service }}</td>
                            <td>{{ item.product }}</td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.qty }}</td>
                            <td>{{ item.rate }}</td>
                            <td>{{ item.amount }}</td>
                            <td>{{ item.tax }}</td>
                        </tr>
                        </tbody>
                    </template>
                    </v-simple-table>
                </v-col>
                </v-row>

                </v-container>
          </v-card-text>
        </v-card>
      </div>
    </v-dialog>

    <!-- ADD ESTIMATE DIALOG -->
    <v-dialog v-model="addNewEstimateDialog" class="ma-0 pa-0">
      <div class="my_dialog">
        <v-card id="tall_dialog">
          <v-card-title id="card-title">
              <h4 class="text--text">Estimate #255</h4>
              <div class="flex_row justify-lg-space-between">
                <!-- <v-btn class="tall__btn mr-2 px-5" color="subtext" outlined>Make Recuring</v-btn> -->
                <v-btn class="tall__btn mr-2 px-5" color="subtext" outlined @click="addNewEstimateDialog=false">Done</v-btn>
                <v-btn class="tall__btn px-9" color="primary" min-width="150px" @click="handleAddNewPayment" :disabled="!enabled">Add Estimate</v-btn>
              </div>
          </v-card-title>
          <v-divider id="divider" class="mt-5"></v-divider>
          <v-card-text id="card-text" class="mt-0 pt-0">
            <v-container>

                <!-- INPUTS -->
                <v-row>
                  
                  <v-row>

                    <v-col cols="3">
                      <div class="flex_column">
                        <CustomInputContainer label="Customer">
                        <div slot="input">
                            <v-select v-model="new_invoice.customer" :items="allCustomers" placeholder="Enter Customer Name" outlined hide-details></v-select>
                        </div>
                      </CustomInputContainer>
                      <CustomInputContainer label="Email" class="mt-3">
                        <div slot="input">
                            <v-text-field v-model="new_invoice.email" placeholder="Enter Email" outlined hide-details></v-text-field>
                        </div>
                      </CustomInputContainer>
                      </div>
                    </v-col>

                    <v-col cols="3" class="pb-0">
                      <CustomInputContainer label="Billing Address"  class="pb-0">
                        <div slot="input">
                            <v-textarea v-model="new_invoice.customer" placeholder="Enter Billing Address" color="primary" class="pb-0" outlined solo flat hide-details height="100%"></v-textarea>
                        </div>
                      </CustomInputContainer>
                    </v-col>

                    <v-col cols="3">
                      <div class="flex_column">
                        <CustomInputContainer label="Estimate date">
                          <div slot="input">
                              <v-text-field v-model="new_invoice.email" placeholder="Enter Estimate date" outlined hide-details></v-text-field>
                          </div>
                        </CustomInputContainer>
                        <CustomInputContainer label="Due date" class="mt-3">
                        <div slot="input">
                            <v-text-field v-model="new_invoice.email" placeholder="Enter Due date" outlined hide-details></v-text-field>
                        </div>
                      </CustomInputContainer>
                      </div>
                    </v-col>

                    <v-col cols="3">
                      <div class="flex_column">
                        <CustomInputContainer label="Sale Location">
                          <div slot="input">
                              <v-text-field v-model="new_invoice.email" placeholder="Enter Sale Location" outlined hide-details></v-text-field>
                          </div>
                        </CustomInputContainer>
                        <CustomInputContainer label="Estimate no." class="mt-3">
                        <div slot="input">
                            <v-text-field v-model="new_invoice.email" placeholder="Enter Estimate no." outlined hide-details></v-text-field>
                        </div>
                      </CustomInputContainer>
                      </div>
                    </v-col>

                  </v-row>


                </v-row>

                <!-- OUTPUTS-01 -->
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
                        <tr v-for="item in addNewInvoicePreviewTableData" :key="item.name">
                            <td>{{ item.no }}</td>
                            <td>{{ item.service }}</td>
                            <td>{{ item.product }}</td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.qty }}</td>
                            <td>{{ item.rate }}</td>
                            <td>{{ item.amount }}</td>
                            <td>{{ item.tax }}</td>
                        </tr>
                        </tbody>
                    </template>
                    </v-simple-table>
                </v-col>
                </v-row>

                </v-container>
          </v-card-text>
        </v-card>
      </div>
    </v-dialog>
    
    <!-- ADD SALES RECIEPT DIALOG -->
    <v-dialog v-model="addNewSalesRecieptDialog" class="ma-0 pa-0">
      <div class="my_dialog">
        <v-card id="tall_dialog">
          <v-card-title id="card-title">
              <h4 class="text--text">Sales Reciept #255</h4>
              <div class="flex_row justify-lg-space-between">
                <!-- <v-btn class="tall__btn mr-2 px-5" color="subtext" outlined>Make Recuring</v-btn> -->
                <v-btn class="tall__btn mr-2 px-5" color="subtext" outlined @click="addNewPaymentDialog=false">Done</v-btn>
                <v-btn class="tall__btn px-9" color="primary" min-width="150px" @click="handleAddNewPayment" :disabled="!enabled">Add Payment</v-btn>
              </div>
          </v-card-title>
          <v-divider id="divider" class="mt-5"></v-divider>
          <v-card-text id="card-text" class="mt-0 pt-0">
            <v-container>

                <!-- INPUTS -->
                <v-row>
                
                  <v-row>
                    <v-col cols="3">
                        <CustomInputContainer label="Customer">
                        <div slot="input">
                            <v-select v-model="new_invoice.customer" :items="allCustomers" placeholder="Enter Customer Name" outlined hide-details></v-select>
                        </div>
                        </CustomInputContainer>
                    </v-col>
                    <v-col cols="3">
                        <CustomInputContainer label="Email">
                        <div slot="input">
                            <v-text-field v-model="new_invoice.email" placeholder="Enter Email" outlined hide-details></v-text-field>
                        </div>
                        </CustomInputContainer>
                    </v-col>
                  </v-row>

                <v-row>
                      <v-col cols="3">
                      <CustomInputContainer label="Payment Date">
                          <div slot="input">
                          <v-text-field v-model="new_invoice.terms" placeholder="Select Payment Date" outlined hide-details></v-text-field>
                          </div>
                      </CustomInputContainer>
                      </v-col>
                      <v-col cols="3">
                      <CustomInputContainer label="Payment Method">
                          <div slot="input">
                          <v-text-field v-model="new_invoice.date" placeholder="Enter Date" outlined hide-details></v-text-field>
                          </div>
                      </CustomInputContainer>
                      </v-col>
                      <v-col cols="3">
                      <CustomInputContainer label="Ref no">
                          <div slot="input">
                          <v-text-field v-model="new_invoice.date" placeholder="Enter Date" outlined hide-details></v-text-field>
                          </div>
                      </CustomInputContainer>
                      </v-col>
               </v-row>

               <v-row>
                <v-col cols="6" class="pa-0">
                    <v-col cols="12">
                    <CustomInputContainer label="Description">
                    <div slot="input">
                        <v-text-field v-model="new_invoice.dueDate" placeholder="Enter Description" outlined hide-details></v-text-field>
                    </div>
                    </CustomInputContainer>
                    </v-col>
                </v-col>
              </v-row>
                
                </v-row>

                <!-- OUTPUTS-01 -->
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
                        <tr v-for="item in addNewInvoicePreviewTableData" :key="item.name">
                            <td>{{ item.no }}</td>
                            <td>{{ item.service }}</td>
                            <td>{{ item.product }}</td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.qty }}</td>
                            <td>{{ item.rate }}</td>
                            <td>{{ item.amount }}</td>
                            <td>{{ item.tax }}</td>
                        </tr>
                        </tbody>
                    </template>
                    </v-simple-table>
                </v-col>
                </v-row>

                
                <!-- OUTPUTS-02 -->
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
                        <tr v-for="item in addNewInvoicePreviewTableData" :key="item.name">
                            <td>{{ item.no }}</td>
                            <td>{{ item.service }}</td>
                            <td>{{ item.product }}</td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.qty }}</td>
                            <td>{{ item.rate }}</td>
                            <td>{{ item.amount }}</td>
                            <td>{{ item.tax }}</td>
                        </tr>
                        </tbody>
                    </template>
                    </v-simple-table>
                </v-col>
                </v-row>

                </v-container>
          </v-card-text>
        </v-card>
      </div>
    </v-dialog>
        
    <!-- ADD TAX CREDIT NOTE DIALOG -->
    <v-dialog v-model="addNewTaxCreditNoteDialog" class="ma-0 pa-0">
      <div class="my_dialog">
        <v-card id="tall_dialog">
          <v-card-title id="card-title">
              <h4 class="text--text">Tax Credit Note #255</h4>
              <div class="flex_row justify-lg-space-between">
                <!-- <v-btn class="tall__btn mr-2 px-5" color="subtext" outlined>Make Recuring</v-btn> -->
                <v-btn class="tall__btn mr-2 px-5" color="subtext" outlined @click="addNewTaxCreditNoteDialog=false">Done</v-btn>
                <v-btn class="tall__btn px-9" color="primary" min-width="150px" @click="handleAddNewPayment" :disabled="!enabled">Add Payment</v-btn>
              </div>
          </v-card-title>
          <v-divider id="divider" class="mt-5"></v-divider>
          <v-card-text id="card-text" class="mt-0 pt-0">
            <v-container>

                <!-- INPUTS -->
                <v-row>
                
                  <v-row>
                    <v-col cols="3">
                        <CustomInputContainer label="Customer">
                        <div slot="input">
                            <v-select v-model="new_invoice.customer" :items="allCustomers" placeholder="Enter Customer Name" outlined hide-details></v-select>
                        </div>
                        </CustomInputContainer>
                    </v-col>
                    <v-col cols="3">
                        <CustomInputContainer label="Email">
                        <div slot="input">
                            <v-text-field v-model="new_invoice.email" placeholder="Enter Email" outlined hide-details></v-text-field>
                        </div>
                        </CustomInputContainer>
                    </v-col>
                  </v-row>

                <v-row>
                      <v-col cols="3">
                      <CustomInputContainer label="Payment Date">
                          <div slot="input">
                          <v-text-field v-model="new_invoice.terms" placeholder="Select Payment Date" outlined hide-details></v-text-field>
                          </div>
                      </CustomInputContainer>
                      </v-col>
                      <v-col cols="3">
                      <CustomInputContainer label="Payment Method">
                          <div slot="input">
                          <v-text-field v-model="new_invoice.date" placeholder="Enter Date" outlined hide-details></v-text-field>
                          </div>
                      </CustomInputContainer>
                      </v-col>
                      <v-col cols="3">
                      <CustomInputContainer label="Ref no">
                          <div slot="input">
                          <v-text-field v-model="new_invoice.date" placeholder="Enter Date" outlined hide-details></v-text-field>
                          </div>
                      </CustomInputContainer>
                      </v-col>
               </v-row>

               <v-row>
                <v-col cols="6" class="pa-0">
                    <v-col cols="12">
                    <CustomInputContainer label="Description">
                    <div slot="input">
                        <v-text-field v-model="new_invoice.dueDate" placeholder="Enter Description" outlined hide-details></v-text-field>
                    </div>
                    </CustomInputContainer>
                    </v-col>
                </v-col>
              </v-row>
                
                </v-row>

                <!-- OUTPUTS-01 -->
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
                        <tr v-for="item in addNewInvoicePreviewTableData" :key="item.name">
                            <td>{{ item.no }}</td>
                            <td>{{ item.service }}</td>
                            <td>{{ item.product }}</td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.qty }}</td>
                            <td>{{ item.rate }}</td>
                            <td>{{ item.amount }}</td>
                            <td>{{ item.tax }}</td>
                        </tr>
                        </tbody>
                    </template>
                    </v-simple-table>
                </v-col>
                </v-row>

                
                <!-- OUTPUTS-02 -->
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
                        <tr v-for="item in addNewInvoicePreviewTableData" :key="item.name">
                            <td>{{ item.no }}</td>
                            <td>{{ item.service }}</td>
                            <td>{{ item.product }}</td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.qty }}</td>
                            <td>{{ item.rate }}</td>
                            <td>{{ item.amount }}</td>
                            <td>{{ item.tax }}</td>
                        </tr>
                        </tbody>
                    </template>
                    </v-simple-table>
                </v-col>
                </v-row>

                </v-container>
          </v-card-text>
        </v-card>
      </div>
    </v-dialog>
    
    <!-- ADD TIME ACTIVITY DIALOG -->
    <v-dialog v-model="addNewTimeActivityDialog" class="ma-0 pa-0">
      <div class="my_dialog">
        <v-card id="tall_dialog">
          <v-card-title id="card-title">
              <h4 class="text--text">Time Activity #255</h4>
              <div class="flex_row justify-lg-space-between">
                <!-- <v-btn class="tall__btn mr-2 px-5" color="subtext" outlined>Make Recuring</v-btn> -->
                <v-btn class="tall__btn mr-2 px-5" color="subtext" outlined @click="addNewTimeActivityDialog=false">Done</v-btn>
                <v-btn class="tall__btn px-9" color="primary" min-width="150px" @click="handleAddNewPayment" :disabled="!enabled">Add</v-btn>
              </div>
          </v-card-title>
          <v-divider id="divider" class="mt-5"></v-divider>
          <v-card-text id="card-text" class="mt-0 pt-0">
            <v-container>

                <!-- INPUTS -->
                <v-row>
                
                  <v-row>
                    <v-col cols="3">
                        <CustomInputContainer label="Customer">
                        <div slot="input">
                            <v-select v-model="new_invoice.customer" :items="allCustomers" placeholder="Enter Customer Name" outlined hide-details></v-select>
                        </div>
                        </CustomInputContainer>
                    </v-col>
                    <v-col cols="3">
                        <CustomInputContainer label="Email">
                        <div slot="input">
                            <v-text-field v-model="new_invoice.email" placeholder="Enter Email" outlined hide-details></v-text-field>
                        </div>
                        </CustomInputContainer>
                    </v-col>
                  </v-row>

                <v-row>
                      <v-col cols="3">
                      <CustomInputContainer label="Payment Date">
                          <div slot="input">
                          <v-text-field v-model="new_invoice.terms" placeholder="Select Payment Date" outlined hide-details></v-text-field>
                          </div>
                      </CustomInputContainer>
                      </v-col>
                      <v-col cols="3">
                      <CustomInputContainer label="Payment Method">
                          <div slot="input">
                          <v-text-field v-model="new_invoice.date" placeholder="Enter Date" outlined hide-details></v-text-field>
                          </div>
                      </CustomInputContainer>
                      </v-col>
                      <v-col cols="3">
                      <CustomInputContainer label="Ref no">
                          <div slot="input">
                          <v-text-field v-model="new_invoice.date" placeholder="Enter Date" outlined hide-details></v-text-field>
                          </div>
                      </CustomInputContainer>
                      </v-col>
               </v-row>

               <v-row>
                <v-col cols="6" class="pa-0">
                    <v-col cols="12">
                    <CustomInputContainer label="Description">
                    <div slot="input">
                        <v-text-field v-model="new_invoice.dueDate" placeholder="Enter Description" outlined hide-details></v-text-field>
                    </div>
                    </CustomInputContainer>
                    </v-col>
                </v-col>
              </v-row>
                
                </v-row>

                <!-- OUTPUTS-01 -->
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
                        <tr v-for="item in addNewInvoicePreviewTableData" :key="item.name">
                            <td>{{ item.no }}</td>
                            <td>{{ item.service }}</td>
                            <td>{{ item.product }}</td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.qty }}</td>
                            <td>{{ item.rate }}</td>
                            <td>{{ item.amount }}</td>
                            <td>{{ item.tax }}</td>
                        </tr>
                        </tbody>
                    </template>
                    </v-simple-table>
                </v-col>
                </v-row>

                
                <!-- OUTPUTS-02 -->
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
                        <tr v-for="item in addNewInvoicePreviewTableData" :key="item.name">
                            <td>{{ item.no }}</td>
                            <td>{{ item.service }}</td>
                            <td>{{ item.product }}</td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.qty }}</td>
                            <td>{{ item.rate }}</td>
                            <td>{{ item.amount }}</td>
                            <td>{{ item.tax }}</td>
                        </tr>
                        </tbody>
                    </template>
                    </v-simple-table>
                </v-col>
                </v-row>

                </v-container>
          </v-card-text>
        </v-card>
      </div>
    </v-dialog>

    <!-- ADD JOURNAL ENTRY DIALOG -->
    <v-dialog v-model="addNewJournalEntryDialog" class="ma-0 pa-0">
      <div class="my_dialog">
        <v-card id="tall_dialog">
          <v-card-title id="card-title">
              <h4 class="text--text">Journal Entry #255</h4>
              <div class="flex_row justify-lg-space-between">
                <!-- <v-btn class="tall__btn mr-2 px-5" color="subtext" outlined>Make Recuring</v-btn> -->
                <v-btn class="tall__btn mr-2 px-5" color="subtext" outlined @click="addNewJournalEntryDialog=false">Done</v-btn>
                <v-btn class="tall__btn px-9" color="primary" min-width="150px" @click="handleAddNewPayment" :disabled="!enabled">Add</v-btn>
              </div>
          </v-card-title>
          <v-divider id="divider" class="mt-5"></v-divider>
          <v-card-text id="card-text" class="mt-0 pt-0">
            <v-container>

                <!-- INPUTS -->
                <v-row>
                
                  <v-row>
                    <v-col cols="3">
                        <CustomInputContainer label="Customer">
                        <div slot="input">
                            <v-select v-model="new_invoice.customer" :items="allCustomers" placeholder="Enter Customer Name" outlined hide-details></v-select>
                        </div>
                        </CustomInputContainer>
                    </v-col>
                    <v-col cols="3">
                        <CustomInputContainer label="Email">
                        <div slot="input">
                            <v-text-field v-model="new_invoice.email" placeholder="Enter Email" outlined hide-details></v-text-field>
                        </div>
                        </CustomInputContainer>
                    </v-col>
                  </v-row>

                <v-row>
                      <v-col cols="3">
                      <CustomInputContainer label="Payment Date">
                          <div slot="input">
                          <v-text-field v-model="new_invoice.terms" placeholder="Select Payment Date" outlined hide-details></v-text-field>
                          </div>
                      </CustomInputContainer>
                      </v-col>
                      <v-col cols="3">
                      <CustomInputContainer label="Payment Method">
                          <div slot="input">
                          <v-text-field v-model="new_invoice.date" placeholder="Enter Date" outlined hide-details></v-text-field>
                          </div>
                      </CustomInputContainer>
                      </v-col>
                      <v-col cols="3">
                      <CustomInputContainer label="Ref no">
                          <div slot="input">
                          <v-text-field v-model="new_invoice.date" placeholder="Enter Date" outlined hide-details></v-text-field>
                          </div>
                      </CustomInputContainer>
                      </v-col>
               </v-row>

               <v-row>
                <v-col cols="6" class="pa-0">
                    <v-col cols="12">
                    <CustomInputContainer label="Description">
                    <div slot="input">
                        <v-text-field v-model="new_invoice.dueDate" placeholder="Enter Description" outlined hide-details></v-text-field>
                    </div>
                    </CustomInputContainer>
                    </v-col>
                </v-col>
              </v-row>
                
                </v-row>

                <!-- OUTPUTS-01 -->
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
                        <tr v-for="item in addNewInvoicePreviewTableData" :key="item.name">
                            <td>{{ item.no }}</td>
                            <td>{{ item.service }}</td>
                            <td>{{ item.product }}</td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.qty }}</td>
                            <td>{{ item.rate }}</td>
                            <td>{{ item.amount }}</td>
                            <td>{{ item.tax }}</td>
                        </tr>
                        </tbody>
                    </template>
                    </v-simple-table>
                </v-col>
                </v-row>

                
                <!-- OUTPUTS-02 -->
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
                        <tr v-for="item in addNewInvoicePreviewTableData" :key="item.name">
                            <td>{{ item.no }}</td>
                            <td>{{ item.service }}</td>
                            <td>{{ item.product }}</td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.qty }}</td>
                            <td>{{ item.rate }}</td>
                            <td>{{ item.amount }}</td>
                            <td>{{ item.tax }}</td>
                        </tr>
                        </tbody>
                    </template>
                    </v-simple-table>
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


    <!-- SNACKBAR -->
    <SnackBar :data="snackbar_data" />


    <!-- *** TOTALS CARDS *** -->
    <TotalsCard v-if="currentTab == 'all'" :data="total_sales" />
    <TotalsCard v-if="currentTab == 'invoices'" :data="total_invoices" />
    <TotalsCard v-if="currentTab == 'forecast'" :data="total_forecast" />



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
    <v-row class="row1">
      <v-col sm="12" md="12" lg="12">
        <v-card color="card_bg" id="card">
          <v-card-text id="card-text" style="margin-top: 0 !important;">
            <!-- main objs: item_headers / item_data / item_search / item_selected -->


            
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
import CustomInputContainer from '@/components/utils/CustomInputContainer.vue'
import SnackBar from '~/components/utils/SnackBar.vue'

export default {
  layout: 'dashboard',
  components: { TotalsCard, LightArrow, CustomInputContainer, SnackBar }, 
  data() { 
    return {

      // ADD NEW TIME ACTIVITY DIALOG
      addNewTimeActivityDialog: false,

      // ADD NEW TAX CREDIT NOTE DIALOG
      addNewTaxCreditNoteDialog: false,

      // ADD NEW SALES RECIEPT DIALOG
      addNewSalesRecieptDialog: false,

      // ADD NEW ESTIMATE DIALOG
      addNewEstimateDialog: false,

      // ADD NEW PAYMENT DIALOG
      addNewPaymentDialog: false,

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
      stage: 'default',
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
     

      // SNACKBAR
      snackbar_data: { snackbar: false, text: 'Successfully', color: 'success', timeout: 2000 },

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



      // *** ALL SALES DATA ***
      all_sales_data: [
        {
          no: '1001',
          data: '22-05-2022',
          customer: 'bushra aboubida',
          amount: '5,730.00',
          type: 'invoice',
          status: 'paid'
        },
        {
          no: '1002',
          data: '22-05-2022',
          customer: 'bushra aboubida',
          amount: '7,730.00',
          type: 'payment',
          status: 'paid'
        },
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
    print() {
      window.print()
    },
    handleSaveInvoice(value) {
      // this.sales_data.push(...value)
      console.log('final objects ==>', value)
      this.snackbar_data = { snackbar: true, text: 'Invoices Added Successfully', color: 'success', timeout: 2000 }
      this.addNewInvoiceDialog = false
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
        this.addNewSalesRecieptDialog=!this.addNewSalesRecieptDialog
      } else if(value=='Tax Credit Note') {
        this.addNewTaxCreditNoteDialog=!this.addNewTaxCreditNoteDialog
      } else if(value=='Time Activity') {
        this.addNewTimeActivityDialog=!this.addNewTimeActivityDialog
      } else if(value=='Journal Entry') {
        this.addNewJournalEntryDialog=!this.addNewJournalEntryDialog
      } 
    },
    handleShowInvoice() {
      this.addNewInvoicePreviewTableData.push({no: '#',service: '0-0-2020',product: 'ERP',description: 'lorem ipsum..',qty: '1',rate: '1044',amount: '20,890',tax: '1%'})
      this.invoices_data.push(this.addNewInvoicePreviewTableData)
    },
    handleApplyFilter() {
      this.filterDialog = false
    },
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
  }
}
</script>

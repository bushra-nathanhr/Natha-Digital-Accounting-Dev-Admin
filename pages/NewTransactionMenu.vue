<template>
    <div>

    <!-- ADD NEW INVOICE -->
    <v-dialog v-model="addNewInvoiceDialog" class="ma-0 pa-0">
      <div class="my_dialog">
        <v-card id="tall_dialog">
          <v-card-title id="card-title">
              <h4 class="text--text">Invoice #255</h4>
              <div class="flex_row justify-lg-space-between">
                <!-- <v-btn class="tall__btn mr-2 px-5" color="subtext" outlined>Make Recuring</v-btn> -->
                <v-btn class="tall__btn mr-2 px-5" color="subtext" outlined @click="addNewInvoiceDialog=false">Done</v-btn>
                <v-btn class="tall__btn px-9" color="primary" min-width="150px" @click="handleAddNewInvoice" :disabled="!enabled">Add Invoice</v-btn>
              </div>
          </v-card-title>
          <v-divider id="divider" class="mt-5"></v-divider>
          <v-card-text id="card-text">
            <v-container>

              <!-- INPUTS -->
              <v-row>
                
                <v-col cols="3" class="pa-0">
                    <v-col cols="12">
                      <CustomInputContainer label="Customer">
                        <div slot="input">
                          <v-select v-model="new_invoice.customer" :items="allCustomers" placeholder="Enter Customer Name" outlined hide-details></v-select>
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
                    <CustomInputContainer label="Terms">
                      <div slot="input">
                        <v-text-field v-model="new_invoice.terms" placeholder="Enter Terms" outlined hide-details></v-text-field>
                      </div>
                    </CustomInputContainer>
                  </v-col>
                  <v-col cols="12">
                    <CustomInputContainer label="Invoice date">
                      <div slot="input">
                        <v-text-field v-model="new_invoice.date" placeholder="Enter Date" outlined hide-details></v-text-field>
                      </div>
                    </CustomInputContainer>
                  </v-col>
                </v-col>

                <v-col cols="3" class="pa-0">
                  <v-col cols="12">
                    <CustomInputContainer label="Due date">
                    <div slot="input">
                      <v-text-field v-model="new_invoice.dueDate" placeholder="Enter Due Date" outlined hide-details></v-text-field>
                    </div>
                  </CustomInputContainer>
                  </v-col>
                  <v-col cols="12">
                    <CustomInputContainer label="Sale Location">
                    <div slot="input">
                      <v-text-field @click="enabled=!enabled" v-model="new_invoice.location" placeholder="Enter Location" outlined hide-details></v-text-field>
                    </div>
                  </CustomInputContainer>
                  </v-col>
                </v-col>

                <v-col cols="3" class="pa-0">
                  <v-col cols="12" class="pb-0">
                    <CustomInputContainer label="Billing Address">
                      <div slot="input">
                        <v-textarea solo flat outlined hide-details color="primary" label="Street, city, country" ></v-textarea>
                      </div>
                    </CustomInputContainer>
                  </v-col>
                </v-col>
                
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


    <!-- ADD NEW Payment -->
    <v-dialog v-model="addNewPaymentDialog" class="ma-0 pa-0">
      <div class="my_dialog">
        <v-card id="tall_dialog">
          <v-card-title id="card-title">
              <h4 class="text--text">Payment #255</h4>
              <div class="flex_row justify-lg-space-between">
                <!-- <v-btn class="tall__btn mr-2 px-5" color="subtext" outlined>Make Recuring</v-btn> -->
                <v-btn class="tall__btn mr-2 px-5" color="subtext" outlined @click="addNewInvoiceDialog=false">Done</v-btn>
                <v-btn class="tall__btn px-9" color="primary" min-width="150px" @click="handleAddNewInvoice" :disabled="!enabled">Add Invoice</v-btn>
              </div>
          </v-card-title>
          <v-divider id="divider" class="mt-5"></v-divider>
          <v-card-text id="card-text">
            <v-container>

              <!-- INPUTS -->
              <v-row>
                
                <v-col cols="3" class="pa-0">
                    <v-col cols="12">
                      <CustomInputContainer label="Customer">
                        <div slot="input">
                          <v-select v-model="new_invoice.customer" :items="allCustomers" placeholder="Enter Customer Name" outlined hide-details></v-select>
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
                    <CustomInputContainer label="Terms">
                      <div slot="input">
                        <v-text-field v-model="new_invoice.terms" placeholder="Enter Terms" outlined hide-details></v-text-field>
                      </div>
                    </CustomInputContainer>
                  </v-col>
                  <v-col cols="12">
                    <CustomInputContainer label="Invoice date">
                      <div slot="input">
                        <v-text-field v-model="new_invoice.date" placeholder="Enter Date" outlined hide-details></v-text-field>
                      </div>
                    </CustomInputContainer>
                  </v-col>
                </v-col>

                <v-col cols="3" class="pa-0">
                  <v-col cols="12">
                    <CustomInputContainer label="Due date">
                    <div slot="input">
                      <v-text-field v-model="new_invoice.dueDate" placeholder="Enter Due Date" outlined hide-details></v-text-field>
                    </div>
                  </CustomInputContainer>
                  </v-col>
                  <v-col cols="12">
                    <CustomInputContainer label="Sale Location">
                    <div slot="input">
                      <v-text-field @click="enabled=!enabled" v-model="new_invoice.location" placeholder="Enter Location" outlined hide-details></v-text-field>
                    </div>
                  </CustomInputContainer>
                  </v-col>
                </v-col>

                <v-col cols="3" class="pa-0">
                  <v-col cols="12" class="pb-0">
                    <CustomInputContainer label="Billing Address">
                      <div slot="input">
                        <v-textarea solo flat outlined hide-details color="primary" label="Street, city, country" ></v-textarea>
                      </div>
                    </CustomInputContainer>
                  </v-col>
                </v-col>
                
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
    


    </div>
</template>

<script>
export default {

    data() { 
        return {
            // ADD NEW INVOICE
            addNewInvoiceDialog : false,
            new_invoice: {
                customer: '',
                email: '',
                address: '',
                terms: '',
                date: '',
                dueDate: '',
                location: '',
            },
            allCustomers: ['Customer1', 'Customer2'],
            enabled: false,
            addNewInvoicePreviewTableData: [],
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
        }
    }
}
</script>

<style>

</style>
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


      <v-row class="customer__con">
        
        <!-- Customers List -->
        <!-- obj: customers_list / model-->
        <v-col sm="6" md="4" lg="4">
          <v-card color='card_bg'  id="card">
            <v-card-title id="card-title">
              <h4>Customers</h4>
              <v-btn class="tall__btn" color="primary" @click="add_new_customer_dialog=true">
                <v-icon class="mr-2" small>fa-plus</v-icon>
                Add Customer
              </v-btn>
            </v-card-title>
            <v-divider id="divider" class="mx-0 px-0 mt-5"></v-divider>
            <v-card-text id="card-text" style="max-height: 70vh" class="overflow-auto dl__list">

              <v-list class="customers_list__con">
                <v-list-item-group v-model="model">
                  <v-list-item v-for="(item, index) in customers_list" :key="index" @click="handleCustomer(item)">
                    <v-list-item-icon class="mx-4">
                      <v-img :src="item.logo" style="border-radius: 50px;" max-width="60" />
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title><h4>{{ item.name }}</h4></v-list-item-title>
                      <v-list-item-subtitle v-text="item.title" class="mt-2"></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>

            </v-card-text>
          </v-card>
        </v-col>


        <!-- Customer Details -->
        <!-- obj: customers_list -->
        <v-col sm="6" md="8" lg="8">
          <v-card color='card_bg'  id="card">
            <v-card-title id="card-title">
              <h4 class="text--text">{{ selectedCustomer.name }}</h4>
            </v-card-title>
            <v-divider id="divider" class="mx-0 px-0 mt-5"></v-divider>
            <v-card-text id="card-text">

              <!-- First Contact Information -->
              <v-row class="first_contact_information__row">
                <v-col cols="auto"><h5 class="text--text">First Contact Information</h5></v-col>
                <v-spacer></v-spacer>
                <v-col cols="auto"><v-btn class="px-8 rounded-xl" color="primary" outlined small>Edit</v-btn></v-col>

                <v-row>
                <v-col sm="12" md="4" lg="4">
                  <div class="text-left">
                    <span class=" caption subtext--text">TITLE</span>
                    <h6 class="text--text">{{ selectedCustomer.name }}</h6>
                  </div>
                </v-col>
                <v-col sm="12" md="4" lg="4">
                  <div class="text-left">
                    <span class=" caption subtext--text">TITLE</span>
                    <h6 class="text--text">{{ selectedCustomer.title }}</h6>
                  </div>
                </v-col>
                <v-col sm="12" md="4" lg="4">
                  <div class="text-left">
                    <span class=" caption subtext--text">TITLE</span>
                    <h6 class="text--text">{{ selectedCustomer.title }}</h6>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col sm="12" md="4" lg="4">
                  <div class="text-left">
                    <span class=" caption subtext--text">TITLE</span>
                    <h6 class="text--text">{{ selectedCustomer.name }}</h6>
                  </div>
                </v-col>
                <v-col sm="12" md="4" lg="4">
                  <div class="text-left">
                    <span class=" caption subtext--text">TITLE</span>
                    <h6 class="text--text">{{ selectedCustomer.title }}</h6>
                  </div>
                </v-col>
                <v-col sm="12" md="4" lg="4">
                  <div class="text-left">
                    <span class=" caption subtext--text">TITLE</span>
                    <h6 class="text--text">{{ selectedCustomer.title }}</h6>
                  </div>
                </v-col>
              </v-row>
              </v-row>
              
              <v-divider id="divider" class="my-9"></v-divider>

              <!-- Decision Maker Information -->
              <v-row class="decision_maker_information__row">
                <v-col cols="auto"><h5 class="text--text">Decision Maker Information</h5></v-col>
                <v-spacer></v-spacer>
                <v-col cols="auto"><v-btn class="px-8 rounded-xl" color="primary" outlined small>Edit</v-btn></v-col>

                <v-row>
                <v-col sm="12" md="4" lg="4">
                  <div class="text-left">
                    <span class=" caption subtext--text">TITLE</span>
                    <h6 class="text--text">{{ selectedCustomer.name }}</h6>
                  </div>
                </v-col>
                <v-col sm="12" md="4" lg="4">
                  <div class="text-left">
                    <span class=" caption subtext--text">TITLE</span>
                    <h6 class="text--text">{{ selectedCustomer.title }}</h6>
                  </div>
                </v-col>
                <v-col sm="12" md="4" lg="4">
                  <div class="text-left">
                    <span class=" caption subtext--text">TITLE</span>
                    <h6 class="text--text">{{ selectedCustomer.title }}</h6>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col sm="12" md="4" lg="4">
                  <div class="text-left">
                    <span class=" caption subtext--text">TITLE</span>
                    <h6 class="text--text">{{ selectedCustomer.name }}</h6>
                  </div>
                </v-col>
                <v-col sm="12" md="4" lg="4">
                  <div class="text-left">
                    <span class=" caption subtext--text">TITLE</span>
                    <h6 class="text--text">{{ selectedCustomer.title }}</h6>
                  </div>
                </v-col>
              </v-row>
              </v-row>
              
            </v-card-text>
          </v-card>
        </v-col>



        <!-- Dialog -->
        <v-dialog v-model="add_new_customer_dialog" persistent max-width="800px">
          <v-card id="card" style="padding: 30px 40px !important">
            <v-card-title id="card-title">
              <div class="flex_column align-start">
                <h4 class="text--text">Add Customer (Step 1)</h4>
                <span class="subtext--text">First Contact Information</span>
              </div>
              <div class="flex_row align-center justify-space-between">
                <v-btn class="text_light--text tall__btn" color="primary" @click="addNewCustomer">Proceed</v-btn>
                <v-icon small color="subtext" class="ml-5" @click="add_new_customer_dialog=false">fa-close</v-icon>
              </div>
            </v-card-title>
            <v-card-text id="card-text">
              <v-container class="ma-0 pa-0">
                <v-row class="ma-0 pa-0">
                  <v-col sm="12" md="6" lg="6" class="pl-0">
                    <CustomInputContainer label="CUSTOMER NAME">
                      <div slot="input">
                        <v-text-field  v-model="new_customer.name" placeholder="Enter Point Of Contact" outlined hide-details></v-text-field>
                      </div>
                    </CustomInputContainer>
                  </v-col>
                  <v-col sm="12" md="6" lg="6" class="pl-0">
                    <CustomInputContainer label="POINT OF CONTACT">
                      <div slot="input">
                        <v-text-field placeholder="Enter Point Of Contact" outlined hide-details></v-text-field>
                      </div>
                    </CustomInputContainer>
                  </v-col>
                </v-row>
                <v-row class="ma-0 pa-0">
                  <v-col sm="12" md="6" lg="6" class="pl-0">
                    <CustomInputContainer label="DEPT">
                      <div slot="input">
                        <v-text-field placeholder="Enter Dept" outlined hide-details></v-text-field>
                      </div>
                    </CustomInputContainer>
                  </v-col>
                  <v-col sm="12" md="6" lg="6" class="pl-0">
                    <CustomInputContainer label="TITLE">
                      <div slot="input">
                        <v-text-field v-model="new_customer.title" placeholder="Enter Title" outlined hide-details></v-text-field>
                      </div>
                    </CustomInputContainer>
                  </v-col>
                </v-row>
                <v-row class="ma-0 pa-0">
                  <v-col sm="12" md="6" lg="6" class="pl-0">
                    <CustomInputContainer label="EMAIL ID">
                      <div slot="input">
                        <v-text-field placeholder="Enter Email ID" outlined hide-details></v-text-field>
                      </div>
                    </CustomInputContainer>
                  </v-col>
                  <v-col sm="12" md="6" lg="6" class="pl-0">
                    <CustomInputContainer label="PHONE">
                      <div slot="input">
                        <v-text-field placeholder="Enter Phone" outlined hide-details></v-text-field>
                      </div>
                    </CustomInputContainer>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </v-row>
</template>
  
<script>
import CustomInputContainer from '@/components/utils/CustomInputContainer.vue'
export default {
  layout: 'dashboard',
  components: { CustomInputContainer, },
  data() {
    return {
      snackbar_data: { snackbar: false, text: 'Successfully', color: 'success', timeout: 2000 },
      new_customer: { name: '', title: '', logo: 'https://media.istockphoto.com/id/1161078457/vector/pictures.jpg?s=612x612&w=0&k=20&c=D3iJZiYU1SARRF8QFXHxQli0-uE7PXx0VO1rUfdAamE=' },
      add_new_customer_dialog: false,
      selectedCustomer: {},
      model: 1,
      customers_list: [
        { name: 'EasyBox', title: 'Bob Hodges - CEO', logo: 'https://media-exp1.licdn.com/dms/image/C4E0BAQF5247ZZ8Xa4A/company-logo_200_200/0/1602080772648?e=2147483647&v=beta&t=ursKVhXV_4AYaKzdy9mENiL9IG932ZuwJKBToYobyr4' },
        { name: 'Acme Corporation', title: 'Denice M. Wallace', logo: 'https://i.pinimg.com/originals/9f/f7/db/9ff7db5b263089c03cf7a0f8af26f122.jpg' },
        { name: 'Vehement Capital Part', title: 'Misty H. Ottinger', logo: 'https://img.freepik.com/free-vector/gradient-auto-parts-logo-design_23-2149455668.jpg?w=2000' },
        { name: 'Hooli', title: 'Patrick F. Shaw', logo: 'https://i.pinimg.com/originals/9f/f7/db/9ff7db5b263089c03cf7a0f8af26f122.jpg' },
        { name: 'Vehement Capital Part', title: 'Misty H. Ottinger', logo: 'https://img.freepik.com/free-vector/gradient-auto-parts-logo-design_23-2149455668.jpg?w=2000' },
        { name: 'EasyBox', title: 'Bob Hodges - CEO', logo: 'https://media-exp1.licdn.com/dms/image/C4E0BAQF5247ZZ8Xa4A/company-logo_200_200/0/1602080772648?e=2147483647&v=beta&t=ursKVhXV_4AYaKzdy9mENiL9IG932ZuwJKBToYobyr4' },
        { name: 'Acme Corporation', title: 'Denice M. Wallace', logo: 'https://i.pinimg.com/originals/9f/f7/db/9ff7db5b263089c03cf7a0f8af26f122.jpg' },
        { name: 'Vehement Capital Part', title: 'Misty H. Ottinger', logo: 'https://img.freepik.com/free-vector/gradient-auto-parts-logo-design_23-2149455668.jpg?w=2000' },
        { name: 'Hooli', title: 'Patrick F. Shaw', logo: 'https://i.pinimg.com/originals/9f/f7/db/9ff7db5b263089c03cf7a0f8af26f122.jpg' },
        { name: 'Vehement Capital Part', title: 'Misty H. Ottinger', logo: 'https://img.freepik.com/free-vector/gradient-auto-parts-logo-design_23-2149455668.jpg?w=2000' },
      ],
    }
  },
  methods: {
    addNewCustomer() {
      this.add_new_customer_dialog = false
      this.customers_list.push(this.new_customer)
      this.snackbar_data = { snackbar: true, text: 'Customer Added', color: 'success', timeout: 2000 }
    },
    handleCustomer(value) {
      this.selectedCustomer = value
    },
    initializeSelectedCustomer() {
      this.selectedCustomer = this.customers_list[1];
      console.log('Initial Selected Customer ===> ', this.selectedCustomer)
    },
  },
  mounted() {
    this.initializeSelectedCustomer();
  }
}
</script>
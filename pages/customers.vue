<template>
    <v-row class="wrapper_row">

      <v-row class="customer__con">
        
        <!-- Customers List -->
        <!-- obj: customers_list / model / -->
        <v-col sm="6" md="4" lg="4">
          <v-card id="card">
            <v-card-title id="card-title">
              <h4>Customers</h4>
              <v-btn class="tall__btn" color="primary" v-bind="attrs" v-on="on">
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
                      <v-img :src="item.company_logo" style="border-radius: 50px;" max-width="60" />
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title><h4>{{ item.company_name }}</h4></v-list-item-title>
                      <v-list-item-subtitle v-text="item.company_details" class="mt-2"></v-list-item-subtitle>
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
          <v-card id="card">
            <v-card-title id="card-title">
              <h4 class="text--text">{{ selectedCustomer.company_name }}</h4>
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
                    <h6 class="text--text">{{ selectedCustomer.company_name }}</h6>
                  </div>
                </v-col>
                <v-col sm="12" md="4" lg="4">
                  <div class="text-left">
                    <span class=" caption subtext--text">TITLE</span>
                    <h6 class="text--text">{{ selectedCustomer.company_details }}</h6>
                  </div>
                </v-col>
                <v-col sm="12" md="4" lg="4">
                  <div class="text-left">
                    <span class=" caption subtext--text">TITLE</span>
                    <h6 class="text--text">{{ selectedCustomer.company_details }}</h6>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col sm="12" md="4" lg="4">
                  <div class="text-left">
                    <span class=" caption subtext--text">TITLE</span>
                    <h6 class="text--text">{{ selectedCustomer.company_name }}</h6>
                  </div>
                </v-col>
                <v-col sm="12" md="4" lg="4">
                  <div class="text-left">
                    <span class=" caption subtext--text">TITLE</span>
                    <h6 class="text--text">{{ selectedCustomer.company_details }}</h6>
                  </div>
                </v-col>
                <v-col sm="12" md="4" lg="4">
                  <div class="text-left">
                    <span class=" caption subtext--text">TITLE</span>
                    <h6 class="text--text">{{ selectedCustomer.company_details }}</h6>
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
                    <h6 class="text--text">{{ selectedCustomer.company_name }}</h6>
                  </div>
                </v-col>
                <v-col sm="12" md="4" lg="4">
                  <div class="text-left">
                    <span class=" caption subtext--text">TITLE</span>
                    <h6 class="text--text">{{ selectedCustomer.company_details }}</h6>
                  </div>
                </v-col>
                <v-col sm="12" md="4" lg="4">
                  <div class="text-left">
                    <span class=" caption subtext--text">TITLE</span>
                    <h6 class="text--text">{{ selectedCustomer.company_details }}</h6>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col sm="12" md="4" lg="4">
                  <div class="text-left">
                    <span class=" caption subtext--text">TITLE</span>
                    <h6 class="text--text">{{ selectedCustomer.company_name }}</h6>
                  </div>
                </v-col>
                <v-col sm="12" md="4" lg="4">
                  <div class="text-left">
                    <span class=" caption subtext--text">TITLE</span>
                    <h6 class="text--text">{{ selectedCustomer.company_details }}</h6>
                  </div>
                </v-col>
              </v-row>
              </v-row>
              
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-row>
</template>
  
<script>
export default {
  layout: 'dashboard',
  components: {},
  data() {
    return {
      selectedCustomer: {},
      model: 1,
      customers_list: [
        { company_name: 'EasyBox', company_details: 'Bob Hodges - CEO', company_logo: 'https://media-exp1.licdn.com/dms/image/C4E0BAQF5247ZZ8Xa4A/company-logo_200_200/0/1602080772648?e=2147483647&v=beta&t=ursKVhXV_4AYaKzdy9mENiL9IG932ZuwJKBToYobyr4' },
        { company_name: 'Acme Corporation', company_details: 'Denice M. Wallace', company_logo: 'https://i.pinimg.com/originals/9f/f7/db/9ff7db5b263089c03cf7a0f8af26f122.jpg' },
        { company_name: 'Vehement Capital Part', company_details: 'Misty H. Ottinger', company_logo: 'https://img.freepik.com/free-vector/gradient-auto-parts-logo-design_23-2149455668.jpg?w=2000' },
        { company_name: 'Hooli', company_details: 'Patrick F. Shaw', company_logo: 'https://i.pinimg.com/originals/9f/f7/db/9ff7db5b263089c03cf7a0f8af26f122.jpg' },
        { company_name: 'Vehement Capital Part', company_details: 'Misty H. Ottinger', company_logo: 'https://img.freepik.com/free-vector/gradient-auto-parts-logo-design_23-2149455668.jpg?w=2000' },
        { company_name: 'EasyBox', company_details: 'Bob Hodges - CEO', company_logo: 'https://media-exp1.licdn.com/dms/image/C4E0BAQF5247ZZ8Xa4A/company-logo_200_200/0/1602080772648?e=2147483647&v=beta&t=ursKVhXV_4AYaKzdy9mENiL9IG932ZuwJKBToYobyr4' },
        { company_name: 'Acme Corporation', company_details: 'Denice M. Wallace', company_logo: 'https://i.pinimg.com/originals/9f/f7/db/9ff7db5b263089c03cf7a0f8af26f122.jpg' },
        { company_name: 'Vehement Capital Part', company_details: 'Misty H. Ottinger', company_logo: 'https://img.freepik.com/free-vector/gradient-auto-parts-logo-design_23-2149455668.jpg?w=2000' },
        { company_name: 'Hooli', company_details: 'Patrick F. Shaw', company_logo: 'https://i.pinimg.com/originals/9f/f7/db/9ff7db5b263089c03cf7a0f8af26f122.jpg' },
        { company_name: 'Vehement Capital Part', company_details: 'Misty H. Ottinger', company_logo: 'https://img.freepik.com/free-vector/gradient-auto-parts-logo-design_23-2149455668.jpg?w=2000' },
      ],
    }
  },
  methods: {
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
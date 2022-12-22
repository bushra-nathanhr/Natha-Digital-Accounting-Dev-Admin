<template>
  <v-row class="">
    <v-spacer />

    <!-- Fav Reports -->
    <!-- obj: fav_reports_data -->
    <v-col sm="12" md="12" lg="12">
      <v-expansion-panels class="elevation-0">
        <v-expansion-panel class="py-3" style="border-radius: 20px !important;">
          <v-expansion-panel-header><h4 class="text--text">Favourites</h4></v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-divider id="divider" class="mb-9"></v-divider>
            <ReportViewListCard :data="fav_reports_data"/>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>


    <!-- Business Overview Reports -->
    <!-- obj: business_reports_data -->
    <v-col sm="12" md="12" lg="12">
      <v-expansion-panels class="elevation-0">
        <v-expansion-panel class="py-3" style="border-radius: 20px !important;">
          <v-expansion-panel-header><h4 class="text--text">Business Overview</h4></v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-divider id="divider" class="mb-9"></v-divider>
            <ReportViewListCard :data="business_reports_data"/>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>


    
    <!-- Who Owes You Reports -->
    <!-- obj: who_reports_data -->
    <v-col sm="12" md="12" lg="12">
      <v-expansion-panels class="elevation-0">
        <v-expansion-panel class="py-3" style="border-radius: 20px !important;">
          <v-expansion-panel-header><h4 class="text--text">Who Owes You</h4></v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-divider id="divider" class="mb-9"></v-divider>
            <ReportViewListCard :data="who_reports_data"/>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>

    <!-- Expenses And Suppliers Reports -->
    <!-- obj:  -->
    <v-col sm="12" md="12" lg="12">
      <v-expansion-panels class="elevation-0">
        <v-expansion-panel class="py-3" style="border-radius: 20px !important;">
          <v-expansion-panel-header><h4 class="text--text">Expenses And Suppliers</h4></v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-divider id="divider" class="mb-9"></v-divider>
            <!-- <ReportViewListCard :data=""/> -->
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>

    <!-- Sales Tax Reports -->
    <!-- obj:  -->
    <v-col sm="12" md="12" lg="12">
      <v-expansion-panels class="elevation-0">
        <v-expansion-panel class="py-3" style="border-radius: 20px !important;">
          <v-expansion-panel-header><h4 class="text--text">Sales Tax</h4></v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-divider id="divider" class="mb-9"></v-divider>
            <!-- <ReportViewListCard :data=""/> -->
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>


    <!-- Employees Reports -->
    <!-- obj:  -->
    <v-col sm="12" md="12" lg="12">
      <v-expansion-panels class="elevation-0">
        <v-expansion-panel class="py-3" style="border-radius: 20px !important;">
          <v-expansion-panel-header><h4 class="text--text">Employees</h4></v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-divider id="divider" class="mb-9"></v-divider>
            <!-- <ReportViewListCard :data=""/> -->
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>

    <!-- For My Accountant Reports -->
    <!-- obj:  -->
    <v-col sm="12" md="12" lg="12">
      <v-expansion-panels class="elevation-0">
        <v-expansion-panel class="py-3" style="border-radius: 20px !important;">
          <v-expansion-panel-header><h4 class="text--text">For My Accountant</h4></v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-divider id="divider" class="mb-9"></v-divider>
            <!-- <ReportViewListCard :data=""/> -->
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>

    <!-- Payroll Reports -->
    <!-- obj:  -->
    <v-col sm="12" md="12" lg="12">
      <v-expansion-panels class="elevation-0">
        <v-expansion-panel class="py-3" style="border-radius: 20px !important;">
          <v-expansion-panel-header><h4 class="text--text">Payroll</h4></v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-divider id="divider" class="mb-9"></v-divider>
            <!-- <ReportViewListCard :data=""/> -->
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>


    <v-spacer />
    
    <!-- FOOTER-->
    <div style="width: 100%;max-height: 200px; overflow: hidden"><Footer /></div>
  </v-row>
</template>

<script>
import ReportViewListCard from '~/components/Reports/ReportViewListCard.vue'
import Footer from '@/components/Footer/index.vue'
export default {
  layout: 'dashboard',
  components: { ReportViewListCard, Footer },
  data() {
    return {
      fav_reports_data: [
        { name: 'Acc receivable ageing summary', isFav: true },
        { name: 'Customer Balance Summary', isFav: true },
        { name: 'Trial Balance', isFav: true },
        { name: 'Balance Sheet', isFav: true },
        { name: 'Profit and Loss by Customer', isFav: true },
        { name: 'Profit and Loss', isFav: true },
      ],
      business_reports_data: [
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
      ],
      who_reports_data: [
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
        { name: 'Acc receivable ageing summary' },
      ],
    }
  }
}
</script>

<style>
.v-expansion-panel::before {
  box-shadow: 0px 3px 6px #0A2C4F0D !important;
}
</style>

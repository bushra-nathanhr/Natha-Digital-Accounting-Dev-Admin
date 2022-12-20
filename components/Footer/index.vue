<template>
    <v-row class="footer">
      <v-col sm="12" md="12" lg="12" id="footer" style="min-height: 350px;">
        <v-card id="card">
          <v-card-text id="card-text" class="flex_row align-center justify-space-between px-5">
            <div class="flex_column align-center justify-center">
              <div class="flex_row align-center justify-space-around">
              <v-btn v-for="item in icons" :key="item.id" class="mx-4" icon>
                <v-icon size="14px">
                {{ item }}
              </v-icon>
              </v-btn>
              </div>
              <p class="text--text pt-2">© Nathan Digital, all rights reserved.</p>
            </div>
            <div class="flex_column align-center justify-center">
              <NathanDigitalDarkLogo class="" />
              <p class="text--text pt-2">Accounting Software</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
</template>

<script>
import NathanDigitalDarkLogo from '@/assets/images/nathandigital-dark-logo.svg'
export default {
  components : { NathanDigitalDarkLogo },
    data: () => ({
      icons: [
        'fa-plus',
        'fa-plus',
        'fa-plus',
      ],
    }),
}
</script>

<style>

</style>
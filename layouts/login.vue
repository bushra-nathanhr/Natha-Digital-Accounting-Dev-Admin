<template>
    <v-app id="login">
      <v-main id="loginWrapper">
        <nuxt />
      </v-main>
    </v-app>
</template>

<script>
import '@/assets/scss/layouts/_loginLayout.scss'
export default {
    name: 'LoginLayout',
    head() {
        return {
        title: "Nathan Digital",
        titleTemplate: "%s - Accounting",
        };
    },
    };
</script>

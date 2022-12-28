<template>
    <v-snackbar v-show="data.snackbar" class="snackbar" :timeout="data.timeout" v-model="data.snackbar" top min-width="100%" min-height="30px" rounded="0" elevation="0" :color="data.color">
      <div>
        <v-icon small color="white" v-if="data.color=='success'">fa-check</v-icon>
        <v-icon small color="error" v-else>fa-close</v-icon>
        <span class="text_light--text ml-3">{{ data.text }}</span>
      </div>
    </v-snackbar>
</template>

<script>
export default {
    props: { data: Object }
}
</script>

<style>

</style>
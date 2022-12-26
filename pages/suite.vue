<template>
  <v-row>
    <v-col cols="12">
        <v-card color='card_bg'  id="card">
            <v-card-title id="card-title">Inputs</v-card-title>
            <v-card-text id="card-text">
                <div class="flex_row justify-space-between">



                    <!-- *** SELECT INPUT *** -->
                    <div class="flex_column justify-start align-start">
                        <span class="text--text mb-2 ml-1 h6">Select Input Field</span>
                        <v-select
                        name="select"
                        :items="items"
                        placeholder="Hint Text"
                        color="primary"
                        class="outline--text"
                        outlined
                        style="border-radius: 10px !important;"
                        ></v-select>
                    </div>



                    <!-- *** TEXT FIELD *** -->
                    <div class="flex_column justify-start align-start">
                        <span class="text--text mb-2 ml-1 h6">CUSTOMER NAME</span>
                        <v-text-field
                            placeholder="Enter Point Of Contact"
                            solo
                            color="primary"
                            outlined
                            class=" elevation-0"
                            style="border-radius: 10px !important;min-width: 350px;"
                            height="49px"
                            full-width
                            flat
                        ></v-text-field>
                    </div>
                </div>
            </v-card-text>
        </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
    data() {
        return {
            items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
        }
    }
}
</script>

<style>

</style>
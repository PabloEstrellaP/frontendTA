<template>
  <v-dialog v-model="dialog" max-width="300" persistent>
      <v-card>
        <v-card-title></v-card-title>  
        <v-card-text>
            Espere, estamos validando los datos
            <v-progress-linear
                indeterminate
                color="primary"
                class="mb-3 mt-3"
            ></v-progress-linear>
        </v-card-text>
      </v-card>
  </v-dialog>
</template>

<script>
    export default {
        data(){
            return {
                dialog: false
            }
        },
        methods: {
            openDialog() {
                this.dialog = true
            },
            closeDialog() {
                this.dialog = false
            }
        }
    }
</script>

<style>

</style>
<template>
    <v-dialog v-model="dialog" max-width="340" persistent>
        <v-card>
          <v-card-title class="text-h5 lighten mb-5">
              {{ errorTitle }}
          </v-card-title>
          <v-card-subtitle>{{ errorDescription }}</v-card-subtitle>
          <v-card-text>
              <v-layout row wrap>
                  <v-spacer />
                  <v-btn color="primary" @click="closeDialog()">Aceptar</v-btn>
              </v-layout>
          </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        data() {
            return {
                dialog: false
            }
        },
        props: {
            errorTitle: {
                require: true,
                type: String
            },
            errorDescription: {
                require: true,
                type: String
            }
        },
        methods: {
            openDialog () {
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
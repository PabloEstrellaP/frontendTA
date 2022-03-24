<template>
  <v-card class="ma-5">
      <v-card-title>automobiles</v-card-title>
      <v-card-text>
         <v-data-table
              :headers="headers"
              :items="its"
              :items-per-page="5"
            >
              <template v-slot:[`item.action`]="{ item }">
                <v-icon
                  class="mr-2"
                  @click="setIt(item)"
                  >mdi-pencil</v-icon
                >
                <v-icon
                  class="mr-2"
                  @click="openDialog(item)"
                  >mdi-delete</v-icon
                >
              </template>
            </v-data-table>
      </v-card-text>
      <DeleteCardDialog ref="deleteCardDialog"/>
  </v-card>
</template>

<script>
  import DeleteCardDialog from '@/components/it/deleteCardDialog.vue'
  export default {
    components: {
      DeleteCardDialog
    },
    data() {
      return {
        headers: [
          { text: "Serie", value: "serial", align: "center" },
          { text: "Descripción", value: "description", align: "center" },
          { text: "SerieMotor", value: "responsableName", align: "center" },
          { text: "Placas", value: "responsableName", align: "center" },
          { text: "Responsable", value: "responsableName", align: "center" },


          { text: "Actions", align: "center", value: "action", sortable: false }
        ],
        its: [],
      }
    },
    methods: {
      async getIt() {
        try {
          const data = await this.$axios.$get('/it', {
            headers: { token: localStorage.getItem('token') }
          })
          this.its = data.msg
        } catch (error) {
          console.log(error.response)
        }
      },
      openDialog(item) {
        this.$refs.deleteCardDialog.openDialog(item)
      },
      setIt(data) {
        this.$parent.it = data
        console.log(this.$parent.it)
      }
    }
  }
</script>

<style>

</style>
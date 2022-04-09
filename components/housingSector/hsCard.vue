<template>
  <v-card class="ma-5">
      <v-card-title>Inmobilario</v-card-title>
      <v-card-text>
         <v-data-table
              :headers="headers"
              :items="hs"
              :items-per-page="5"
            >
              <template v-slot:[`item.action`]="{ item }">
                <v-icon
                  class="mr-2"
                  @click="seths(item)"
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
  import DeleteCardDialog from '@/components/housingSector/deleteCardDialog.vue'
  export default {
    components: {
      DeleteCardDialog
    },
    data() {
      return {
        headers: [
          { text: "Serie", value: "serial", align: "center" },
          { text: "Descripción", value: "description", align: "center" },
          { text: "Responsable", value: "responsableName", align: "center" },
          { text: "Actions", align: "center", value: "action", sortable: false }
        ],
        hs: [],
      }
    },
    methods: {
      async geths() {
        try {
          const data = await this.$axios.$get('/housingSector', {
            headers: { token: localStorage.getItem('token') }
          })
          this.hs = data.msg
        } catch (error) {
          console.log(error.response)
        }
      },
      openDialog(item) {
        this.$refs.deleteCardDialog.openDialog(item)
      },
      setIt(data) {
        this.$parent.hs = data
        console.log(this.$parent.hs)
      }
    }
  }
</script>

<style>

</style>
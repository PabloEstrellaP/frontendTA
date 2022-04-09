<template>
  <v-card class="ma-5">
      <v-card-title>Informática</v-card-title>
      <v-card-text>
         <v-data-table
              :headers="headers"
              :items="usersAuth"
              :items-per-page="5"
            >
              <template v-slot:[`item.action`]="{ item }">
                <v-icon
                  class="mr-2"
                  @click="setUserAuth(item)"
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
  import DeleteCardDialog from '@/components/userAuth/deleteCardUserAuthDialog.vue'
  export default {
    components: {
      DeleteCardDialog
    },
    data() {
      return {
        headers: [
          { text: "Usuario", value: "userName", align: "center" },
          { text: "Rol", value: "rol.name", align: "center" },
          { text: "Correo", value: "personalData.email", align: "center" },
          { text: "Nombre", value: "personalData.name", align: "center" },
          { text: "Apellido", value: "personalData.lastName", align: "center" },
          { text: "Teléfono", value: "personalData.phone", align: "center" },
          { text: "Actions", align: "center", value: "action", sortable: false }
        ],
        usersAuth: [],
      }
    },
    methods: {
      async getUserAuth() {
        try {
          const data = await this.$axios.$get('/userAuth', {
            headers: { token: localStorage.getItem('token') }
          })
          this.usersAuth = data.msg
        } catch (error) {
          console.log(error.response)
        }
      },
      openDialog(item) {
        this.$refs.deleteCardDialog.openDialog(item)
      },
      setUserAuth(data) {
        this.$parent.userAuth = data
        this.$parent.user = data
      }
    }
  }
</script>

<style>

</style>
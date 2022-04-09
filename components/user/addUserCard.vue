<template>
  <v-card class="ma-5">
    <v-card-title></v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          label="Nombre"
          outlined
          dense
          counter
          type="text"
          maxlength="50"
          v-model="name"
          :rules="validations.nameRules"
        ></v-text-field>
        <v-text-field
          label="Apellido"
          outlined
          dense
          counter
          maxlength="50"
          v-model="lastName"
          :rules="validations.lastNameRules"
        ></v-text-field>
        <v-text-field
          label="Teléfono"
          outlined
          dense
          counter
          maxlength="10"
          v-model="phone"
          :rules="validations.phoneRules"
        ></v-text-field>
        <v-text-field
          label="Correo"
          outlined
          dense
          counter
          type="email"
          maxlength="50"
          v-model="email"
          :rules="validations.emailRules"
        ></v-text-field>
        <v-text-field
          label="Dirreción"
          outlined
          dense
          counter
          type="text"
          maxlength="50"
          v-model="address"
          :rules="validations.addressRules"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <ErrorDialog :errorDescription="errorDescription" :errorTitle="errorTitle" ref="errorDialog"/>
  </v-card>
</template>

<script>
  import { translateErrorUser } from '@/static/translateErrors.js'
  import ErrorDialog from '@/components/helpers/errorDialog.vue'
  export default {
    components: {
      ErrorDialog
    },
    data() {
      return {
        editDescription: '¿Está seguro de actualizar la información?',
        errorTitle: 'Ha ocurrido un error',
        errorDescription: null,

        isEdit: false,
        name: null,
        lastName: null,
        phone: null,
        email: null,
        address: null,
        id: null,
        validations: {
          nameRules: [
            (v) => !!v || 'Nombre es requerido',
            (v) => (!!v && v.length <= 50) || "Nombre debe ser menor a 20 caracteres",
          ],
          lastNameRules: [
            (v) => !!v || 'Apellido es requerido',
            (v) => (!!v && v.length <= 50) || "Apellido debe ser menor a 20 caracteres",
          ],
          phoneRules: [
            (v) => !!v || 'Teléfono es requerido',
            (v) => (!!v && v.length <= 100) || "Teléfono debe ser menor a 10 caracteres",
          ],
          emailRules: [
            v => !!v || 'Correo es requerido',
            v => /.+@.+\..+/.test(v) || 'Correo debe ser valido',
          ],
          addressRules: [
            (v) => !!v || 'Dirección es requerido',
            (v) => (!!v && v.length <= 50) || "Dirección debe ser menor a 50 caracteres",
          ],
        },
      }
    },
    watch: {
      email(newValue) {
        if(newValue) {
          this.$parent.userEmail = newValue
        }
      }
    },
    methods: {
      getUser(data) {
        this.isEdit = true
        this.name = data.personalData.name
        this.lastName = data.personalData.lastName
        this.phone = data.personalData.phone
        this.email = data.personalData.email
        this.address = data.personalData.address
        this.id = data.personalData.uid
      },
      async addUser() {
        this.$parent.openDialog()

        try {
          const body = {
            name: this.name,
            lastName: this.lastName,
            phone: this.phone,
            email: this.email,
            address: this.address
          }

          let data = null
          if(this.isEdit){
            data = await this.$axios.$put('/users/' + this.id, body, {
              headers: { token: localStorage.token }
            })
          } else {
            data = await this.$axios.$post('/users', body, {
              headers: { token: localStorage.token }
            })  
          }
          
          if(data.ok){
            this.$parent.closeDialog()
            this.$parent.userId = data.msg?.uid
          }
        } catch (error) {
          console.log(error)
          this.$parent.closeDialog()
          this.errorDescription = translateErrorUser(error?.response?.data?.msg)
          this.$refs.errorDialog.openDialog()
        }
      },
      cancelEdit() {
        this.isEdit = false
        this.cleanForm()
        this.id = null
      },
      validateForm() {
        if(this.$refs.form.validate()){
          this.addDialog = true
        }
      },
      cleanForm() {
        this.$refs.form.reset()
        this.$parent.user = null
      }
    }
  }
</script>

<style>

</style>
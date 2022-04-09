<template>
  <v-card class="ma-5">
    <v-card-title></v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          label="Usuario"
          outlined
          dense
          disabled
          counter
          type="text"
          maxlength="50"
          v-model="userName"
          :rules="validations.userNameRules"
        ></v-text-field>
        <v-text-field
          :append-outer-icon="visiblePassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-outer="visiblePassword = !visiblePassword"
          label="Contraseña"
          outlined
          dense
          :type="visiblePassword ? 'text' : 'password'"
          counter
          maxlength="20"
          :rules=" isEdit ? [] : validations.passwordRules"
          v-model="password"
        ></v-text-field>
        <v-text-field
          :append-outer-icon="visiblePasswordAgain ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-outer="visiblePasswordAgain = !visiblePasswordAgain"
          label="Repetir contraseña"
          outlined
          dense
          counter
          :type="visiblePasswordAgain ? 'text' : 'password'"
          maxlength="20"
          v-model="passwordAgain"
          v-if="password"
          :rules="[ matchingPasswords ]"
        ></v-text-field>
        <v-select
          v-model="role"
          :items="roles"
          item-text="name"
          item-value="uid"
          label="Rol"
          outlined
          dense
          :rules="validations.roleRules"
        ></v-select>
      </v-form>
    </v-card-text>

    <ErrorDialog :errorDescription="errorDescription" :errorTitle="errorTitle" ref="errorDialog"/>
  </v-card>
</template>

<script>
  import { translateErrorUserAuth } from '@/static/translateErrors.js'
  import ErrorDialog from '@/components/helpers/errorDialog.vue'
  export default {
    components: {
      ErrorDialog
    },
    data() {
      return {
        errorTitle: 'Ha ocurrido un error',
        errorPassword: 'Las contraseñas no coinciden',
        errorDescription: null,

        isEdit: false,
        visiblePassword: false,
        visiblePasswordAgain: false,
        password: null,
        passwordAgain: null,
        personalData: null,
        role: null,
        roles: [],
        id: null,
        validations: {
          userNameRules: [
            (v) => !!v || 'Usuario es requerido',
            (v) => (!!v && v.length <= 50) || "Modelo debe ser menor a 20 caracteres",
          ],
          passwordRules: [
            (v) => !!v || 'Contraseña es requerido',
            (v) => (!!v && v.length <= 50) || "Contraseña debe ser menor a 20 caracteres",
          ],
          roleRules: [
            (v) => !!v || 'Rol es requerido',
          ],
        },
      }
    },
    props: {
      userName: {
        type: String
      }
    },
    created() {
      if(process.browser){
        this.getRoles()
      }
    },
    watch: {
      password(newvalue){
        if(!newvalue){
          this.passwordAgain = null
        }
      }
    },
    methods: {
      getUserAuth(data) {
        this.isEdit = true
        this.userName = data.userName
        this.role = data.rol.uid
        this.personalData = data.personalData
        this.id = data._id
      },
      async getRoles() {
        try {
          const data = await this.$axios.$get('/roles', {
            headers: { token: localStorage.getItem('token') }
          })
          this.roles = data.msg;
        } catch (error) {
          console.log(error)
        }
      },
      matchingPasswords() {
        if (this.password === this.passwordAgain) {
          return true
        } else {
          return this.errorPassword
        }
      },
      async addUserAuth() {
        try {
          const body = {
            userName: this.userName,
            password: this.password ? this.password : null,
            rol: this.role,
            personalData: this.$parent.userId
          }
          console.log(body)
          let data = null
          if(this.isEdit){
            data = await this.$axios.$put('/userAuth/' + this.id, body, {
              headers: { token: localStorage.token }
            })
          } else {
            data = await this.$axios.$post('/userAuth', body, {
              headers: { token: localStorage.token }
            })  
          }
          
          if(data.ok){
            this.cleanForm()
            await this.$parent.getUserAuth()
            this.$parent.closeDialog()
          }
        } catch (error) {
          console.log(error)
          this.errorDescription = translateErrorUserAuth(error?.response?.data?.msg)
          this.$refs.errorDialog.openDialog()
          throw new Error()
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
        this.$parent.userAuth = null
      }
    }
  }
</script>

<style>

</style>
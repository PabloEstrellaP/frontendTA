<template>
  <v-card elevation="20" :min-width="$vuetify.breakpoint.mobile ? 100 : 700" class="justify-center">
        <v-card-title>Iniciar sesión</v-card-title>
        <v-card-text>
             <v-layout row wrap class="pa-5">
                <v-flex xs12 md6 style="text-align: center;">
                    <img src="/Logo.png" alt="Ayuntamiento de kanasín" :style="$vuetify.breakpoint.mobile ? 'width: 100%;' : 'width: 50%;'">
                </v-flex>
                <v-flex xs12 md6>
                    <v-form ref="form">
                        <v-text-field
                            label="Usuario"
                            outlined
                            dense
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
                            :rules=" validations.passwordRules"
                            v-model="password"
                        ></v-text-field>
                    </v-form>
                </v-flex>
             </v-layout>
             <v-btn block color="primary" class="mt-1" @click="validate()">Log in</v-btn>
        </v-card-text>
        <ErrorDialog :errorDescription="errorDescription" :errorTitle="errorTitle" ref="errorDialog"/>
        <LoadingCardDialog ref="loadingCardDialog" />


  </v-card>
</template>

<script>
    import LoadingCardDialog from '@/components/helpers/loadingCardDialog.vue'
    import ErrorDialog from '@/components/helpers/errorDialog.vue'
    import { translateErrorLogin } from '@/static/translateErrors.js'

    export default {
        components: {
            ErrorDialog,
            LoadingCardDialog

        },
        data(){
            return {
                errorTitle: 'Ha ocurrido un error',
                errorDescription: null,
                visiblePassword: false,
                password: null,
                userName: null,
                validations: {
                    userNameRules: [
                        (v) => !!v || 'Usuario es requerido',
                        (v) => (!!v && v.length <= 50) || "Modelo debe ser menor a 20 caracteres",
                    ],
                    passwordRules: [
                        (v) => !!v || 'Contraseña es requerido',
                        (v) => (!!v && v.length <= 50) || "Contraseña debe ser menor a 20 caracteres",
                    ],
                },
            }
        },
        methods: {
            validate(){
                if(this.$refs.form.validate()){
                    this.login()
                }
            },
            async login(){
                try {
                    this.$refs.loadingCardDialog.openDialog()
                    const body = {
                        userName: this.userName,
                        password: this.password
                    }
                    const data = await this.$axios.$post('/auth', body, {
                        headers: { token: localStorage.token }}
                    )  
                    if(data.ok){
                        this.$store.commit('addData', data.user)
                        localStorage.setItem('token', data.token)
                        localStorage.setItem('user', data.user)
                        this.cleanForm()
                        this.$refs.loadingCardDialog.closeDialog()
                        this.$router.push({path: '/'});
                    }else{
                        localStorage.removeItem('token')
                        localStorage.removeItem('user')
                    }
                } catch (error) {
                console.log(error)
                this.$refs.loadingCardDialog.closeDialog()
                this.errorDescription = translateErrorLogin(error?.response?.data?.msg)
                this.$refs.errorDialog.openDialog()
                }
            },
            cleanForm() {
                this.$refs.form.reset()
            }
        },
    }
</script>

<style>

</style>
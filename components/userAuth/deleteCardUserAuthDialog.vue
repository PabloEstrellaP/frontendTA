<template>
    <v-dialog v-model="dialog" max-width="340" persistent>
        <v-card>
            <v-card-title class="text-h5 lighten mb-5">
                {{ deleteDescription }}
            </v-card-title>
            <v-card-text>
                <v-layout row wrap>
                    <v-spacer />
                    <v-btn color="primary" class="mr-3" @click="deleteUser()">Aceptar</v-btn>
                    <v-btn color="secondary" @click="dialog = false">Cancelar</v-btn>
                </v-layout>
            </v-card-text>
        </v-card>
        <ErrorDialog :errorDescription="errorDescription" :errorTitle="errorTitle" ref="errorDialog"/>

    </v-dialog>
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
                dialog: false,
                deleteDescription: '¿Está seguro de borrar la información?',
                errorTitle: 'Ha ocurrido un error',
                errorDescription: null,

                id: null,
                userId: null
            }
        },
        methods: {
            openDialog( item ) {
                this.id = item._id
                this.userId = item.personalData.uid
                this.dialog = true
            },
            async deleteUser() {
                try {
                    
                    const data = await this.$axios.$delete('/userAuth/' + this.id, {
                        headers: { token: localStorage.token }
                    })

                    const data2 = await this.$axios.$delete('/users/' + this.userId, {
                        headers: { token: localStorage.token }
                    })
                    
                    if(data.ok){
                        await this.$parent.$parent.getUserAuth()
                        this.dialog = false
                    }

                } catch (error) {
                    console.log(error)
                    this.dialog = false
                    this.errorDescription = translateErrorUser(error?.response?.data?.msg)
                    this.$refs.errorDialog.openDialog()
                }
            }
        }
    }
</script>

<style>

</style>
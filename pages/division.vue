<template>
  <v-layout row wrap :class="isLoading ? 'isHiden' : ''">
    <v-flex xs12 md6 justify-center>
      <v-select
        v-model="divisionId"
        :items="divisiones"
        item-text="name"
        label="División"
        item-value="_id"
        outlined
        dense
      ></v-select>
    </v-flex>
    <v-flex xs12 :class="isEdit ? 'md3':'md6'">
      <v-btn :disabled="tab == 0" block class="success ml-1" @click="changeData(), isEdit ? addDivision() : isAddNew = true">{{ isEdit ? 'Editar' : 'Agregar' }}</v-btn>
    </v-flex>
    <v-flex xs12 :class="isEdit ? 'md3':''" v-if="isEdit">
      <v-btn :disabled="tab == 0" block class="error ml-1" @click="divisionId = null">Cancelar</v-btn>
    </v-flex>
    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
    >
      <v-tab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card
          color="basil"
          flat
        >
          <v-card-text>{{ 1+1 }} + {{tab}}</v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card
          flat
        >
          <v-card-text>
            <AllCardDivisiones ref="allCardDivisiones" :division="division"/>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <v-dialog max-width="300" v-model="isAddNew">
      <v-card>
        <v-card-title>Agrega un nombre
          <v-spacer />
          <v-btn icon @click="isAddNew = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="name"
              label="Nombre"
              outlined
              dense
              :rules="validations.nameRules"
            ></v-text-field>
          </v-form>
          <v-row>
            <v-spacer />
            <v-btn color="primary" @click="validate()">Agregar</v-btn>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <LoadingCardDialog ref="loadingCardDialog"/>
    <ErrorDialog :errorDescription="errorDescription" :errorTitle="errorTitle" ref="errorDialog"/>

  </v-layout>
</template>

<script>
  import { translateErrorDivision } from '@/static/translateErrors.js'
  import LoadingCardDialog from '@/components/helpers/loadingCardDialog.vue'
  import AllCardDivisiones from '@/components/divisiones/allCardDisivisiones.vue'
  import ErrorDialog from '@/components/helpers/errorDialog.vue'

  export default {
    components: {
      AllCardDivisiones,
      LoadingCardDialog,
      ErrorDialog
    },
    data() {
      return {
        errorTitle: 'Ha ocurrido un error',
        errorDescription: null,
        isEdit: false,
        isAddNew: false,
        name: null,
        it: null,
        divisiones: [],
        divisionId: null,
        division: [],
        isLoading: true,
        tab: null,
        items: [
          'Division', 'Agregar',
        ],
         validations: {
          nameRules: [
                (v) => !!v || 'Nombre es requerido',
          ],
        },
      }
    },
    methods: {
      validate(){
        if(this.$refs.form.validate()){
          this.addDivision()
        }
      },
      openDialog() {
        this.$refs.loadingCardDialog.openDialog()
      },
      closeDialog() {
        this.$refs.loadingCardDialog.closeDialog()
      },
      async getDivision(){
          try {
              const data = await this.$axios.$get('/division', {
                  headers: { token: localStorage.getItem('token') }
              })
              this.divisiones = data.msg
              console.log(data)
          } catch (error) {
              console.log(error.response)
          }
      },
      async addDivision(){
        try {
          this.openDialog()
          const body = {
            name: this.isEdit ? this.division?.name : this.name, 
            housingSector: this.$store.state.selectedHS,
            IT: this.$store.state.selectedIts,
            automobile: this.$store.state.selectedAutomobiles,
          }
          let data = null
          if(this.isEdit){
            data = await this.$axios.$put('/division/' + this.division._id, body, {
                headers: { token: localStorage.token }
            })
          } else{
            data = await this.$axios.$post('/division/', body, {
                headers: { token: localStorage.token }
            })
          }
          if(data.ok){
            this.name = null
            this.isAddNew = false
            this.$store.commit('resetValues')
            await this.getDivision()
            this.closeDialog()
          }
        } catch (error) {
          this.closeDialog()
          console.log(error?.response?.data)
          this.errorDescription = translateErrorDivision(error?.response?.data?.msg)
          this.$refs.errorDialog.openDialog()
        }
      },
      changeData(){
        this.$refs.allCardDivisiones.changeData()
      },
    },
    async mounted() {
      if(process.browser){
        this.openDialog()
        await this.getDivision()
        this.closeDialog()
        this.isLoading = false
      }
    },
    watch: {
      divisionId(newvalue) {
        if(newvalue){
          this.divisiones.forEach( x => {
            if(newvalue == x._id){
              this.division = x
              this.isEdit = true
            }
          })
        }else {
          this.division = null
          this.divisionId = null
          this.isEdit = false
        }
      }
    }
  }
</script>

<style>

</style>
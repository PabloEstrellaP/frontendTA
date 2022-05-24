<template>
  <v-card class="ma-5">
    <v-card-title></v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          label="Costo"
          outlined
          dense
          counter
          type="number"
          maxlength="20"
          v-model="cost"
          :rules="validations.costRules"
        ></v-text-field>
        <v-textarea
          label="Descripción"
          outlined
          dense
          counter
          maxlength="100"
          :rules="validations.descriptionRules"
          height="10vh"
          v-model="description"
        ></v-textarea>
        <v-text-field
          label="Serial"
          outlined
          dense
          counter
          type="text"
          maxlength="20"
          v-model="serial"
          :rules="validations.serialRules"
        ></v-text-field>
        <v-text-field
          label="Responsable"
          outlined
          dense
          counter
          type="text"
          maxlength="50"
          v-model="responsableName"
          :rules="validations.responsableNameRules"
        ></v-text-field>


       <div>
    
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="originalDate"
          label="Fecha de adquisicion"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="originalDate"
        :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
        min="1950-01-01"
        @change="save"
        hint="MM/DD/YYYY format"
      >
      </v-date-picker>
    </v-menu>
  </div>


      </v-form>
      <v-col>
        <v-btn block class="info" @click="cleanForm()">Limpiar</v-btn>
        <v-btn v-if="isEdit" block class="error mt-1" @click="cancelEdit()">Cancelar</v-btn>
        <v-btn block class="success mt-1" @click="validateForm()">{{ isEdit ? 'Editar' : 'Agregar' }}</v-btn>
      </v-col>
    </v-card-text>

     <v-dialog v-model="addDialog" max-width="340" persistent>
        <v-card>
          <v-card-title class="text-h5 lighten mb-5">
              {{ isEdit ? editDescription : addDescription }}
          </v-card-title>
          <v-card-text>
              <v-layout row wrap>
                  <v-spacer />
                  <v-btn color="primary" class="mr-3" @click="addhs()">Aceptar</v-btn>
                  <v-btn color="secondary" @click="addDialog = false">Cancelar</v-btn>
              </v-layout>
          </v-card-text>
          </v-card>
      </v-dialog>
      <ErrorDialog :errorDescription="errorDescription" :errorTitle="errorTitle" ref="errorDialog"/>
  </v-card>
</template>

<script>
  import { translateErrorHS, } from '@/static/translateErrors.js'
  import ErrorDialog from '@/components/helpers/errorDialog.vue'
  export default {
    components: {
      ErrorDialog
    },
    data() {
      return {
        addDialog: false,
        addDescription: '¿Está seguro de guardar la información?',
        editDescription: '¿Está seguro de actualizar la información?',
        errorTitle: 'Ha ocurrido un error',
        errorDescription: null,
         menu:null,
        isEdit: false,
        model: null,
         cost: null,
         description: null,
         serial: null,
         responsableName: null,
         originalDate:null,
        id: null,
        validations: {
          modelRules: [
            (v) => !!v || 'Modelo es requerido',
            (v) => (!!v && v.length <= 20) || "Modelo debe ser menor a 20 caracteres",
          ],
          costRules: [
            (v) => !!v || 'Costo es requerido',
          ],
          descriptionRules: [
            (v) => !!v || 'Descripción es requerido',
            (v) => (!!v && v.length <= 100) || "Descripción debe ser menor a 100 caracteres",
          ],
          serialRules: [
            (v) => !!v || 'Serial es requerido',
            (v) => (!!v && v.length <= 20) || "Serial debe ser menor a 20 caracteres",
          ],
          responsableNameRules: [
            (v) => !!v || 'Responsable es requerido',
            (v) => (!!v && v.length <= 50) || "Responsable debe ser menor a 50 caracteres",
          ],
        },
      }
    },
    methods: {
      geths(data) {
        console.log(data)
        this.isEdit = true
        this.model = data.model
        this.cost = data.cost
        this.description = data.description
        this.serial = data.serial
        this.responsableName = data.responsableName
        this.originalDate= new Date(data.originalDate).toISOString().substring(0,10)
        this.id = data._id
        
      },
      async addhs() {
        try {
          this.addDialog = false
          this.$parent.openDialog()

          const body = {
            model: this.model,
            cost: this.cost,
            description: this.description,
            serial: this.serial,
            responsableName: this.responsableName,
             originalDate:this.originalDate
          }
          let data = null
          if(this.isEdit){
            data = await this.$axios.$put('/housingSector/' + this.id, body, {
              headers: { token: localStorage.token }
            })
          } else {
            data = await this.$axios.$post('/housingSector', body, {
              headers: { token: localStorage.token }
            })  
          }
          
          if(data.ok){
            this.cleanForm()
            await this.$parent.geths()
            this.$parent.closeDialog()
          }
        } catch (error) {
          console.log(error)
          this.$parent.closeDialog()
          this.errorDescription = translateErrorHS(error?.response?.data?.msg)
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
        this.$parent.hs = null
      },
       save (date) {
        this.$refs.menu.save(date)
      },
    }
  }
</script>

<style>

</style>
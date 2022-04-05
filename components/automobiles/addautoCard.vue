<template v-slot:activator="{ on, attrs }" >
  <v-card class="ma-5">
    <v-card-title></v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          label="Modelo"
          outlined
          dense
          counter
          type="text"
          maxlength="20"
          v-model="model"
          :rules="validations.modelRules"
        ></v-text-field>
        <v-text-field
          label="Serie Motor"
          outlined
          dense
          counter
          type="text"
          maxlength="40"
          v-model="motorSerial"
          :rules="validations.SmotorRules"
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
          label="Placas"
          outlined
          dense
          counter
          type="text"
          maxlength="20"
          v-model="plaque"
          :rules="validations.PlacasRules"
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
      ></v-date-picker>
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
                  <v-btn color="primary" class="mr-3" @click="addautomobiles()">Aceptar</v-btn>
                  <v-btn color="secondary" @click="addDialog = false">Cancelar</v-btn>
              </v-layout>
          </v-card-text>
          </v-card>
      </v-dialog>
      <ErrorDialog :errorDescription="errorDescription" :errorTitle="errorTitle" ref="errorDialog"/>
  </v-card>
</template>

<script>
  import { translateErrorAutos } from '@/static/translateErrors.js'
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
        motorSerial: null,
        description: null,
        serial: null,
        plaque: null,
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
            SmotorRules: [
            (v) => !!v || 'Serie del motor es requerido es requerido',
            (v) => (!!v && v.length <= 20) || "Serial debe ser menor a 20 caracteres",
          ],
          serialRules: [
            (v) => !!v || 'Serial es requerido',
            (v) => (!!v && v.length <= 20) || "Serial debe ser menor a 20 caracteres",
          ],
           PlacasRules: [
            (v) => !!v || 'Placas es requerido',
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
      getautomobiles(data) {
        this.isEdit = true
        this.model = data.model
        this.motorSerial = data.motorSerial
        this.description = data.description
        this.serial = data.serial
        this.plaque= data.plaque
        this.responsableName = data.responsableName
        this.originalDate=data.originalDate
        this.id = data._id
      },
      async addautomobiles() {
        try {
          this.addDialog = false
          this.$parent.openDialog()

          const body = {
            model: this.model,
            motorSerial: this.motorSerial,
            description: this.description,
            serial: this.serial,
            plaque: this.plaque,
            responsableName: this.responsableName,
            originalDate:this.originalDate
          }
          let data = null
          if(this.isEdit){
            data = await this.$axios.$put('/automobile/' + this.id, body, {
              headers: { token: localStorage.token }
            })
          } else {
            data = await this.$axios.$post('/automobile', body, {
              headers: { token: localStorage.token }
            })  
          }
          
          if(data.ok){
            this.cleanForm()
            await this.$parent.getautomobiles()
            this.$parent.closeDialog()
          }
        } catch (error) {
          console.log(error)
          this.$parent.closeDialog()
          this.errorDescription = translateErrorAutos(error?.response?.data?.msg)
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
        this.$parent.it = null
      },
      save (date) {
        this.$refs.menu.save(date)
      },
    }
  }
</script>


<style>

</style>
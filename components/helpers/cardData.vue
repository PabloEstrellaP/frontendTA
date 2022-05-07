<template>
  <v-card>
      <v-card-title>{{ getTitle() }} <v-spacer/> <v-btn @click="dialog = true">Editar</v-btn></v-card-title>
      <v-card-text>
        <v-data-table
              :headers="typeHeaders()"
              :items="typeItems()"
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
      <v-dialog v-model="dialog" max-width="400">
          <v-card>
              <v-card-title>Selecciona</v-card-title>
              <v-card-text>
                  <v-checkbox 
                    v-for="(data, index) in typeItemsFor()" 
                    :key="index"
                    :label="`Serial: ${data.serial} Descripción: ${data.description}`"
                    value="data._id"
                    :v-model="typeItemsVModel()"
                ></v-checkbox>
              </v-card-text>
          </v-card>
      </v-dialog>
  </v-card>
</template>

<script>
    export default {
        data(){
            return{
                dialog: false,
                datas: [],
                headersIt: [
                    { text: "Serie", value: "serial", align: "center" },
                    { text: "Descripción", value: "description", align: "center" },
                    { text: "Responsable", value: "responsableName", align: "center" },
                    { text: "Actions", align: "center", value: "action", sortable: false }
                ],
                headersHS: [
                    { text: "Serie", value: "serial", align: "center" },
                    { text: "Descripción", value: "description", align: "center" },
                    { text: "Responsable", value: "responsableName", align: "center" },
                    { text: "Actions", align: "center", value: "action", sortable: false }
                ],
                headersAutomobil: [
                    { text: "Serie", value: "serial", align: "center" },
                    { text: "Descripción", value: "description", align: "center" },
                    { text: "Placas", value: "responsableName", align: "center" },
                    { text: "Actions", align: "center", value: "action", sortable: false }
                ],
                its: [],
                automobiles: [],
                housingSectors: [],
                selectIts: [],
                selectAutomobiles: [],
                selectHS: [],

            }
        },
        async created(){
            if(process.browser){
                await this.getData()
            }
        },
        props: {
            typeData: {
                type: String,
                require: true
            },
            division: {
                typs: Object,
                require: true
            }
        },
        methods: {
            async getData(){
                switch(this.typeData) {
                    case 'IT':
                        await this.getIt()
                    break;
                    case 'Automobil':
                        await this.getAutomobiles()
                    break;
                    case 'HousingSector':
                        await this.getHousingSector()
                    break;
                }
            },
            getTitle(){
                switch(this.typeData) {
                    case 'IT':
                        return 'Informática'
                    case 'Automobil':
                        return 'Automóvil'
                    case 'HousingSector':
                        return 'Inmobilaria'
                }
            },
            typeHeaders(){
                switch(this.typeData) {
                    case 'IT':
                        return this.headersIt
                    case 'Automobil':
                        return this.headersAutomobil
                    case 'HousingSector':
                        return this.headersHS
                }
            },
            typeItems(){
                switch(this.typeData){
                    case 'IT':
                        return this.selectIts = this.division.IT
                    case 'Automobil':
                        return this.selectAutomobiles = this.division.automobile
                    case 'HousingSector':
                        return this.selectAutomobiles = this.division.housingSector
                }
            },
            typeItemsFor(){
                switch(this.typeData){
                    case 'IT':
                        return this.its
                    case 'Automobil':
                        return this.automobiles
                    case 'HousingSector':
                        return this.housingSectors
                }
            },
            typeItemsVModel(){
                switch(this.typeData){
                    case 'IT':
                        return this.selectIts
                    case 'Automobil':
                        return this.selectAutomobiles
                    case 'HousingSector':
                        return this.selectHS
                }
            },
            async getAutomobiles(){
                try {
                    const data = await this.$axios.$get('/automobile', {
                        headers: { token: localStorage.getItem('token') }
                    })
                    this.automobiles = data.msg
                } catch (error) {
                    console.log(error.response)
                }
            },
            async getHousingSector(){
                try {
                    const data = await this.$axios.$get('/housingSector', {
                        headers: { token: localStorage.getItem('token') }
                    })
                    this.housingSectors = data.msg
                } catch (error) {
                    console.log(error.response)
                }
            },
            async getIt(){
                try {
                    const data = await this.$axios.$get('/it', {
                        headers: { token: localStorage.getItem('token') }
                    })
                    this.its = data.msg
                } catch (error) {
                    console.log(error.response)
                }
            },
        }
    }
</script>

<style>

</style>
<template>
  <v-card>
      <v-card-title>{{ getTitle() }} <v-spacer/> <v-btn color="secondary" @click="dialog = true">Editar</v-btn></v-card-title>
      <v-card-text>
        <v-data-table
              v-if="showTable"
              :headers="typeHeaders()"
              :items="typeItems()"
              :items-per-page="5"
        >
            <!-- <template v-slot:[`item.action`]="{ item }">
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
            </template> -->
        </v-data-table>
      </v-card-text>
      
      <v-dialog v-model="dialog" max-width="400" v-if="dialog" persistent>
          <v-card>
              <v-card-title>Selecciona
                  <v-spacer />
                  <v-btn icon primary @click="dialog = false"><v-icon color="secondary">mdi-close</v-icon></v-btn>
              </v-card-title>
              <!-- Selected its -->
              <v-card-text v-if="typeData == 'IT'">
                  <v-checkbox
                    v-for="(data, index) in typeItemsFor()" 
                    :key="index"
                    :label="`Serial: ${data.serial} Descripción: ${data.description}`"
                    :value="data._id"
                    v-model="selectedIts"
                ></v-checkbox>
              </v-card-text>
              <!-- selected automobiles -->
              <v-card-text v-if="typeData == 'Automobil'">
                  <v-checkbox
                    v-for="(data, index) in typeItemsFor()" 
                    :key="index"
                    :label="`Serial: ${data.serial} Descripción: ${data.description}`"
                    :value="data._id"
                    v-model="selectedAutomobiles"
                ></v-checkbox>
              </v-card-text>
              <!-- Selected HS  -->
              <v-card-text v-if="typeData == 'HousingSector'">
                  <v-checkbox
                    v-for="(data, index) in typeItemsFor()" 
                    :key="index"
                    :label="`Serial: ${data.serial} Descripción: ${data.description}`"
                    :value="data._id"
                    v-model="selectedHS"
                ></v-checkbox>
              </v-card-text>
          </v-card>
      </v-dialog>
      <LoadingCardDialog ref="loadingCardDialog" />
      
  </v-card>
</template>

<script>
    import LoadingCardDialog from '@/components/helpers/loadingCardDialog.vue'

    export default {
        components: {
            LoadingCardDialog
        },
        data(){
            return{
                dialog: false,
                showTable: false,
                datas: [],
                headersIt: [
                    { text: "Serie", value: "serial", align: "center" },
                    { text: "Descripción", value: "description", align: "center" },
                    { text: "Responsable", value: "responsableName", align: "center" },
                    // { text: "Actions", align: "center", value: "action", sortable: false }
                ],
                headersHS: [
                    { text: "Serie", value: "serial", align: "center" },
                    { text: "Descripción", value: "description", align: "center" },
                    { text: "Responsable", value: "responsableName", align: "center" },
                    // { text: "Actions", align: "center", value: "action", sortable: false }
                ],
                headersAutomobil: [
                    { text: "Serie", value: "serial", align: "center" },
                    { text: "Descripción", value: "description", align: "center" },
                    { text: "Placas", value: "responsableName", align: "center" },
                    // { text: "Actions", align: "center", value: "action", sortable: false }
                ],
                its: [],
                automobiles: [],
                housingSectors: [],

                selectIts: [],
                selectAutomobiles: [],
                selectHS: [],

                selectedIts: [],
                selectedAutomobiles: [],
                selectedHS: [],

                selectedIts2: [],
                selectedAutomobiles2: [],
                selectedHS2: []
                

            }
        },
        watch: {
            dialog(newValue){
                if(newValue){
                    const data = this.typeItems()
                    data.forEach( x => {
                        switch(this.typeData){
                            case 'IT':
                                this.selectedIts.push(x._id)
                            break;
                            case 'Automobil':
                                this.selectedAutomobiles.push(x._id)
                            break;
                            case 'HousingSector':
                                this.selectedHS.push(x._id)
                            break;
                        }
                    })
                } else{
                    this.showTable = false
                    this.openDialog()
                    const data = this.typeItemsSelected()
                    switch(this.typeData){
                        case 'IT':
                            this.$store.commit('changeValues', { selectedIts: this.selectedIts, type: 1 })
                            this.its.forEach( x => {
                                data.forEach(y => {
                                    if(x._id == y){
                                        this.selectIts.push(x)
                                    }
                                })
                            })
                            this.selectedIts2 = this.selectedIts
                        break;
                        case 'Automobil':
                            this.$store.commit('changeValues', { selectedAutomobiles: this.selectedAutomobiles, type: 2 })
                            this.automobiles.forEach( x => {
                                data.forEach(y => {
                                    if(x._id == y){
                                        this.selectAutomobiles.push(x)
                                    }
                                })
                            })
                            this.selectedAutomobiles2 = this.selectedAutomobiles
                        break;
                        case 'HousingSector':
                            this.$store.commit('changeValues', { selectedHS: this.selectedHS, type: 3 })
                            this.housingSectors.forEach( x => {
                                data.forEach(y => {
                                    if(x._id == y){
                                        console.log('hola')
                                        this.selectHS.push(x)
                                    }
                                })
                            })
                            this.selectedHS2 = this.selectedHS
                        break;
                    }
                    this.selectedIts = []
                    this.selectedAutomobiles = []
                    this.selectedHS = []
                    setTimeout(() => {
                        this.showTable = true
                        this.closeDialog()
                    }, 1);
                }
            },
            division(newValue){
                switch(this.typeData){
                    case 'IT':
                        this.selectIts = newValue?.IT ? newValue?.IT : []
                        this.selectIts.forEach(x => {
                            this.selectedIts.push(x._id)
                        })
                        return this.selectIts
                    case 'Automobil':
                        this.selectAutomobiles = newValue?.automobile ? newValue?.automobile : []
                        this.selectAutomobiles.forEach(x => {
                            this.selectedAutomobiles.push(x._id)
                        })
                        return this.selectAutomobiles = newValue?.automobile
                    case 'HousingSector':
                        this.selectHS = newValue?.housingSector ? newValue?.housingSector : [] 
                        this.selectHS.forEach(x => {
                            this.selectedHS.push(x._id)
                        })
                        return this.selectHS
                }
            }
        },
        async created(){
            if(process.browser){
                this.showTable = false
                // this.openDialog()
                await this.getData()
                setTimeout(() => {
                    this.showTable = true
                    // this.closeDialog()
                }, 1);
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
            changeData(){
                switch(this.typeData){
                    case 'IT':
                        this.$store.commit('changeValues', { selectedIts: this.selectedIts2, type: 1 })
                    break
                    case 'Automobil':
                        this.$store.commit('changeValues', { selectedAutomobiles: this.selectedAutomobiles2, type: 2 })
                    break
                    case 'HousingSector':
                        this.$store.commit('changeValues', { selectedHS: this.selectedHS2, type: 3 })
                    break
                }
            },
            openDialog(){
                this.$refs.loadingCardDialog.openDialog()
            },
            closeDialog(){
                this.$refs.loadingCardDialog.closeDialog()
            },
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
                        return this.selectIts ? this.selectIts : [] 
                    case 'Automobil':
                        return this.selectAutomobiles ? this.selectAutomobiles : []
                    case 'HousingSector':
                        return this.selectHS ? this.selectHS : []
                }
            },
            typeItemsSelected(){
                switch(this.typeData){
                    case 'IT':
                        this.selectIts = []
                        return this.selectedIts
                    case 'Automobil':
                        this.selectAutomobiles = []
                        return this.selectedAutomobiles
                    case 'HousingSector':
                        this.selectHS = []
                        return this.selectedHS
                }
            },
            typeItemsFor(){
                switch(this.typeData){
                    case 'IT':
                        return this.its ? this.its : []
                    case 'Automobil':
                        return this.automobiles ? this.automobiles : []
                    case 'HousingSector':
                        return this.housingSectors ? this.housingSectors : []
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
<template>
  <v-layout row wrap :class="isLoading ? 'isHiden' : ''">
    <v-flex xs12 justify-center>
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
          <v-card-text>{{ text }} + {{tab}}</v-card-text>
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
    <LoadingCardDialog ref="loadingCardDialog"/>
  </v-layout>
</template>

<script>
  import LoadingCardDialog from '@/components/helpers/loadingCardDialog.vue'
  import AllCardDivisiones from '@/components/divisiones/allCardDisivisiones.vue'
  export default {
    components: {
      AllCardDivisiones,
      LoadingCardDialog
    },
    data() {
      return {
        it: null,
        divisiones: [],
        divisionId: null,
        division: [],
        isLoading: true,
        tab: null,
        items: [
          'Division', 'Agregar',
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
    methods: {
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
            }
          })
        }else {
          this.division = null
          this.divisionId = null
        }
      }
    }
  }
</script>

<style>

</style>
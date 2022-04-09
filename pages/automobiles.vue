<template>
  <v-layout row wrap :class="isLoading ? 'isHiden' : ''">
    <v-flex xs12 md4>
      <addautoCard ref="addautoCard"/>
    </v-flex>
    <v-flex xs12 md8>
      <autoCard ref="autoCard"/>
    </v-flex>
    <LoadingCardDialog ref="loadingCardDialog" />
  </v-layout>
</template>

<script>
  import autoCard from '@/components/automobiles/autoCard.vue'
  import addautoCard from '@/components/automobiles/addautoCard.vue'
  import LoadingCardDialog from '@/components/helpers/loadingCardDialog.vue'
  export default {
    components: {
    autoCard,
    addautoCard,
    LoadingCardDialog
    },
    data() {
      return {
        it: null,
        isLoading: true
      }
    },
    methods: {
      async getautomobiles() {
        await this.$refs.autoCard.getautomobiles()
      },
      openDialog() {
        this.$refs.loadingCardDialog.openDialog()
      },
      closeDialog() {
        this.$refs.loadingCardDialog.closeDialog()
      }
    },
    async mounted() {
      if(process.browser){
        this.openDialog()
        await this.getautomobiles()
        this.closeDialog()
        this.isLoading = false
      }
    },
    watch: {
      it(newvalue) {
        if(newvalue){
          this.$refs.addautoCard.getautomobiles(newvalue)
        }else {
          this.$refs.addautoCard.$refs.form.reset()
        }
      }
    }
  }
</script>

<style>

</style>
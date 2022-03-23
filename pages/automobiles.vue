<template>
  <v-layout row wrap :class="isLoading ? 'isHiden' : ''">
    <v-flex xs12 md4>
      <AddITCard ref="addITCard"/>
    </v-flex>
    <v-flex xs12 md8>
      <ITCard ref="iTCard" />
    </v-flex>
    <LoadingCardDialog ref="loadingCardDialog" />
  </v-layout>
</template>

<script>
  import ITCard from '@/components/it/itCard.vue'
  import AddITCard from '@/components/it/addItCard.vue'
  import LoadingCardDialog from '@/components/helpers/loadingCardDialog.vue'
  export default {
    components: {
      ITCard,
      AddITCard,
      LoadingCardDialog
    },
    data() {
      return {
        it: null,
        isLoading: true
      }
    },
    methods: {
      async getIt() {
        await this.$refs.iTCard.getIt()
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
        await this.getIt()
        this.closeDialog()
        this.isLoading = false
      }
    },
    watch: {
      it(newvalue) {
        if(newvalue){
          this.$refs.addITCard.getIt(newvalue)
        }else {
          this.$refs.addITCard.$refs.form.reset()
        }
      }
    }
  }
</script>

<style scoped>
  .isHiden {
    visibility: hidden;
  }
</style>
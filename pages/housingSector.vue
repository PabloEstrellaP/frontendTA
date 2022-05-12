<template>
  <v-layout row wrap :class="isLoading ? 'isHiden' : ''">
    <v-flex xs12 md4>
      <addhs ref="addhs"/>
    </v-flex>
    <v-flex xs12 md8>
      <hsCard ref="hsCard" />
    </v-flex>
    <LoadingCardDialog ref="loadingCardDialog" />
  </v-layout>
</template>

<script>
  import hsCard from '@/components/housingSector/hsCard.vue'
  import Addhs from '@/components/housingSector/addhs.vue'
  import LoadingCardDialog from '@/components/helpers/loadingCardDialog.vue'
  export default {
    components: {
      hsCard,
      Addhs,
      LoadingCardDialog
    },
    data() {
      return {
        hs: null,
        isLoading: true
      }
    },
    methods: {
      async geths() {
        await this.$refs.hsCard.geths()
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
        await this.geths()
        this.closeDialog()
        this.isLoading = false
      }
    },
    watch: {
      hs(newvalue) {
        if(newvalue){
          this.$refs.Addhs.geths(newvalue)
        }else {
          this.$refs.Addhs.$refs.form.reset()
        }
      }
    }
  }
</script>

<style>

</style>
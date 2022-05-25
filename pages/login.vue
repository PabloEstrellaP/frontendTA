<template>
  <v-container fill-height fluid>
  <v-row align="center"
      justify="center">
      <v-col>
        <LoginCard ref="loginCard" />
      </v-col>
  </v-row>
</v-container>
</template>

<script>
    import { mapState } from 'vuex'
    import LoginCard from '@/components/login/loginCard.vue'
    export default {
      layout: 'login',
      components: {
          LoginCard
      },
      created(){
        if(process.browser){
          if(this.isLoged){
            this.$router.push({path: '/'})
          }
          if(localStorage.getItem('isLoged') == 'true'){
            this.$router.push({path: '/'})
          }
        }
      },
      computed: mapState(['isLoged']),
    }
</script>

<style scoped>

</style>
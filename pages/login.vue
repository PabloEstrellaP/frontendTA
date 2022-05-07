<template>
  <v-layout row wrap justify-center>
      <LoginCard ref="loginCard" />
  </v-layout>
</template>

<script>
    import LoginCard from '@/components/login/loginCard.vue'
    export default {
        layout: 'login',
        components: {
            LoginCard
        }
    }
</script>

<style scoped>

</style>
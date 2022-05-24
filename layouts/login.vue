<template>
   <v-app dark>
       <v-main>
            <v-container pa-5>
                <Nuxt />
            </v-container>
        </v-main>
   </v-app>
</template>

<script>
    import { getPermissions } from '@/static/permissions.js'

    export default {
        async created(){
            if(process.browser){
            await this.getPermissionsFromBack()
            }
        },
        methods: {
            async getPermissionsFromBack(){
            const data = await getPermissions()
            this.$store.commit('getPermissions', data)
            }
        },
    }
</script>

<style>

</style>
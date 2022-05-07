<template>
  
</template>

<script>
    export default {
        async created(){
            if(process.browser){
                await this.renovateToken()
            }
        },
        methods: {
            async renovateToken(){
                try {
                    if(!localStorage.token || !localStorage.user)
                        this.$router.push({path: '/login'});
                    const body = {
                        token: localStorage.token,
                        user: localStorage.user
                    }
                    const data = await this.$axios.$post('/auth/renovate', body)  
                    if(data.ok){
                        this.$store.commit('addData', data.user)
                        localStorage.setItem('token', data.token)
                        localStorage.setItem('user', data.user)
                        if(this.$route.name == 'login')
                            this.$router.push({path: '/'});
                    }else{
                        localStorage.removeItem('token')
                        localStorage.removeItem('user')
                        this.$router.push({path: '/login'});
                    }
                        
                } catch (error) {
                    console.log(error)
                    localStorage.removeItem('token')
                    localStorage.removeItem('user')
                    this.$router.push({path: '/login'});
                }
            }
        }
    }
</script>

<style>

</style>
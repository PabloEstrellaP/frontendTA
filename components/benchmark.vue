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
                        this.$store.commit('isLoged', true)
                        localStorage.setItem('token', data.token)
                        localStorage.setItem('user', data.user)
                        localStorage.setItem('isLoged', true)
                        if(this.$route.name == 'login')
                            this.$router.push({path: '/'});
                    }else{
                        this.$store.commit('isLoged', false)
                        localStorage.removeItem('token')
                        localStorage.removeItem('user')
                        localStorage.removeItem('isLoged')
                        localStorage.setItem('isLoged', false)
                        this.$router.push({path: '/login'});
                    }
                        
                } catch (error) {
                    console.log(error)
                    localStorage.removeItem('token')
                    localStorage.removeItem('user')
                    localStorage.removeItem('isLoged')
                    localStorage.setItem('isLoged', false)

                    this.$router.push({path: '/login'});
                }
            }
        }
    }
</script>

<style>

</style>
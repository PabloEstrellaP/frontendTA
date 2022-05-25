<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in menu"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list>
        <v-list-item
          @click="logOut()"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="'Log Out'" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="primary"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <!-- <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn> -->
      <!-- <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <!-- <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-main>
      <v-container pa-5>
        <Nuxt />
      </v-container>
    </v-main>
    <!-- <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <Benchmark ref="benchmark" />
  </v-app>
</template>

<script>
  import Benchmark from '@/components/benchmark.vue'
  import { getPermissions } from '@/static/permissions.js'
  import { mapState } from 'vuex'
export default {
  components: {
    Benchmark
  },
  name: 'DefaultLayout',
  watch: {
    async $route(to, from){
      this.getPath(to.name)
      await this.$refs.benchmark.renovateToken()
    } 
  },
  async created(){
    if(process.browser){
      await this.getPermissionsFromBack()
      await this.$refs.benchmark.renovateToken()
      this.getPath(this.$route.name)
    }
  },
  methods: {
    logOut(){
      this.$store.commit('isLoged', false)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('isLoged')
      this.$router.push({path: '/login'});
    },
    async getPermissionsFromBack(){
      const data = await getPermissions()
      this.$store.commit('getPermissions', data)
    },
    getPath(namePath){
      switch(namePath){
        case 'index':
        break
        case 'division':
          this.getPermission(0)
        break
        case 'it':
          this.getPermission(1)
        break
        case 'housingSector':
          this.getPermission(2)
        break
        case 'automobiles':
          this.getPermission(3)
        break
        case 'user':
          this.getPermission(4)
        break
        default:
          this.$router.push({path: '/error'})
        break
      }
    },
    getPermission(permission){
      return this.userPermissions[permission] ? true : this.$router.push({path: '/error'})
    }
  },
  computed: mapState(['menu', 'userPermissions']),
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Gobierno de Kanasín'
    }
  },  
}
</script>


import { updatePermissions, getMenu } from '@/static/permissions.js'

export const state = () => ({
    isLoged: false,
    name: '',
    lastName: '',
    rol: '',
    permissions: [],
    userName: '',

    selectedIts: [],
    selectedAutomobiles: [],
    selectedHS: [],

    permissionsFromBack: [],
    userPermissions: [],

    items: [
      {
        icon: 'mdi-apps',
        title: 'Welcome',
        to: '/'
      },
      {
        icon: 'mdi-home',
        title: 'División',
        to: '/division'
      },
      {
        icon: 'mdi-laptop',
        title: 'Informática',
        to: '/it'
      },
      {
        icon: 'mdi-contacts',
        title: 'Inmobiliaria',
        to: '/housingSector'
      },
      {
        icon: 'mdi-car',
        title: 'Automóviles',
        to: '/automobiles'
      },
      {
        icon: 'mdi-account-circle',
        title: 'Usuarios',
        to: '/user'
      }
    ],
    menu: []

  })
  
  export const mutations = {
    isLoged(state, loged){
      state.isLoged = loged
    },
    getPermissions(state, data){
      state.permissionsFromBack = data
    },
    addData(state, data) {
      if(state.permissions != data.rol?.permissions){
        state.userPermissions = updatePermissions(state, data)
        state.menu = getMenu(state)
        state.permissions = data.rol?.permissions
      }
      state.name = data.personalData?.name
      state.lastName = data.personalData?.lastName
      state.rol = data.rol?.name
      state.userName = data.userName
    },
    changeValues(state, data){
      switch(data.type){
        case 1:
          state.selectedIts = data.selectedIts
        break;
        case 2:
          state.selectedAutomobiles = data.selectedAutomobiles
        break;
        case 3:
          state.selectedHS = data.selectedHS
        break;
      }
    },
    resetValues(state){
      state.selectedIts = []
      state.selectedAutomobiles = []
      state.selectedHS = []
    }
  }
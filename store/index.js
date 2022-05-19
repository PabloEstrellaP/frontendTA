export const state = () => ({
    name: '',
    lastName: '',
    rol: '',
    permissions: [],
    userName: '',

    selectedIts: [],
    selectedAutomobiles: [],
    selectedHS: []

  })
  
  export const mutations = {
    addData(state, data) {
        state.name = data.personalData?.name
        state.lastName = data.personalData?.lastName
        state.rol = data.rol?.name
        state.permissions = data.rol?.permissions
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
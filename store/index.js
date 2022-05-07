export const state = () => ({
    name: '',
    lastName: '',
    rol: '',
    permissions: [],
    userName: '',

  })
  
  export const mutations = {
    addData(state, data) {
        console.log(data)
        state.name = data.personalData?.name
        state.lastName = data.personalData?.lastName
        state.rol = data.rol?.name
        state.permissions = data.rol?.permissions
        state.userName = data.userName
        console.log(state)
    }
  }
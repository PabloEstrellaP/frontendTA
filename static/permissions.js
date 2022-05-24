import axios from 'axios'
import { constants } from '@/static/constants'

export const getPermissions = async() => {
    try {
        const data = await axios.get(`${constants.path}/permissions/`, {
            headers: { token: localStorage.token }
        })   
        return data.data?.msg ? data.data?.msg : []
    } catch (error) {
        return []
    }
    
}

export const updatePermissions = (state, data) => {
    let hasPermission = []
    if(state.permissions != data.rol?.permissions){
        state.permissionsFromBack.forEach(x => {
            let isTrue = false
            state.permissions.forEach(y => {
                if(x.uid == y){
                    isTrue = true
                    hasPermission.push(true)
                }
            })
            if(!isTrue){
                hasPermission.push(false)
            }
        })
    }
    return hasPermission
}

export const getMenu = (state) => {
    let items = []
    state.items.forEach((x,i) => {
        if(i > 0){
            if(state.userPermissions[i-1]){
                items.push(x)
            }
        } else{
                items.push(x)
        }
    })
    return items
}
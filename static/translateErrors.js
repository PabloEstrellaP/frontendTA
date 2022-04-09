

export const translateErrorIT = ( error ) => {
    switch(error) {
        case 'Serial is used':
            return 'Serial está en uso'
        default:
            return 'Localice un administrador'
    }
}

export const translateErrorUser = ( error ) => {
    switch(error) {
        case 'Email is used':
            return 'Correo está en uso'
        default:
            return 'Localice un administrador'
    }
}
export const translateErrorAutomobile =(error)=>{
    switch (error) {
        case 'plaque, motorSerial, serial are used':
            return 'La placa, serial del motor, serial esta en uso'
        default:
            return 'Localice un administrador'
    }
}

export const translateErrorUserAuth = ( error ) => {
    switch(error) {
        default:
            return 'Localice un administrador'
    }
}

export const translateErrorHS = ( error ) => {
    switch(error){
        case 'serial is used':
        return 'serial esta en uso'
        default:
            return'Localice un administrador'
    }
}
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

export const translateErrorUserAuth = ( error ) => {
    switch(error) {
        default:
            return 'Localice un administrador'
    }
}
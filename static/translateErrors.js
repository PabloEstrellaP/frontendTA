

export const translateErrorIT = ( error ) => {
    switch(error) {
        case 'Serial is used':
            return 'Serial está en uso'
        default:
            return 'Localice un administrador'
    }
}
export const translateErrorAutos =(error)=>{
    switch (error) {
        case 'plaque, motorSerial, serial are used':
            
            return 'La placa, serial del motor, serial esta en uso'
    
        default:
            return 'Localice un administrador'
    }
}
export const translateErrorHS=(error)=>{
    switch(error){
        case 'serial is used':
        return 'serial esta en uso'
        default:
            return'Localice un administrador'
    }
}
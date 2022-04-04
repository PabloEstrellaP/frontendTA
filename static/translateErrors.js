

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
        case 'serial is used':
            
            return 'Serial esta en uso'
    
        default:
            return 'Localice un administrador'
    }
}
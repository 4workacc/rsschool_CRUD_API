export const chechIsUUID = (userId: string ) => {
    let uuid4Reg:RegExp = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i; 
    return uuid4Reg.test(userId);
}

export const showMessage = (msg: string) => {
    
}
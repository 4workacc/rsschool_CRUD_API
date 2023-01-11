let usersBase = [
    {
        id: '1a1',
        username: 'Joy',
        age: 200,
        hobbies: []
    }
];

export const getAllUsers = () => {
    return usersBase;
}

export const getCurrentUser = (userId) => {   
    let outUser = {
        id: -1
    };
    usersBase.forEach( el => {
        if ( el.id === userId ) {            
            outUser = el;
        }
    })
    return outUser;
}
import * as uuid from 'uuid';

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

export const putUser = ( userData ) => {
    let newUUID = uuid.v4();
    if ( userData.username && userData.age && userData.hobbies ) {
        let newUser = {
            id: newUUID,
            username: userData.username,
            age: userData.age,
            hobbies: userData.hobbies
        };
        usersBase.push(newUser);
        console.log(usersBase)
        return newUser;
    } else {
        return {
            id: -1
        }
    }
}
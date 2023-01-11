import * as uuid from 'uuid';

let usersBase = [   
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

export const updateUser = ( userId, userData ) => {    
    let user = {id: -1};
    usersBase.forEach( el => {
        if ( el.id = userId ) {
            el.id = userId;
            el.username = userData.username;
            el.age = userData.age;
            el.hobbies = userData.hobbies ;
            };
            user = el;
        }
    )
   return user;
}

export const deleteUser= ( userId) => {   
    for ( let i=0; i<usersBase.length; i++) {
        if ( usersBase[i].id === userId ) {
            usersBase.splice(i, 1)
        }
    } 
}
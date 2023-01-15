import { IUserData } from "./inerfaces";
import * as uuid from 'uuid';
import { userBase } from "./userBase";



export const getAllUsersController = ():IUserData[] => {
    return userBase;
};

export const getOneUserController = ( userId: string ):IUserData => {
    let outUser:IUserData = {
        id: '-1',
        username: '',
        age: 1,
        hobbies: []
    };
    userBase.forEach( (el:IUserData) => {
        if ( el.id === userId ) {
            outUser = el;
        }
    });
    return outUser;
};

export const addUserController = (userData: IUserData):IUserData => {
    console.log('hobbies', userData.hobbies)
    let newUUID: string = uuid.v4();
    let newUser = {
        id: newUUID,
        username: userData.username,
        age: userData.age,
        hobbies: userData.hobbies,
    };
    userBase.push(newUser);
    return newUser;
};

export const modifyUserController = (userId: string, updatedUserData: IUserData ) => {};

export const deleteUser = (userId: string ):number => {
    for ( let i=0; i<userBase.length; i++) {
                if ( userBase[i].id === userId ) {
                    userBase.splice(i, 1);
                    return 200;
                }
            } 
            return 404;
};

import { IUserData } from "./inerfaces";
import * as uuid from 'uuid';
import { userBase } from "./userBase";
import * as fs from 'fs';
import { readFile, writeFile } from 'fs/promises';

export const getAllUsersController = async (): Promise<IUserData[]> => {
    let data = JSON.parse(await readFile("./src/db/local.json", "utf8")) || [];
    return (data);
};

export const getOneUserController = async (userId: string): Promise<IUserData> => {
    let outUser: IUserData = {
        id: '-1',
        username: '',
        age: 1,
        hobbies: []
    };
    let data = JSON.parse(await readFile("./src/db/local.json", "utf8")) || [];
    data.forEach((el: IUserData) => {
        if (el.id === userId) {
            outUser = el;
        }
    });
    return outUser;
};

export const addUserController = async (userData: IUserData): Promise<IUserData> => {
    let newUUID: string = uuid.v4();
    let newUser = {
        id: newUUID,
        username: userData.username,
        age: userData.age,
        hobbies: userData.hobbies,
    };
    let arr = [];
    await readFile("./src/db/local.json", "utf8").then((data) => {
        arr = JSON.parse(data);
        arr.push(newUser);
        writeFile('./src/db/local.json', JSON.stringify(arr))
    });

    return newUser;
};

export const modifyUserController = async (userId: string, updatedUserData: IUserData): Promise<IUserData> => {
    let userArr: [] = [];
    let updatedUser: IUserData;
    await readFile("./src/db/local.json", "utf8").then((data) => {        
        userArr = JSON.parse(data);
        userArr.forEach((el: IUserData) => {
            if (el.id === userId) {
                el.username = updatedUserData.username === 'XXX' ? el.username : updatedUserData.username;
                el.age = updatedUserData.age === -1 ? el.age : updatedUserData.age;
                el.hobbies = updatedUserData.hobbies.length === 0 ? el.hobbies : updatedUserData.hobbies;
                updatedUser = el;
                writeFile('./src/db/local.json', JSON.stringify(userArr)); 
                return el;
            }
            else {
                updatedUser = {
                    id: '-123',
                    username: "",
                    age: -1,
                    hobbies: []
                }                
            }
        })                  
    })   
    return updatedUser;
};

export const deleteUser = async (userId: string): Promise<any> => {
    let ansCode = 404;
    let arr = [];
    await readFile("./src/db/local.json", "utf8").then((data) => {
        arr = JSON.parse(data);
        arr.forEach((el, i) => {
            if (el.id === userId) {
                arr.splice(i, 1);
                writeFile('./src/db/local.json', JSON.stringify(arr));
                console.log(`DELETE status`, 204)
                ansCode = 204;
            }
        })
    });
    return ansCode;
};

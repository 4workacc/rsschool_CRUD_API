// export const putUser = ( userData ) => {
//     let newUUID = uuid.v4();
//     if ( userData.username && userData.age && userData.hobbies ) {
//         let newUser = {
//             id: newUUID,
//             username: userData.username,
//             age: userData.age,
//             hobbies: userData.hobbies
//         };
//         usersBase.push(newUser);
//         console.log(usersBase)
//         return newUser;
//     } else {
//         return {
//             id: -1
//         }
//     }
// }

// export const updateUser = ( userId, userData ) => {    
//     let user = {id: -1};
//     usersBase.forEach( el => {
//         if ( el.id = userId ) {
//             el.id = userId;
//             el.username = userData.username;
//             el.age = userData.age;
//             el.hobbies = userData.hobbies ;
//             };
//             user = el;
//         }
//     )
//    return user;
// }

export const chechIsUUID = (userId: string ) => {
    let uuid4Reg:RegExp = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i; 
    return uuid4Reg.test(userId);
}
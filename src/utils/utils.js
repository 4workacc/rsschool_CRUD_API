export const getAllUsers = () => {
    return 1
}

export const getCurrentUser = (userId) => {
    if (userId === '1') {
        return {
            id: userId,
            username: 'Joy',
            age: 200,
            hobbies: []
        };
    } else {
        return {
            id: -1
        }
    }
}
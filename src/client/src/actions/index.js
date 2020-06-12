export const updateLocation = (data)=>{
    return {
        type: 'UPDATE_LOCATION',
        payload: data,
    };
}

export const updateUser = (data)=>{
    return {
        type: 'UPDATE_USER',
        payload: data,
    };
}

export const updateFriends = (data)=>{
    return {
        type: 'UPDATE_FRIENDS',
        payload: data,
    };
}
export const signIn = (data)=>{
    return {
        type: 'SIGN_IN',
        payload: data,
    };
}
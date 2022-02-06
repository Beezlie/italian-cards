export const logIn = username => ({
    type: 'LOG_IN',
    payload: username
});

export const logOut = () => ({
    type: 'LOG_OUT'
});

export const updateUsername = username => ({
    type: 'UPDATE_USERNAME',
    payload: username
});
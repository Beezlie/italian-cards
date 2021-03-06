const DEFAULT_STATE = {
    loggedIn: false,
    username: ''
};

const userReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'LOG_IN': {
            const username = action.payload.username;
            return { ...state, username, loggedIn: true };
        }
        case 'LOG_OUT': {
            return { ...state };
        }
        case 'UPDATE_USERNAME': {
            const username = action.payload.username;
            return { ...state, username };
        }
        default:
            return state;
    }
};
export default userReducer;
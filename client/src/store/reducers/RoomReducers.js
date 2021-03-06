const DEFAULT_STATE = {
    roomId: '',
    password: '',
    gameStarted: false,
    options: {}
};

const roomReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'ADD_ROOMID': {
            const roomId = action.payload.roomId;
            return { ...state, roomId };
        }
        case 'REMOVE_ROOMID': {
            return { ...state, roomId: '', password: '' };
        }
        case 'ADD_PASSWORD': {
            const password = action.payload.password;
            return { ...state, password };
        }
        case 'ADD_OPTIONS': {
            const options = action.payload.options;
            return { ...state, options };
        }
        case 'UPDATE_ROOM': {
            const gameStarted = action.payload.gameStarted;
            return { ...state, gameStarted };
        }
        default:
            return state;
    }
};
export default roomReducer;
import gameReducer from './GameReducers';
import roomReducer from './RoomReducers';
import userReducer from './UserReducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    game: gameReducer,
    room: roomReducer,
    user: userReducer
});

export default rootReducer;
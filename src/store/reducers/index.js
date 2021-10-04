import roomReducer from './RoomReducers';
import userReducer from './UserReducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    room: roomReducer,
    user: userReducer
});

export default rootReducer;
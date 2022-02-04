export const addRoomId = roomId => ({
    type: 'ADD_ROOMID',
    payload: roomId
});

export const removeRoomId = () => ({
    type: 'REMOVE_ROOMID'
});

export const addPassword = password => ({
    type: 'ADD_PASSWORD',
    payload: password
});

export const addOptions = options => ({
    type: 'ADD_OPTIONS',
    payload: options
});

export const updateRoom = data => ({
    type: 'UPDATE_ROOM',
    payload: data
});
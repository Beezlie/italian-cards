import { socket } from '../Room/RoomLauncher';

export const subscribeTo = {

    updateChat: cb => {
        socket.on('update-chat', message => {
            console.log(message);
            cb(null, message);
        });
    },

    updateRoom: cb => {
        socket.on('update-room', data => {
            console.log(data);
            cb(null, data);
        });
    },

    startRound: cb => {
        socket.on('start-round', data => {
            console.log(data);
            cb(null, data);
        });
    },

    dealCards: cb => {
        socket.on('deal-cards', data => {
            console.log(data);
            cb(null, data);
        });
    },

    updateAfterTurn: cb => {
        socket.on('update-after-turn', data => {
            console.log(data);
            cb(null, data);
        });
    }
};
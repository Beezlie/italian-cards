import { socket } from '../Room/Room';

export const subscribeTo = {
    showPlayers: cb => {
        socket.on('show-players-joined', data => cb(null, data.playersJoined));
    },

    updateChat: cb => {
        socket.on('update-chat', message => {
            console.log(message);
            cb(null, message);
        });
    },

    playerConnected: cb => {
        socket.on('player-connected', username => {
            console.log(username);
            cb(null, username);
        });
    },

    playerDisconnected: cb => {
        socket.on('player-disconnected', message => {
            console.log(message);
            cb(null, message);
        });
    },

    gameStart: cb => {
        socket.on('game-start', data => {
            console.log(data);
            cb(null, data);
        });
    }

};
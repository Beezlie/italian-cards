import { socket } from '../Room/Room';

export const subscribeTo = {
    showPlayers: cb => {
        socket.on('show-players-joined', data => cb(null, data.playersJoined));
    },

    playerCollections: cb => {
        socket.on('show-players-teams', data => cb(null, data.teams));
    },

    myTurnStart: cb => {
        socket.on('personal-turn-start', message => {
            console.log(message);
            cb(null, message);
        });
    },

    playerTurnStart: cb => {
        socket.on('player-turn-start', message => {
            console.log(message);
            cb(null, message);
        });
    },

    personalTurnEnd: cb => {
        socket.on('personal-turn-end', message => {
            console.log(message);
            cb(null, message);
        });
    },

    playerTurnEnd: cb => {
        socket.on('player-turn-end', message => {
            console.log(message);
            cb(null, message);
        });
    },

    draftStart: cb => {
        socket.on('draft-start', message => {
            console.log(message);
            cb(null, message);
        });
    },

    draftEnd: cb => {
        socket.on('draft-end', message => {
            console.log(message);
            cb(null, message);
        });
    },

    updateChat: cb => {
        socket.on('update-chat', message => {
            console.log(message);
            cb(null, message);
        });
    },

    newPlayerJoined: cb => {
        socket.on('new-player-joined', message => {
            console.log(message);
            cb(null, message);
        });
    }
};
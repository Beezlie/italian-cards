import { socket } from '../Room/Room';

export const emit = {
    sendChatMessage: (message) => {
        socket.emit('send-chat-message', message);
    },

    playerReady: (username) => {
        socket.emit('player-ready', username);
    },

    sendPlayerMove: (playerCard, cardSelection) => {
        const data = {
            cards: [...cardSelection, playerCard],
        };
        socket.emit('send-player-move', data);
    },

    closeConnection: () => {
        socket.close();
    }
};
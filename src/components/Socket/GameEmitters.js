import { socket } from '../Room/Room';

export const emit = {
    sendChatMessage: (message) => {
        socket.emit('send-chat-message', message);
    },

    playerReady: username => {
        socket.emit('player-ready', username);
    },

    closeConnection: () => {
        socket.close();
    }
};
import { socket } from '../Room/Room';

export const emit = {
    startDraft: () => {
        socket.emit('is-ready');
    },

    playerTurnPass: item => {
        socket.emit('player-turn-pass', item);
    },

    sendChatMessage: (message) => {
        socket.emit('send-chat-message', message);
    },

    closeConnection: () => {
        socket.close();
    }
};
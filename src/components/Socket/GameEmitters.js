import { socket } from '../Room/RoomLauncher';

export const emit = {
    sendChatMessage: (message) => {
        socket.emit('send-chat-message', message);
    },

    playerReady: (username) => {
        socket.emit('player-ready', username);
    },

    sendPlayerMove: (playerCardKey, cardSelectionKeys) => {
        const data = {
            playerCard: playerCardKey,
            cardsPickedUp: cardSelectionKeys,
        };
        socket.emit('send-player-move', data);
    },

    closeConnection: () => {
        socket.close();
    }
};
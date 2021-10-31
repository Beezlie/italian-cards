export const startRound = data => ({
    type: 'START_ROUND',
    payload: data
});

export const endGame = () => ({
    type: 'END_GAME',
});

export const updateAfterPlayerTurn = data => ({
    type: 'UPDATE_AFTER_TURN',
    payload: data
});
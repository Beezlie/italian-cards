export const startRound = data => ({
    type: 'START_ROUND',
    payload: data
});

export const endGame = () => ({
    type: 'END_GAME',
});

export const updateAfterTurn = data => ({
    type: 'UPDATE_AFTER_TURN',
    payload: data
});
export const startGame = data => ({
    type: 'START_GAME',
    payload: data
});

export const endGame = () => ({
    type: 'END_GAME',
});

export const updateScore = data => ({
    type: 'UPDATE_SCORE',
    payload: data
});
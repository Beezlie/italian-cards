export const startRound = data => ({
    type: 'START_ROUND',
    payload: data
});

export const dealCards = data => ({
    type: 'DEAL_CARDS',
    payload: data
});

export const updateAfterTurn = data => ({
    type: 'UPDATE_AFTER_TURN',
    payload: data
});
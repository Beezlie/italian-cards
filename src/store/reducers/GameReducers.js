const DEFAULT_STATE = {
    roundScore: {
        cards: 0,
        setteBello: 0,
        dinare: 0,
        sevens: 0,
        scopa: 0,
    },
    teamScore: [0, 0],
    gameStarted: false,
    team: 0,
};

const gameReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'UPDATE_SCORE': {
            const { team } = state;
            const roundScore = action.payload.scores[team].roundScore;
            return { ...state, roundScore };
        }
        case 'START_GAME': {
            //TODO - how best to send all this data?
            const team = action.payload.team;
            const roundScore = action.payload.scores[team].roundScore;
            return { ...state, team, roundScore, gameStarted: true };
        }
        case 'END_GAME': {
            return { ...state, gameStarted: false };
        }
        default:
            return state;
    }
};
export default gameReducer;
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
    isPlayerTurn: false,
    team: 0,
};

const gameReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'UPDATE_AFTER_TURN': {
            return {
                ...state,
                isPlayerTurn: action.payload.isPlayerTurn,
            };
        }
        case 'START_ROUND': {
            const team = action.payload.team;
            const teamScore = [
                action.payload.scores[0].teamScore,
                action.payload.scores[1].teamScore
            ];
            return {
                ...state,
                team: team,
                isPlayerTurn: action.payload.isPlayerTurn,
                roundScore: action.payload.scores[team].roundScore,
                teamScore: teamScore,
                gameStarted: true,
            };
        }
        case 'END_GAME': {
            return { ...state, gameStarted: false };
        }
        default:
            return state;
    }
};
export default gameReducer;
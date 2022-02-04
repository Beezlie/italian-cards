const DEFAULT_STATE = {
    roundScore: [],
    teamScore: [],
    isPlayerTurn: false,
    team: 0,
    deckCount: 0,
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
                action.payload.scores[1].teamScore,
            ];
            const roundScore = [
                action.payload.scores[0].roundScore,
                action.payload.scores[1].roundScore,
            ];
            return {
                ...state,
                team: team,
                deckCount: action.payload.deckCount,
                isPlayerTurn: action.payload.isPlayerTurn,
                teamScore: teamScore,
                roundScore: roundScore,
            };
        }
        case 'DEAL_CARDS': {
            return {
                ...state,
                deckCount: action.payload.deckCount,
            };
        }
        default:
            return state;
    }
};
export default gameReducer;
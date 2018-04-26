import gameActionTypes from 'ActionTypes/gameActionTypes';
import gameInitialState from 'InitialStates/gameInitialState';

const reducers = {
    setActionGames: (state, action) => {
        return {
            ...state,
            actionGames: action.actionGames
        }
    },
    setEducationalGames: (state, action) => {
        return {
            ...state,
            educationalGames: action.educationalGames
        }
    },
    setFunnyGames: (state, action) => {
        return {
            ...state,
            funnyGames: action.funnyGames
        }
    }
};

const gameReducer = (state = gameInitialState, action) => {
    switch (action.type) {
        case gameActionTypes.SET_ACTION_GAMES:
            return reducers.setActionGames(state,action);
        case gameActionTypes.SET_EDUCATIONAL_GAMES:
            return reducers.setEducationalGames(state,action);
        case gameActionTypes.SET_FUNNY_GAMES:
            return reducers.setFunnyGames(state,action);
        default:
            return state;
    }
}

export default gameReducer;
import gameActionTypes from 'ActionTypes/gameActionTypes';

const actions = {
    setActionGames: (actionGames) => {
        return {
            type: gameActionTypes.SET_ACTION_GAMES,
            actionGames
        }
    },
    setEducationalGames: (educationalGames) => {
        return {
            type: gameActionTypes.SET_EDUCATIONAL_GAMES,
            educationalGames
        }
    },
    setFunnyGames: (funnyGames) => {
        return {
            type: gameActionTypes.SET_FUNNY_GAMES,
            funnyGames
        }
    }
};

export default actions;
import videoActionTypes from 'ActionTypes/videoActionTypes';
import videoInitialState from 'InitialStates/videoInitialState';
import store from 'Services/store';

const videoReducer = (state = videoInitialState, action) => {
    switch (action.type) {
        case videoActionTypes.SET_VIDEOS:
            return store.defaultReducer(state,action);
        default:
            return state;
    }
}

export default videoReducer;
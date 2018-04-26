import appActionTypes from 'ActionTypes/appActionTypes';
import appInitialState from 'InitialStates/appInitialState';
import store from 'Services/store';


const appReducer = (state = appInitialState, action) => {
    switch (action.type) {
        case appActionTypes.SET_IS_LOADING:
            return store.defaultReducer(state,action);
        default:
            return state;
    }
}

export default appReducer;
import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'
import appReducer from 'Reducers/appReducer';
import videoReducer from 'Reducers/videoReducer';
import gameReducer from 'Reducers/gameReducer';


const wrappedReducers = combineReducers({
    app: appReducer,
    videos: videoReducer,
    games:gameReducer,
    form: reduxFormReducer //must use 'form' as the key name    
});

const rootReducer=(state,action)=>{
    //as recommended by Dan Abramov:
    //https://stackoverflow.com/a/35641992
    if(action.type==='SET_LOG_OUT'){
        state = undefined;
    }
    return wrappedReducers(state,action);
};
export default rootReducer;
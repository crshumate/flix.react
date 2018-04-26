import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import StoreSvc from 'Services/store';
import rootReducer from 'Reducers/rootReducer';



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const preloadedState = StoreSvc.loadState(); //from local storage
const middleware = [thunk];

let Store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
        applyMiddleware(...middleware)
    )
);


Store.subscribe(throttle(() => {
    StoreSvc.update(Store);
}, 1000));


export default Store;
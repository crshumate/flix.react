import LocalStorage from "./localStorage";
import initialStates from "InitialStates";

const store = {
    _initialStates: initialStates,
    _oldStore: null,
    _helpers: {
        _storeChanged: (currentStore) => {
            if (currentStore !== store._oldStore) {
                console.log('saving new store');
                return true;
            } else {
                console.log('nothing changed - optimizing');
                return false;
            }
        },
        /*
        
            Role: Write Method

            This private method filters out only those state objects (ie: ${user},${app},${customer}, etc) 
            we want to persist to window.localStorage.

            It further provides granular filtering on a per-prop basis within each state object
            ie: ${user.settings}, etc
            
            This granular filtering is defined within the 
            initialState of the object itself, ie: "InitialStates/userInitialState"

            There are two properties that identify persistence. 
            1. ${stateObject.persisted:true} 
               - If the ${obj.persisted} prop exists it should always be true, otherwise don't include it
            2. ${stateObject.whiteList}
               - If whiteList exists ${stateObject.persisted} MUST exist as well
               - ${stateObject.whiteList} is an array of strings indicating the props to persist.
               - All props outside of ${stateObject.whiteList} will be ignored
               - However in the case of a hard refresh, browser crash, etc, initialValues will be loaded in their place
               since we should always have some sort of value initial or otherwise. 

               This is because if you "watch" props with componentWillReceiveProps 
               it will not register a change. 

               This is because Redux must first add the prop to the store which interestingly enough is not 
               registered as a "change" that triggers componentWillReceiveProps. Kinda silly, but it does force
               us to have a schema fully defined so we don't just add stuff willy nilly in our app.

        */
        _persistFilter: (state) => {
            var stateToPersist = {};
            for (var i in state) {
                if (state.hasOwnProperty(i)) {
                    if (state[i].persisted) {
                        if (state[i].whiteList) {
                            stateToPersist[i] = store._helpers._propsToPersist(state, i);
                        } else {
                            stateToPersist[i] = state[i];
                        }
                    }
                }
            }
            return stateToPersist;
        },
        /*
            Role: Write Method
            If we have a ${stateObject.whiteList} this will persist only those props instead of the whole object
        */
        _propsToPersist: (state, key) => {
            let stateObject = state[key];
            let persistedProps = {};
            for (var i in stateObject) {
                if (stateObject.hasOwnProperty(i)) {
                    if (stateObject.whiteList.indexOf(i) !== -1) {
                        persistedProps[i] = stateObject[i];
                    }
                }
            }

            return persistedProps;
        },
        /*

            Role: Read Method

            This is where we combine our ${persistedState} with ${initialStates}. 
            
            ${initialStates} is imported from an index.js helper file in our initialStates directory 
            that  combines all the initialStates into one. 

            If a stateObject does not exists it creates it wholesale from the 
            correct prop in the ${initialStates} object. 

            If the stateObject does exist it:
            1. Appends {persisted:true} to the ${persistedState} since ironically, 
               but purposely ${stateObject.persisted} is not something we persist.
            2. It then checks if ${stateObject.whiteList} exists in the initialState. 
               If ${stateObject.whiteList} does exist it appends it to ${persistedState} since
               we again do not persist the whiteList.
        */
        _addInitialStateValues: (persistedState) => {
            for (var i in store._initialStates) {
                if (store._initialStates.hasOwnProperty(i)) {
                    //if stateObject doesn't exist use initialState data
                    if (!persistedState[i]) {
                        persistedState[i] = store._initialStates[i];
                    } else if (persistedState[i]) {
                        let initialStatePart = store._initialStates[i];
                        let persistedStatePart = persistedState[i];
                        //re-add persisted from intialValues...
                        persistedStatePart.persisted = true;
                        let whiteList = initialStatePart.whiteList;
                        if (whiteList) {
                            //re-add the whiteList from initialValues
                            persistedStatePart.whiteList = whiteList;

                            //if state object does exists && has a whiteList some props were not persisted
                            //we need to set initialValues for these by checking for missing props
                            persistedStatePart = store._helpers._checkForMissingProps(initialStatePart, persistedStatePart);
                        }

                    }


                }

            }
            return persistedState;
        },
        /*
            Role: Read Method
            In the event of a hard refresh, etc. his checks for missing props 
            within a stateObject that were not persisted as designated by the whiteList.
            
            However we still want to have default initialValues. This method adds initialValues
            back in.


        */
        _checkForMissingProps: (initialState, persistedState) => {
            for (var i in initialState) {
                if (initialState.hasOwnProperty(i)) {
                    if (!persistedState[i]) {
                        persistedState[i] = initialState[i];
                    }

                }
            }

            return persistedState;
        },
        _invalidateCache: (cachedState) => {
            let invalidateCache = false;
            if (cachedState.app && cachedState.app.version) {
                if (store._initialStates.app.version !== cachedState.app.version) {
                    invalidateCache = true;
                }
            } else {
                invalidateCache = true;
            }
            return invalidateCache;
        },
    },
    update: (redux) => {
        let currentState = redux.getState();
        let stateToPersist = store._helpers._persistFilter(currentState);
        let stringifiedStore = JSON.stringify(stateToPersist);

        if (store._helpers._storeChanged(stringifiedStore)) {
            const stringified = true;
            LocalStorage.saveState(stringifiedStore, stringified);
            store._oldStore = stringifiedStore;
        }
    },
    //This loads our initial app state. 
    //If there is ${persistedState} it will combine ${initialState} and ${persistedState} smartly.
    loadState: () => {
        let persistedState = LocalStorage.loadState();
        if (persistedState) {
            if (store._helpers._invalidateCache(persistedState)) {
                console.log('invalidating cache');
                persistedState = store._initialStates;
            } else {
                persistedState = store._helpers._addInitialStateValues(persistedState);
            }

        }
        return persistedState;
    },
    //this is the default reducer we use across all our reducers
    //keeps code DRY
    defaultReducer: (state, action) => {
        let keys = Object.keys(action);
        let stateKey = keys[1];
        return {
            ...state,
            [stateKey]: action[stateKey]
        };
    }
}


export default store;
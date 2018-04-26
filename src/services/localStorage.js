//https://egghead.io/lessons/javascript-redux-simplifying-the-arrow-functions
const LocalStorage = (() => {

    //private methods here
    /*const helpers={
        
    };*/

    return {
        loadState: () => {
            try {
                const serializedState = localStorage.getItem('shuflix');
                if (serializedState === null) {
                    return undefined; //must return undefined
                }
                return JSON.parse(serializedState);
            } catch (err) {
                return undefined; //must return undefined
            }
        },
        saveState: (state,stringified) => {
            try {
                if(!stringified){
                    state = JSON.stringify(state);    
                }
                
                localStorage.setItem('shuflix', state);
            } catch (err) {
                // Ignore write errors.
            }

        }
    }
})();


export default LocalStorage;


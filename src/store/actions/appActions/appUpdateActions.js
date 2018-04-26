import appSetActions from './appSetActions';
const actions = {
    updateIncrementPendingAjaxCalls: () => {
        return (dispatch, getState) => {
            let state = getState();
            let { pendingAjaxCalls,isLoading } = state.app;
            if(!isLoading){
                let isLoading = true;
                dispatch(appSetActions.setIsLoading(isLoading));
            }
            pendingAjaxCalls += 1;
            dispatch(appSetActions.setPendingAjaxCalls(pendingAjaxCalls));
            
        }
    },
    updateDecrementPendingAjaxCalls: () => {
        return (dispatch, getState) => {
            /**
            * we want to avoid the loader icon flashing on/off as 
            * ajax requests finish and new ones fire.
            *
            * It's possible one Ajax request waits for one to return before being fired off
            * We don't want <Loader> flashing as it does this.
            * 
            * Rather keep <Loader> visible until all dependent Ajax requests are fulfilled.
            *
            * A timeout of 100ms to fill in the "gaps" until all ajax requests are done
            */
            setTimeout(() => {
                let state = getState();
                let { pendingAjaxCalls } = state.app;
                
                if (pendingAjaxCalls > 0) {
                    pendingAjaxCalls -= 1;
                } 

                if (pendingAjaxCalls === 0) {
                    let isLoading = false;
                    dispatch(appSetActions.setIsLoading(isLoading));
                }

                dispatch(appSetActions.setPendingAjaxCalls(pendingAjaxCalls));
            }, 100)


        }
    }
};

export default actions;
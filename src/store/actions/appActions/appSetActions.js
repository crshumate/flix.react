import appActionTypes from 'ActionTypes/appActionTypes';

const actions = {
    setIsLoading: (isLoading) => {
        return {
            type: appActionTypes.SET_IS_LOADING,
            isLoading
        }

    },
    setPendingAjaxCalls:(pendingAjaxCalls)=>{
        return {
            type: appActionTypes.SET_PENDING_AJAX_CALLS,
            pendingAjaxCalls
        } 
    }
};

export default actions;
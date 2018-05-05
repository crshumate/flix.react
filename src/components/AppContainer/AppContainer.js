import App from './App/App';
import { connect } from 'react-redux';
import appUpdateActions from  'Actions/appActions/appUpdateActions';


const mapStateToProps = (state) => {
    let props = {
        isLoading:state.app.isLoading
    };
    return props;
};

const mapDispatchToProps = (dispatch, location) => {
    return {
        incrementPendingAjaxCalls:()=>{
            dispatch(appUpdateActions.updateIncrementPendingAjaxCalls())
        },
        decrementPendingAjaxCalls:()=>{
            dispatch(appUpdateActions.updateDecrementPendingAjaxCalls())
        },
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(App);
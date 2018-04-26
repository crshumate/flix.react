import App from './App/App';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    let props = {
        isLoading:state.app.isLoading
    };
    return props;
};

const mapDispatchToProps = (dispatch, location) => {
    return {

    }
}



export default connect(mapStateToProps, mapDispatchToProps)(App);
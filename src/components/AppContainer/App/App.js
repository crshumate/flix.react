import React, { Fragment, Component } from 'react';
import injectSheet from 'react-jss';
import CssBaseline from 'material-ui/CssBaseline';
import AppRouter from 'Components/AppContainer/AppRouter';
import appStyles from './app.style';

class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            loadedComponent:null,
            params:props.match.params
        };
        this.getComponent();
    }

    getComponent() {
        let componentPath;
        let {params} = this.state;
        if (params.module === 'videos') {
            componentPath = 'MediaContainer/MediaContainer';
        }else{
            //don't import
            return null;
        }

        import(`Components/${componentPath}`).then((loadedComponent) => {
                this.setState(()=>{
                    return{
                        loadedComponent:loadedComponent.default
                    }
                    
                });
                
        }, function(err) {
            console.log('failed', err);
        });
    }

    static getDerivedStateFromProps(newProps,prevState) {
        return{
            params:newProps.match.params
        }
    };

    componentDidUpdate(prevProps,prevState,snapshot){
        if(this.props !== prevProps){
            this.getComponent();    
        }
                
    };
    render() {
        
        let LoadedComponent = this.state.loadedComponent;
        let props = this.props;

        return (
            <Fragment>
                <CssBaseline />
                <AppRouter {...props}  />
               {LoadedComponent ? <LoadedComponent {...props} />:null}
            </Fragment>
        );

    }
};
export default injectSheet(appStyles)(App)
import React, { Fragment, Component } from 'react';
import injectSheet from 'react-jss';
import CssBaseline from 'material-ui/CssBaseline';
import AppRouter from 'Components/AppContainer/AppRouter';
import Loader from 'Common/Loader';
import appStyles from './app.style';

class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            isLoading:props.isLoading,
            loadedComponent:null,
            params:props.match.params
        };
        this.mounted=false;
        this.getComponent();
    };

    importComponent(componentPath) {
        import (`Components/${componentPath}`).then((loadedComponent) => {
            this.setState(() => {
                return {
                    loadedComponent: loadedComponent.default
                }

            });

        }, function(err) {
            console.log('failed', err);
        });
    };

    getComponent() {
        let componentPath;
        let {params} = this.state;
        if (params.module === 'videos') {
            componentPath = 'MediaContainer/MediaContainer';
            this.importComponent(componentPath);
        }else {
            //only run setState if component is mounted.
            if (this.mounted) {
                //actively clear out loaded component if there is no match...
                this.setState(() => {
                    return {
                        loadedComponent: null
                    }
                });
            }

        }

    }

    static getDerivedStateFromProps(newProps,prevState) {
        return{
            params:newProps.match.params,
            isLoading:newProps.isLoading
        }
    };

    componentDidUpdate(prevProps,prevState,snapshot){
        if(this.props !== prevProps){
            this.getComponent();    
        }
                
    };
    componentDidMount(){
        this.mounted=true;
    };
    render() {
        
        let LoadedComponent = this.state.loadedComponent;
        let {props, state} = this;

        return (
            <Fragment>
                <CssBaseline />
                <AppRouter {...props}  />
                <Loader showLoader={state.isLoading} />
               {LoadedComponent ? <LoadedComponent {...props} />:null}
            </Fragment>
        );

    }
};
export default injectSheet(appStyles)(App)
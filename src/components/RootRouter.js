import React,{Fragment} from 'react';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';
import AppContainer from 'Components/AppContainer/AppContainer';


/*
    
Need to add state data to the containers in your routes? You have two options:
    
    1. Use Render-Props (Strongly preferred unless it is a major component): 
        * Read how here: https://github.com/Unicity/Wiki/wiki/ReactJS-ReactRouter-Component-Props

    2. Create a container for your component and make it smart
    

Other Notes:

    ** <Redirect> must sit under the <Route> it is redirecting otherwise you get a 
        "You tried to redirect to the same route you're currently on" error

    ** <Redirect> should also have "exact" directive so it doesn't match on any other routes

    ** <Reboot /> is material-ui's version of normalize.css to clear default browser styles
*/


const Router = () => {

    /*
        Note: 
        `exact` tells ReactRouter4 this path has params and adds ${activeParent} and ${activeChild} 
        params values to ${props.match.params}.

        Omitting `exact` did not include params values likely because ReactRouter4 
        is inclusive of all paths rather than exclusive as most routers traditionally are.

        `exact` in effect makes it function like you'd expect most traditional routers
    */

    return (
        <HashRouter>
            <Fragment>
                <Switch>
                    <Route path="/:module/*" component={AppContainer} />
                    <Route path="/:module" component={AppContainer} />
                    <Redirect exact from='/' to='/videos'/>
                </Switch>
            </Fragment>
        </HashRouter>
    );
};
export default Router;
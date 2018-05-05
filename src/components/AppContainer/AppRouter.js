import React,{Fragment} from 'react';
import { HashRouter } from 'react-router-dom';
import PublicRoute from 'PublicRoute';
import About from 'Components/About/About';
import IframedShows  from 'MediaContainer/IframedShows/IframedShows';

const AppRouter = (props) => {
    return(
        <HashRouter>
            <Fragment>
                <PublicRoute exact path='/about' {...props} component={About} />
                <PublicRoute exact path='/duck-tales' {...props} component={IframedShows} />
            </Fragment>
        </HashRouter>
    );
};

export default AppRouter;
import React from 'react';
import { HashRouter } from 'react-router-dom';
import PublicRoute from 'PublicRoute';
import About from 'Components/About/About';

const AppRouter = (props) => {
    return(
        <HashRouter>
            <div>
                <PublicRoute exact path='/about' {...props} component={About} />
            </div>
        </HashRouter>
    );
};

export default AppRouter;
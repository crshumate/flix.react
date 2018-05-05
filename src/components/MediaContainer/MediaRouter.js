import React,{Fragment} from 'react';
import { HashRouter } from 'react-router-dom';
import Videos from 'MediaContainer/Videos/Videos';
import Games from 'MediaContainer/Games/Games';
import PublicRoute from 'PublicRoute';

const MediaRouter = (props) => {
    return (
        <HashRouter>
            <Fragment>
                <PublicRoute exact path='/videos' {...props} component={Videos} />
                <PublicRoute exact path='/games' {...props} component={Games} />
            </Fragment>
        </HashRouter>
    );
};
export default MediaRouter;
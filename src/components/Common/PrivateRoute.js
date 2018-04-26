import React, { Fragment } from 'react'
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, exact, path, ...props }) => {

    const RenderedComponent = (routerProps) => {
        const combinedProps = { ...props, ...routerProps };
        let redirect = props.loggedIn ? false : "/login";
        let jsx;
        if (redirect) {
            jsx = (<Redirect to={{pathname: redirect}} />);
        } else {
            jsx = (<Component {...combinedProps}  />);
        }
        return jsx;
    };

    return (
        <Fragment>
            <Route exact={exact} path={path} render={RenderedComponent} />     
        </Fragment>
    )


};
export default PrivateRoute;
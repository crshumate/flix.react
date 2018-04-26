import React,{Fragment} from 'react';
import { Route } from 'react-router-dom';
const PublicRoute = ({ component: Component, exact, path, ...props }) => {

    const RenderedComponent = (routerProps) => {
        const combinedProps = {...props, ...routerProps };
            return (
                <Component {...combinedProps}  />
            );
        };
        
    return (
         <Fragment>
            <Route exact={exact} path={path} render={RenderedComponent} />
        </Fragment>
    
    );
};
export default PublicRoute;
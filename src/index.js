import React,{Fragment} from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import store from 'Store';
import RootRouter from 'Components/RootRouter';

render(  
    <Provider store={store}>
        <Fragment>
            <RootRouter />
        </Fragment>
    </Provider>, 
    
        
    document.getElementById('app')
);

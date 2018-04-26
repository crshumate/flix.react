import React,{Fragment} from 'react';
import AppBar from 'material-ui/AppBar';
import injectSheet from 'react-jss';
import headerStyles from './header.style';
const Header = (props) =>{
    let {classes} = props;
    return(
        <Fragment>
            <AppBar className={classes.header}  position="static" color="default">
                <p>ShuFlix</p>
            </AppBar>
        </Fragment>
        )
};
export default injectSheet(headerStyles)(Header);
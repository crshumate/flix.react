import React,{Fragment} from 'react';
import injectSheet from 'react-jss';
import footerStyles from './footer.style';
const Footer = (props) =>{
    let date = new Date();
    let year = date.getFullYear();
    let {classes} = props;
    return(
        <Fragment>
            <p className={classes.copyright}>Copyright {year}</p>
        </Fragment>
        );
};

export default injectSheet(footerStyles)(Footer);
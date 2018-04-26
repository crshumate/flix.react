import React,{Fragment} from 'react';
import Icon from 'material-ui/Icon';
import injectSheet from 'react-jss';
import leftSidebarStyles from './leftSidebar.style';
const NavIcon=(props)=>{
    let {classes} = props;
    return(
        <Fragment>
            <Icon classes={{root:classes.iconStyle}}>{props.icon}</Icon>
        </Fragment>
        );

};
export default injectSheet(leftSidebarStyles)(NavIcon);
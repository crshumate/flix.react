import React from 'react';
import injectSheet from 'react-jss';
import ToggleDisplay from 'Common/ToggleDisplay';
//import theme from 'Theme';
let styleProps = {
    backdropOpacity:0.5
};
let styles = {
    loading: {
        position: 'fixed',
        left: '50%',
        top: '200px',
        padding: '50px',
        marginLeft: '-25px',
        zIndex: 1000,
    },
    background: {
        zIndex: 25,
        backgroundColor: 'rgba(255, 255, 255, .9)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: '5px',
    },
    img: {
        position: 'absolute',
        zIndex: 30,
        height: '100px',
        width: '100px',
        top: 0,
        left: 0
    },
    backdrop: {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 1)',
        zIndex: 20
    }

};

const Loader = (props) => {

    let { classes } = props;

    let noBackdrop = false;
    
    if (props.noBackdrop) {
        noBackdrop = true;
    }
    if(props.inModal){
        styleProps.backdropOpacity = 0.2;
    }
    return (
        
        <ToggleDisplay if={props.isLoading}>
            <div className={classes.loading}>
            <img className={classes.img} alt='loading' src="img/orangeLoading.gif" />
                <div className={classes.background}></div>
                <ToggleDisplay if={!noBackdrop}>
                    <div style={{opacity:styleProps.backdropOpacity}} className={classes.backdrop}></div>
                </ToggleDisplay>
            </div>
        </ToggleDisplay>
    );


};
export default injectSheet(styles)(Loader);
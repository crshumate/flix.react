import React, { Fragment } from 'react';
import MediaRouter from 'MediaContainer/MediaRouter';
import LeftSidebar from 'Components/LeftSidebar/LeftSidebar';
import Grid from 'material-ui/Grid';
import Header from 'Components/Header/Header';
import Footer from 'Components/Footer/Footer';
import injectSheet from 'react-jss';
import mediaStyles from './media.style';
import Hidden from 'material-ui/Hidden';

const Media = (props) => {

    let {classes} = props;
    return (
        <Fragment>
            <Header {...props}>
                <p>ShuFlix</p>
            </Header>
            <Grid className={classes.mediaComponentWrapper} container spacing={8}>
                <Hidden smDown>
                    <Grid item md={1}>
                        <LeftSidebar {...props} />
                    </Grid>
                </Hidden>
                <Grid item xs={12} md={10}>
                    <MediaRouter {...props} />
                </Grid>
                <Hidden smDown>
                    <Grid item md={1}></Grid>
                </Hidden>
            </Grid>
            <Footer {...props} />
        </Fragment>
    );
};
export default injectSheet(mediaStyles)(Media);
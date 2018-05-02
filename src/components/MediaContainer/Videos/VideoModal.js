import React, { Fragment } from 'react';
import Modal from 'material-ui/Modal';
import injectSheet from 'react-jss';
import videoStyles from './video.style';
import Icon from 'material-ui/Icon';

const VideoModal = (props) => {

    let { classes } = props;
    return (
        <Fragment>
            <Modal
                open={props.showVideoModal}
                onClose={()=>props.closeVideoModal()}
                disableAutoFocus={true}
                keepMounted={true}
            >
                <div className={classes.modalContentWrapper}>
                        <div onClick={()=>props.closeVideoModal()} className={classes.closeIconWrapper}>
                            <Icon>clear</Icon>
                        </div>
                        <iframe 
                            className={classes.iframedVideo}
                            title="shuflix"
                            id="ytplayer" 
                            type="text/html" 
                            width="90%" 
                            height="85%"
                            allowFullScreen
                            src={`https://www.youtube.com/embed/${props.videoId}?autoplay=1&rel=0&origin=${window.location.origin}&modestbranding=1`}
                            frameBorder="0">
                        </iframe>
                </div>

                   
            </Modal>
            

        </Fragment>
    );

};

export default injectSheet(videoStyles)(VideoModal);
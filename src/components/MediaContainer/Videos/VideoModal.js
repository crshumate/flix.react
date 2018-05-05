import React, { Fragment } from 'react';
import Modal from 'material-ui/Modal';
import injectSheet from 'react-jss';
import videoStyles from './video.style';
import Icon from 'material-ui/Icon';
import YouTube from 'react-youtube';

const VideoModal = (props) => {

    let { classes } = props;
    const opts = {
      height: "85%",
      width: "90%",
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        modestbranding:1,
        origin:window.location.origin
      }
    };
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
                        <YouTube
                             videoId={props.videoId}
                             id="ytplayer"
                             opts={opts}    
                         />
                            
                </div>

                   
            </Modal>
            

        </Fragment>
    );

};

export default injectSheet(videoStyles)(VideoModal);
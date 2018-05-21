import React, { Fragment, Component } from 'react';
import Modal from 'material-ui/Modal';
import injectSheet from 'react-jss';
import videoStyles from './video.style';
import Icon from 'material-ui/Icon';
import YouTube from 'react-youtube';
import videoSvc from 'Services/video';

class VideoModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video: props.video
        };
    };

    render() {
        let { props, state } = this;
        let { classes } = props;
        const videoId = state.video.current.contentDetails.videoId;
        const opts = {
            height: "85%",
            width: "90%",
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
                modestbranding: 1,
                origin: window.location.origin
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
                      className={classes.youtubeWrapper}
                         videoId={videoId}
                         id="ytplayer"
                         opts={opts}  
                         onEnd={()=>{
                              this.setState(()=>{
                                return{
                                  video:videoSvc.getVideoObj(props.videos,state.video.next)
                                };
                                
                              });
                            
                          }
                        }

                     />
                </div>
            </Modal>
        </Fragment>
        );

    }

};

export default injectSheet(videoStyles)(VideoModal);
import React, { Component, Fragment } from 'react';
import VideoModal from './VideoModal';
import VideoCard from './VideoCard';
import Grid from 'material-ui/Grid';
import ToggleDisplay from 'Common/ToggleDisplay';
import Repeat from 'Common/Repeat';
import videoSvc from 'Services/video';
class VideoPlaylistContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video:null,
            showVideoModal: false
        }
        this.openVideoModal = this.openVideoModal.bind(this);

    };
    createVideoObj(video){
        const { videos } = this.props;
        return videoSvc.getVideoObj(videos, video);
    };
    
    

    openVideoModal = (video) => {
        this.setState(() => {
            return {
                showVideoModal: true,
                video:video,
            }

        });
    };
    closeVideoModal = () => {
        this.setState(() => {
            return {
                showVideoModal: false,
                video:null,
            }
        });
    };
    render() {
        let { state, props } = this;
        return (
            <Fragment>
                <Grid container spacing={8}>
                    <Repeat 
                    dataToMap={props.videos}
                    preprocess={(video)=>this.createVideoObj(video)}
                    >
                        {(video,key)=>{
                            return(
                            <VideoCard 
                                {...props} 
                                openVideoModal={this.openVideoModal} 
                                key={key} 
                                video={video} 
                            />
                        )}}
                    </Repeat>
                </Grid> 
                <ToggleDisplay if={state.showVideoModal}> 
                        <VideoModal 
                            {...props} 
                            showVideoModal={state.showVideoModal} 
                            closeVideoModal={this.closeVideoModal} 
                            video={state.video}
                            />
                </ToggleDisplay>
            </Fragment>
        );
    }

};

export default VideoPlaylistContent;
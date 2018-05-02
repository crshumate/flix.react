import React,{Component,Fragment} from 'react';
import VideoModal from './VideoModal';
import VideoCard from './VideoCard';
import Grid from 'material-ui/Grid';
import ToggleDisplay from 'Common/ToggleDisplay';
import Repeat from 'Common/Repeat';
class VideoPlaylistContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            videoId: null,
            showVideoModal: false
        }
        this.openVideoModal = this.openVideoModal.bind(this);

    };

    openVideoModal = (id) => {
        this.setState(() => {
            return {
                showVideoModal: true,
                videoId: id
            }

        });
    };
    closeVideoModal = () => {
        this.setState(() => {
            return {
                showVideoModal: false,
                videoId: null
            }
        });
    };
    render(){
        let { state, props } = this;
        return(
            <Fragment>
                <Grid container spacing={8}>
                    <Repeat 
                    dataToMap={props.videos}
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
                            showVideoModal={this.state.showVideoModal} 
                            closeVideoModal={this.closeVideoModal} 
                            videoId={state.videoId}
                            />
                </ToggleDisplay>
            </Fragment>
        );
    }
    
};

export default VideoPlaylistContent;
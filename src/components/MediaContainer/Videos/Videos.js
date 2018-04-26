import React, { Component, Fragment } from 'react';
import Grid from 'material-ui/Grid';
import injectSheet from 'react-jss';
import videoStyles from './video.style';
import VideoPlaylistCard from './VideoPlaylistCard';
import Repeat from 'Common/Repeat';
import ToggleDisplay from 'Common/ToggleDisplay';
import VideoPlaylistContent from './VideoPlaylistContent';
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui-icons/Backspace';

class Videos extends Component {
    constructor(props) {
        super(props);
        this.props.getShowVideos();
        this.state = {
            showPlaylists: props.showPlaylists,
            activePlaylistVideos:null,
            activePlaylistTitle:null
        };
    };


    setActivePlaylist = (data) => { 
        this.setState(()=>{
            return{
                activePlaylistVideos:data.videos,
                activePlaylistTitle:data.title

            }
        });
    };
    clearActivePlaylist = () => {
        this.setState(()=>{
            return{
                activePlaylistVideos:null,
                activePlaylistTitle:null

            }
        });
    };

    static getDerivedStateFromProps(newProps) {
        return {
            showPlaylists: newProps.showPlaylists
        }
    };

    render() {
        let { props, state } = this;
        let {classes} = props;

        return (
            <Fragment>
                
                <Grid container spacing={8} className={classes.gridWrapper}>
                    <ToggleDisplay if={this.state.activePlaylistTitle && props.activePlaylistTitle === props.title}>
                            <IconButton classes={{root:classes.clearIconWrapper}}>
                                <ClearIcon onClick={()=>this.clearActivePlaylist()} className={classes.clearIcon} />
                            </IconButton>
                    </ToggleDisplay>

                    <Repeat 
                        dataToMap={state.showPlaylists}
                        if={state.showPlaylists && state.showPlaylists.length} 
                        > 
                        {(playlist,key)=>(
                            <VideoPlaylistCard 
                                {...props}
                                title={playlist.title}
                                key={key}
                                videos={playlist.items}
                                img={playlist.img}
                                setActivePlaylist={this.setActivePlaylist}
                                activePlaylistTitle={this.state.activePlaylistTitle}
                                showPlaylists = {this.state.showPlaylists}

                            />

                        )}
                   </Repeat>
                </Grid>
                    
                <ToggleDisplay if={this.state.activePlaylistTitle}>
                    <VideoPlaylistContent 
                        {...props}
                        videos={this.state.activePlaylistVideos}
                        openVideoModal={this.openVideoModal}
                        closeVideoModal={this.closeVideoModal}
                        showVideoModal={this.state.showVideoModal}
                        videoId={this.state.videoYTId}

                        /> 
                </ToggleDisplay>

            </Fragment>
        );
    }
};

export default injectSheet(videoStyles)(Videos);
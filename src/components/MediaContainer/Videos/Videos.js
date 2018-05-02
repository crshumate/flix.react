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
import ReloadIcon from 'material-ui-icons/Refresh';

class Videos extends Component {
    constructor(props) {
        super(props);
        this.props.getPlaylists();
        this.state = {
            playlists: props.playlists,
            activePlaylistTitle: null,
            activePlaylistId: null,
            playlistsContent: null,
            loadedVideos: null

        };
    };

    setActivePlaylist = (data) => {
        this.props.getPlaylistItems(data);
        this.setState(() => {
            return {
                activePlaylistId: data.id,
                activePlaylistTitle: data.title
            }
        });
    };
    clearActivePlaylist = () => {
        this.setState(() => {
            return {
                loadedVideos: null,
                activePlaylistTitle: null,
                activePlaylistId: null

            }
        });
    };

    reload() {
        this.setState(() => {
            return {
                playlists:null,
                loadedVideos: null,
                activePlaylistTitle: null,
                activePlaylistId: null,
                playlistsContent: null,

            }
        });
        this.props.clearPlaylists();
        this.props.clearPlaylistsContent();
        this.props.getPlaylists();

    };

    setLoadedVideos() {

        const playlistContent = this.state.playlistsContent.filter((content) => {
            return content.id === this.state.activePlaylistId;
        });
        if (playlistContent.length) {
            this.setState(() => {
                return {
                    loadedVideos: playlistContent[0].videos
                }
            });
        }


    };

    static getDerivedStateFromProps(newProps) {
        return {
            playlists: newProps.playlists,
            playlistsContent: newProps.videos
        }
    };
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setLoadedVideos();
        }


    };

    render() {
        let { props, state } = this;
        let { classes } = props;
        return (
            <Fragment>
                <Grid container className={classes.videoControls}>
                    <Grid item>
                        <ToggleDisplay if={this.state.activePlaylistTitle && props.activePlaylistTitle === props.title}>
                                <IconButton classes={{root:classes.clearIconWrapper}}>
                                    <ClearIcon onClick={()=>this.clearActivePlaylist()} className={classes.clearIcon} />
                                </IconButton>
                        </ToggleDisplay>
                    </Grid>
                    <Grid item>
                            <IconButton classes={{root:classes.clearIconWrapper}}>
                                <ReloadIcon onClick={()=>this.reload()} className={classes.clearIcon} />
                            </IconButton>
                    </Grid>
                </Grid> 
                <Grid container spacing={8} className={classes.gridWrapper}>
                    <Repeat 
                        dataToMap={state.playlists}
                        if={state.playlists && state.playlists.length} 
                        > 
                        {(playlist,key)=>(
                            <VideoPlaylistCard 
                                {...props}
                                title={playlist.snippet.title}
                                id={playlist.id}
                                key={key}
                                img={playlist.snippet.thumbnails.high}
                                setActivePlaylist={this.setActivePlaylist}
                                activePlaylistTitle={this.state.activePlaylistTitle}

                            />

                        )}
                   </Repeat>
                </Grid>
                <ToggleDisplay if={this.state.loadedVideos && this.state.loadedVideos.length}>
                   <VideoPlaylistContent 
                        {...props}
                        videos={this.state.loadedVideos}
                        openVideoModal={this.openVideoModal}
                        closeVideoModal={this.closeVideoModal}
                        showVideoModal={this.state.showVideoModal}
                        /> 
                </ToggleDisplay>

            </Fragment>
        );
    }
};

export default injectSheet(videoStyles)(Videos);
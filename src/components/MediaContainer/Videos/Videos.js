import React, { Component, Fragment } from 'react';
import Grid from 'material-ui/Grid';
import {NavLink} from 'react-router-dom';
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
                <ToggleDisplay if={!this.state.activePlaylistTitle}>
                    <Grid container>
                        <Grid item xs={12} sm={6} md={4}>
                            <NavLink
                            to={{pathname:"/duck-tales"}}
                            >
                                <img alt="Duck Tales" style={{"max-width":"100%","max-height":"200px"}} src="https://ia.media-imdb.com/images/M/MV5BNTA2NTc5MzQwNV5BMl5BanBnXkFtZTgwOTY2ODI2MjI@._V1_SY1000_CR0,0,666,1000_AL_.jpg" />
                            </NavLink>
                        </Grid>
                    </Grid>
                </ToggleDisplay>
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
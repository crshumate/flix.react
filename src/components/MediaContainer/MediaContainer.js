import Media from 'MediaContainer/Media/Media';
import videoGetActions from 'Actions/videoActions/videoGetActions';
import videoSetActions from 'Actions/videoActions/videoSetActions';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
    let props = {
        playlists:state.videos.playlists,
        videos: state.videos.videos
    };
    return props;
};

const mapDispatchToProps = (dispatch, location) => {
    return {
        getPlaylists: () => {
            dispatch(videoGetActions.getPlaylists());
        },
        getPlaylistItems: (data) => {
            dispatch(videoGetActions.getPlaylistItems(data));
        },
        clearPlaylistsContent:() => {
             dispatch(videoSetActions.clearVideoPlaylistsContent());
        },
        clearPlaylists:() => {
             dispatch(videoSetActions.clearVideoPlaylists());
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Media);
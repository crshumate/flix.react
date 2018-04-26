import Media from 'MediaContainer/Media/Media';
import videoGetActions from 'Actions/videoActions/videoGetActions';
//import gameGetActions from 'Actions/gameActions/gameGetActions';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
    let props = {
        musicVideos:state.videos.musicVideos,
        danceVideos:state.videos.danceVideos,
        showPlaylists:state.videos.showPlaylists,
        educationalVideos:state.videos.educationalVideos
    };
    return props;
};

const mapDispatchToProps = (dispatch, location) => {
    return {
        /*getMusicVideos:()=>{
            dispatch(videoGetActions.getMusicVideos());
        },
        getDanceVideos:()=>{
            dispatch(videoGetActions.getDanceVideos());
        },*/
         getShowVideos:()=>{
            dispatch(videoGetActions.getShowPlaylists());
        }/*,
        getEducationalVideos:()=>{
            dispatch(videoGetActions.getEducationalVideos());
        }*/
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Media);
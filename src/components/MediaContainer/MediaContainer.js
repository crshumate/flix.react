import Media from 'MediaContainer/Media/Media';
import videoGetActions from 'Actions/videoActions/videoGetActions';
//import gameGetActions from 'Actions/gameActions/gameGetActions';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
    let props = {
        videos:state.videos.videos
    };
    return props;
};

const mapDispatchToProps = (dispatch, location) => {
    return {
         getVideos:()=>{
            dispatch(videoGetActions.getVideos());
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Media);
import videoActionTypes from 'ActionTypes/videoActionTypes';

const actions = {
    setVideos: (videos) => {
        return {
            type: videoActionTypes.SET_VIDEOS,
            videos
        }

    }

};

export default actions;
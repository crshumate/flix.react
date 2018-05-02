import videoActionTypes from 'ActionTypes/videoActionTypes';
import videoInitialState from 'InitialStates/videoInitialState';
const actions = {
    setVideoPlaylists: (playlists) => {
        return {
            type: videoActionTypes.SET_VIDEO_PLAYLISTS,
            playlists
        }

    },
    clearVideoPlaylists:() =>{
        return {
            type: videoActionTypes.SET_VIDEO_PLAYLISTS,
            playlists: videoInitialState.playlists
        }
    },
    setVideoPlaylistItems: (videos) => {
        return {
            type: videoActionTypes.SET_VIDEO_PLAYLIST_ITEMS,
            videos
        }
    },
    clearVideoPlaylistsContent:() =>{
        return {
            type: videoActionTypes.SET_VIDEO_PLAYLIST_ITEMS,
            videos: videoInitialState.videos
        }
    }

};

export default actions;
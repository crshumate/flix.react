import videoActionTypes from 'ActionTypes/videoActionTypes';

const actions = {
    setMusicVideos: (musicVideos) => {
        return {
            type: videoActionTypes.SET_MUSIC_VIDEOS,
            musicVideos
        }

    },
    setDanceVideos: (danceVideos) => {
        return {
            type: videoActionTypes.SET_DANCE_VIDEOS,
            danceVideos
        }

    },
    setShowPlaylists: (showPlaylists) => {
        return {
            type: videoActionTypes.SET_SHOW_PLAYLISTS,
            showPlaylists
        }

    },
    setEducationalVideos: (educationalVideos) => {
        return {
            type: videoActionTypes.SET_EDUCATIONAL_VIDEOS,
            educationalVideos
        }

    }


};

export default actions;
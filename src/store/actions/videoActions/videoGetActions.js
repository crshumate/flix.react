import videoSetActions from './videoSetActions';
import videos from 'Services/http/videos';
import appUpdateActions from 'Actions/appActions/appUpdateActions';
import sort from 'Services/sort';

const incrementPendingAjaxCalls = appUpdateActions.updateIncrementPendingAjaxCalls;
const decrementPendingAjaxCalls = appUpdateActions.updateDecrementPendingAjaxCalls;

const actions = {
    getPlaylists: () => {
        return (dispatch, getState) => {
            let state = getState();
            dispatch(incrementPendingAjaxCalls());
            if (!state.videos.playlists.length) {
                videos.getPlaylists().then((playlists) => {
                    let sortedPlaylists = sort.simpleSort(playlists, "snippet.title", "desc");
                    dispatch(videoSetActions.setVideoPlaylists(sortedPlaylists))
                }, (err) => {
                    console.log(err);
                }).then(() => {
                    dispatch(decrementPendingAjaxCalls());
                });
            }else{
                dispatch(decrementPendingAjaxCalls());
            }

        }
    },
    getPlaylistItems: (data) => {
        return (dispatch, getState) => {
            let state = getState();
            dispatch(incrementPendingAjaxCalls());
            let currentVideos = state.videos.videos.slice();
            let match = currentVideos.filter((video) => {
                return video.id === data.id;
            });
            if (!match.length) {
                videos.getPlaylistItems(data).then((res) => {
                    currentVideos.push(res);
                    dispatch(videoSetActions.setVideoPlaylistItems(currentVideos))
                }, (err) => {
                    console.log(err);
                }).then(() => {
                    dispatch(decrementPendingAjaxCalls());
                });
            } else {
                dispatch(decrementPendingAjaxCalls());
            }
        }
    }
};

export default actions;
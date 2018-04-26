import videoSetActions from './videoSetActions';
import videos from 'Services/http/videos';
import appUpdateActions from 'Actions/appActions/appUpdateActions';
import sort from 'Services/sort';

const incrementPendingAjaxCalls = appUpdateActions.updateIncrementPendingAjaxCalls;
const decrementPendingAjaxCalls = appUpdateActions.updateDecrementPendingAjaxCalls;

const actions = {
    getShowPlaylists:()=>{
        return (dispatch) => {
            dispatch(incrementPendingAjaxCalls());
          videos.getShows().then((showPlaylists)=>{
            showPlaylists = sort.simpleSort(showPlaylists,"title","asc");
            dispatch(videoSetActions.setShowPlaylists(showPlaylists))
          },(err)=>{
            console.log(err);
          }).then(()=>{
            dispatch(decrementPendingAjaxCalls());
          });
        } 
    }
};

export default actions;
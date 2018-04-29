import videoSetActions from './videoSetActions';
import videos from 'Services/http/videos';
import appUpdateActions from 'Actions/appActions/appUpdateActions';
import sort from 'Services/sort';

const incrementPendingAjaxCalls = appUpdateActions.updateIncrementPendingAjaxCalls;
const decrementPendingAjaxCalls = appUpdateActions.updateDecrementPendingAjaxCalls;

const actions = {
    getVideos:()=>{
        return (dispatch) => {
            dispatch(incrementPendingAjaxCalls());
          videos.get().then((videoData)=>{
            let sortedVideos = sort.simpleSort(videoData,"title","asc");
            dispatch(videoSetActions.setVideos(sortedVideos))
          },(err)=>{
            console.log(err);
          }).then(()=>{
            dispatch(decrementPendingAjaxCalls());
          });
        } 
    }
};

export default actions;
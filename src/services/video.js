const generateObject = (videos, idx) => {
    let obj = {
        current: videos[idx]
    };

    if (idx !== (videos.length - 1)) {
        obj.next = videos[idx + 1];
    } else {
        obj.next = videos[0];
    }

    if (idx !== 0) {
        obj.prev = videos[idx - 1];
    } else {
        obj.prev = videos[videos.length - 1];
    }

    return obj;
};
export default {
    getVideoObj: (videos, video) => {
        let videoObj;
        videos.forEach((v, idx) => {
            let vId = v.contentDetails.videoId;
            let videoId = video.contentDetails.videoId;
            if (vId === videoId) {
                videoObj = generateObject(videos, idx);
            }
        });
        return videoObj;

    },


};
import axios from 'axios';
import httpTools from 'Services/http/httpTools';

const YTChannelId = httpTools.getYTChannelId();
const YTApiKey = httpTools.getYTApiKey();
const YTBaseUrl = httpTools.getYTBaseUrl();

const videos = {
    _process: ({ method = "GET", baseUrl, path }) => {
        return axios({
            method: "GET",
            baseURL: baseUrl,
            url: path
        });
    },
    getPlaylistItems: (data) => {
        let promise = new Promise((resolve, reject) => {
            let path = `/playlistItems?playlistId=${data.id}&maxResults=50&part=snippet%2CcontentDetails&key=${YTApiKey}`
            let playlistItemsReq = videos._process({ method: "GET", baseUrl: YTBaseUrl, path: path });
            playlistItemsReq.then((res) => {
                resolve({videos:res.data.items,title:data.title, id:data.id});

            }, (err) => {});
        });
        return promise
    },

    getPlaylists: () => {
        let promise = new Promise((resolve, reject) => {

            let path = `/playlists?maxResults=50&channelId=${YTChannelId}&part=snippet%2CcontentDetails&key=${YTApiKey}`;

            let playlistReq = videos._process({ method: "GET", baseUrl: YTBaseUrl, path: path });

            playlistReq.then((playlistData) => {
                resolve(playlistData.data.items);

            });
        });
        return promise;

    },
    get: () => {
        let promise = new Promise((resolve, reject) => {
            videos.getPlaylists().then((playlists) => {
                videos.getShowsFromPlayList(playlists).then((shows) => {
                    resolve(shows);
                });
            });
        });
        return promise;
    }

};

export default videos;
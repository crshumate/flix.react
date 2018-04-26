const httpTools = {
    getYTApiKey:()=>{
        return `${process.env.REACT_APP_YTApiKey}`; 
    },
    getYTChannelId:()=>{
        return `${process.env.REACT_APP_YTChannelId}`;
    },
    getYTBaseUrl:()=>{
        return "https://content.googleapis.com/youtube/v3";
    }
};

export default httpTools;
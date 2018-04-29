const pkgJson = require("../../../package.json");

export default {
    persisted:true,
    whiteList:["version"],
    isLoading:false,
    pendingAjaxCalls:0,
    version:pkgJson.version
};
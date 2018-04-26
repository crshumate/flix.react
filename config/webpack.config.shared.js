const path = require("path");
module.exports = {

    customAliases:{
        "Services": path.resolve(__dirname, "../src/services"),
        "Utils": path.resolve(__dirname, "../src/services/utils"),
        "Components": path.resolve(__dirname, "../src/components"),
        "MediaContainer": path.resolve(__dirname, "../src/components/MediaContainer"),
        "Common": path.resolve(__dirname, "../src/components/Common"),
        "Actions": path.resolve(__dirname, "../src/store/actions/"),
        "ActionTypes": path.resolve(__dirname, "../src/store/actionTypes"),
        "Reducers": path.resolve(__dirname, "../src/store/reducers"),
        "InitialStates": path.resolve(__dirname, "../src/store/initialStates"),
        "Store":path.resolve(__dirname, "../src/store/config.js"),
        "Theme":path.resolve(__dirname, "../src/components/AppContainer/App/theme.style.js"),
        "PublicRoute": path.resolve(__dirname, "../src/components/Common/PublicRoute"),
        "PrivateRoute": path.resolve(__dirname, "../src/components/Common/PrivateRoute"),
        "Header": path.resolve(__dirname, "../src/components/Header/Header"),
        "Footer": path.resolve(__dirname, "../src/components/Footer/Footer")


    }

};
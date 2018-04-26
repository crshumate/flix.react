import { deepSort, keyExists } from 'Utils';

const sort = {
    history: null,
    visibleSearchResults: null,
    init: (key, sortHistory, searchResults) => {
        sort.history = { ...sortHistory };
        let direction = sort._getDirection(sort.history, key);
        let sortedResults = deepSort(searchResults, key, direction);
        let updatedSortHistory = sort.history;
        return { sortedResults, updatedSortHistory };
    },
    simpleSort:(arr,key,direction="desc")=>{
        let sortedResults = deepSort(arr, key, direction);
        return sortedResults;
    },
    _getDirection: (sortHistory, key) => {
        if (keyExists(sortHistory, key)) {
            sort._updateHistory(sortHistory, key);
        } else {
            //default to desc
            sort.history[key] = 'desc';
        }
        return sort.history[key];
    },
    _updateHistory: (sortHistory, key) => {
        let updatedSortHistory = { ...sortHistory };
        if (updatedSortHistory[key] === 'desc') {
            updatedSortHistory[key] = 'asc';
        } else {
            updatedSortHistory[key] = 'desc';
        }
        sort.history = { ...updatedSortHistory };
    }
   



};

export default sort;
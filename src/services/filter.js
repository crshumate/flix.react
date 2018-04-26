import * as utils from './utils';

const Filter = {
    //filter.byMultipleKeys means we will filter on multiple specific keys, regardless of depth
    byMultipleKeys: (filterParams, blob) => {
        let filteredResults = [];
        //if we have no filter params return blob
        if (!Object.keys(filterParams).length) { return blob; }

        for (var i in filterParams) {
            if (filterParams.hasOwnProperty(i)) {
                let filterTxt = filterParams[i].filterText;
                let deepAccessKey = i;
                let strictMatch = filterParams[i].strictMatch;
                if (filteredResults.length) {
                    filteredResults = Filter.byKey(filterTxt, filteredResults, deepAccessKey, strictMatch);
                } else {
                    filteredResults = Filter.byKey(filterTxt, blob, deepAccessKey, strictMatch);
                }
            }
        }
        return filteredResults;
    },
    //filter.byKey means we are filtering on a specific key, regardless of depth
    byKey: (filterTxt, blob, deepAccessKey, strictMatch) => {
        return Filter.init(filterTxt, blob, deepAccessKey, strictMatch);
    },
    /*  
        Identifies if parent object is array or object, and dispatches to appropriate internal filter method
    */
    init: (filterTxt, blob, deepAccessKey, strictMatch) => {
        if (!filterTxt & !blob) { console.error('Warning: You did not enter an array or filter text'); return; }
        filterTxt = utils.lowercase(filterTxt);
        if (utils.isArray(blob)) {
            return Filter._filterArray(filterTxt, blob, deepAccessKey, strictMatch);
        } else if (utils.isObject(blob)) {
            return Filter._filterObject(filterTxt, blob, deepAccessKey, strictMatch);
        }

    },
    createFilterArrayByKey: (arr, deepAccessKey) => {
        return Filter._createFilterArrByKey(arr, deepAccessKey);
    },
    /*
        Parent Object is an Array. Loop through each child item and compare against ${filterTxt}.
        If ${deepAccessKey} is true, use filterBy to filterBy specific key-value pair, 
        otherwise recursively filter entire object
    */
    _filterArray: (filterTxt, blob, deepAccessKey, strictMatch) => {
        var results = [];
        for (let i = 0; i < blob.length; i++) {
            let filterable = blob[i];
            let val;
            if (Boolean(deepAccessKey)) {
                val = Filter._filterBy(filterTxt, filterable, deepAccessKey,strictMatch);
            } else {
                val = Filter._filterItem(filterTxt, filterable,strictMatch);
            }

            if (val) {
                results.push(val);
            }

        }
        return results;
    },
    /*
        Parent object is Object Literal. Loop through each child item and dispatch to _filterItem.
        If ${deepAccessKey} is true, use _filterBy to filterBy specific key-value pair, 
        otherwise recursively filter entire object with _filterItem
    */
    _filterObject: (filterTxt, blob, deepAccessKey, strictMatch) => {
        var results = [];
        for (let i in blob) {
            if (blob.hasOwnProperty(i)) {
                let filterable = blob[i];
                let val;
                if (Boolean(deepAccessKey)) {
                    Filter._filterBy(filterTxt, filterable, deepAccessKey);
                } else {
                    Filter._filterItem(filterTxt, filterable);
                }

                if (val) {
                    results.push(val);
                }
            }
        }
        return results;
    },
    //takes each child item and if it has a value compares it against the filter term
    _filterItem: (filterTxt, parentItem, childProp, strictMatch) => {
        let filterable;

        if (parentItem && !childProp) {
            filterable = parentItem;
        } else if (parentItem && childProp) {
            filterable = childProp;
        }
        if (utils.isArray(filterable)) {
            //fastest possible filter, use for
            for (let i = 0; i < filterable.length; i++) {
                childProp = filterable[i];
                let match = Filter._handleChildProp(filterTxt, parentItem, childProp, strictMatch);
                if (match) {
                    return match;
                }

            }
        } else if (utils.isObject(filterable)) {
            for (let i in filterable) {
                if (filterable.hasOwnProperty(i)) {
                    childProp = filterable[i];
                    let result = Filter._handleChildProp(filterTxt, parentItem, childProp, strictMatch);
                    if (result) {
                        return result;
                    }
                }
            }
        } else {
            let childProp = filterable;
            let result = Filter._handleChildProp(filterTxt, parentItem, childProp, strictMatch);
            if (result) {
                return result;
            }
        }


    },
    //returns a match if a match is found
    _handleChildProp: (filterTxt, parentItem, childProp, strictMatch) => {
        if (typeof childProp === 'string') {
            let childPropLower = utils.lowercase(childProp);
            if (strictMatch) {
                if (childPropLower === filterTxt) {
                    return parentItem;
                }
            } else {
                if (childPropLower.indexOf(filterTxt) !== -1) {
                    return parentItem;
                }
            }


        } else if (typeof childProp === 'number') {
            let strChildProp = childProp + '';
            if (strictMatch) {
                if (strChildProp === filterTxt) {
                    return parentItem;
                }
            } else {
                if (strChildProp.indexOf(filterTxt) !== -1) {
                    return parentItem;
                }
            }

            //make sure it's defined or exceed callstack
        } else if (childProp) {
            return Filter._filterItem(filterTxt, parentItem, childProp);
        }
    },
    _filterBy: (filterTxt, filterable, deepAccessKey, strictMatch) => {
        let val = utils.deepAccess(filterable, deepAccessKey);
        let strVal;
        //objects are stringified 
        if (utils.isObject(val)) {
            //this includes key names...fix!
            strVal = JSON.stringify(val);
        } else if (utils.isArray(val)) {
            strVal = val.join(" ");
        } else {
            //everything else contstrain to stringdom
            strVal = val + '';
        }

        let strValLowercase = utils.lowercase(strVal);
        if(strictMatch){
            return strValLowercase===filterTxt ? filterable : null;
        }else{
            return strValLowercase.indexOf(filterTxt) !== -1 ? filterable : null;    
        }

        
    },
    _createFilterArrByKey: (arr, deepAccessKey) => {
        return Array.from(
            new Set(
                arr.map((item) => {
                    let val = utils.deepAccess(item, deepAccessKey);
                    return val;
                })
            )
        );
    }


}

export default Filter;
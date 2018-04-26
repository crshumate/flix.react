import React, { Fragment } from 'react';

const MapIt = (props) =>{
        return (
            <Fragment>
                {
                    props.dataToMap.map((item)=>{
                        if(props.preprocess){
                            item = props.preprocess(item);
                        }
                        return  props.render ? props.render(item, Math.random()) : props.children(item, Math.random());
                    })
                }
            </Fragment>
        );
};



const Repeat = (props) => {
    //default toMap to true
    let toMap=true;
    let noMap = null;
    //evaluate {$props.if} and if a valid prop, assign ${toMap} to Boolean(${props.if})
    if(Object.keys(props).indexOf('if')!==-1){
        toMap = Boolean(props.if);
    }

    //if false, add alternate component to display
    if(!toMap){
       if(Object.keys(props).indexOf('else')!==-1){
            noMap = props.else;
        } 
    }

    //evalute ${toMap} and assign ${jsx} appropriately
    let jsx = toMap ? <MapIt {...props} /> : noMap;
    return (
        <Fragment>
           {jsx}
        </Fragment>
    );


};
export default Repeat;
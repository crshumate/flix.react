import React, { Fragment, Component } from 'react';

class IframedShows extends Component {
    constructor(props){
        super(props);
        props.incrementPendingAjaxCalls();
    }
    
    inputOnload(input){
        if (input) {
            input.onload = () => {
                this.props.decrementPendingAjaxCalls();
            };
        }
    };
    
    render() {

        return (
            <Fragment>
            <iframe 
            title="duck-tales" 
            src="https://disneynow.go.com/shows/ducktales-disney-channel" 
            height="100%"
            width="100%"
            frameBorder="0"
            ref={(input)=>this.inputOnload(input)}
            
            >
            </iframe>
        </Fragment>
        );
    }
};
export default IframedShows
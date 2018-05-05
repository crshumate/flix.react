import React, { Fragment, Component } from 'react';
import {NavLink} from 'react-router-dom';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import BackIcon from 'material-ui-icons/Backspace';
import Header from 'Components/Header/Header';


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
            <Header>
                <Grid container spacing={16}>
                    <Grid item>
                        <p>ShuFlix</p>
                    </Grid>
                    <Grid item>
                        <NavLink
                        to={{pathname:"/videos"}}
                        >
                        <IconButton>
                            <BackIcon />
                        </IconButton>
                        </NavLink>
                    </Grid>
                </Grid>
            </Header>
            <iframe 
            title="duck-tales" 
            src="https://disneynow.go.com/shows/ducktales-disney-channel" 
            height="100%"
            width="100%"
            frameBorder="0"
            ref={(input)=>this.inputOnload(input)}
            
            />
        </Fragment>
        );
    }
};
export default IframedShows
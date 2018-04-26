import React, { Component, Fragment } from 'react';
import { MenuList, MenuItem } from 'material-ui/Menu';
import { ListItemIcon } from 'material-ui/List';
import NavIcon from 'Components/LeftSidebar/NavIcon';
import { NavLink } from 'react-router-dom';
import Repeat from 'Common/Repeat';
import injectSheet from 'react-jss';
import leftSidebarStyles from './leftSidebar.style';
import config from './config';


class LeftSidebar extends Component {
    constructor(props) {
        super(props);
        this.loadedConfig = null;
        this.state = {
            params: props.match.params,
            loadedConfig: null
        };
        this.loadedConfig = config[this.state.params.module];
    };

    

    static getDerivedStateFromProps(newProps, prevState) {
        return {
            params: newProps.match.params
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props !== prevProps) {
            //this if-statement cuts down re-renders by half. 
            //Though it still re-renders often due to gDSFP
            if (prevState.params.module !== this.state.params.module) {
                this.setState(() => {
                    return {
                        loadedConfig: config[this.state.params.module]
                    }
                })
            }

        }

    };

    componentDidMount() {
        this.setState(() => {
            return {
                loadedConfig: this.loadedConfig
            }
        })
    };

    render() {
        let { props, state } = this;
        let { classes } = props;
        let leftSidebar = null;
        
        leftSidebar = (
            <nav className={classes.leftSideBarWrapper}>
                <MenuList>
                    <Repeat if={state.loadedConfig} dataToMap={state.loadedConfig}> 
                        {(item,key)=>(
                            <MenuItem key={key} className={(props.location.pathname===item.path ? classes.activeMenuItem:classes.menuItem)}>
                            <NavLink 
                                to={{pathname:item.path}}
                                activeClassName={'active'}
                                className={classes.navLink}
                            >
                                <ListItemIcon>
                                    <NavIcon icon={item.iconName} />
                                </ListItemIcon>
                            </NavLink>
                            </MenuItem>
                        )}
                    </Repeat>
                </MenuList>    
            </nav>
        );
        

        return (
            <Fragment>
               {leftSidebar}
            </Fragment>
        );
    }
};

export default injectSheet(leftSidebarStyles)(LeftSidebar);
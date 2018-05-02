import React, { Fragment } from 'react';
import Card, {CardContent, CardMedia } from 'material-ui/Card';
import { toCssClass } from 'Services/utils';
import Typography from 'material-ui/Typography';
import injectSheet from 'react-jss';
import videoStyles from './video.style';
import Grid from 'material-ui/Grid';
import ToggleDisplay from 'Common/ToggleDisplay';

const VideoPlaylist = (props) => {

        let { classes } = props;
        let videoPlaylistClass = toCssClass(props.title);
        let isActivePlaylist = props.activePlaylist === props.title;
        let activeClass = isActivePlaylist ? ' active ': null;
        return (
            <Fragment>
                <ToggleDisplay if={!props.activePlaylistTitle }>
                    <Grid item xs={12} sm={6} md={4}
                         className={`${classes.playlistCard}  ${videoPlaylistClass} ${activeClass}`} 
                         onClick={()=>props.setActivePlaylist({id:props.id, title:props.title})} 
                    >
                        <Card>
                            <CardMedia
                                className={classes.videoThumb}
                                image={props.img.url}
                                title={props.title}
                            />
                            <CardContent>
                              <Typography gutterBottom variant="caption">
                                {props.title}
                              </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </ToggleDisplay>
            </Fragment>
        );

};

export default injectSheet(videoStyles)(VideoPlaylist);
import React,{ Fragment } from 'react';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import injectSheet from 'react-jss';
import videoStyles from './video.style';
const VideoCard = (props) => {
    let {classes} = props;
    return (
        <Fragment>
            <Grid item xs={12} sm={6} md={4} >
                <Card 
                    className={classes.videoCard}  
                    onClick={()=>props.openVideoModal(props.video.contentDetails.videoId)} 
                    >
                    <CardMedia
                        className={classes.videoThumb}
                        image={props.video.snippet.thumbnails.medium.url}
                        title={props.video.snippet.title}
                    />
                    <CardContent className={classes.videoContent}>
                        <Typography gutterBottom variant="caption">
                            {props.video.snippet.title}
                        </Typography>
                    </CardContent>
                  </Card>
            </Grid>
        </Fragment>

    )
};

export default injectSheet(videoStyles)(VideoCard);
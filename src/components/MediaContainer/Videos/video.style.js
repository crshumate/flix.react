export default {
    gridWrapper: {
        flexGrow: 1
    },
    videoCard:{
        cursor:'pointer'
    },
    videoThumb: {
        height: 200
    },
    videoContent:{
        height:60,
        overflow:'hidden'
    },
    cardActionLinks: {
        textDecoration: 'none'
    },
    modalContentWrapper: {
        position: 'absolute',
        width: '75%',
        height: '75%',
        backgroundColor: "#ffffff",
        //boxShadow: theme.shadows[5],
        padding: '10px',
        top: '25px',
        left: '50%',
        transform: 'translate(-50%, 25px)',
        outline: 'none',
        '@media (max-width: 599px)': {
           width:'100%',
           height:'50%',
           transform: 'translate(-50%, 50%)',
                
           
        }

    },
    iframedVideo: {
        display: 'block',
        margin: ['5%', 'auto', 0]
    },
    closeIconWrapper: {
        float: 'right'
    },
    playArrowIcon: {
        fontSize: 50,
        color: '#808080'

    },
    playlistCard:{
        cursor:'pointer'
    },
    clearIcon:{
        fontSize:45
    },
    clearIconWrapper:{
        marginBottom:20,
        marginLeft:15
    }
};
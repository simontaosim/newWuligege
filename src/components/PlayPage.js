import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import { getMovieById, expectGetMovieById } from '../actions/movies.js';
import PlayerSelector from './PlayerSelector';
const styles = {
  videoLines: {
    wordBreak: "break-all",
    width: "90%",
    position: "relative",
    right: "10px"
  }
};

class PlayPage extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        playType: "ipfs"
      }
    }
    componentWillReceiveProps(nextProps){
      const {match, open} = nextProps;
      if(nextProps.match !== this.props.match ){
        if(open){
          return false;
        }
        this.props.dispatch(expectGetMovieById(match.params.id));
        this.props.dispatch(getMovieById(match.params.id));
      }
    }

    componentDidMount(){
      const { match, dispatch, open } = this.props;
      if(!open){
        dispatch(getMovieById(match.params.id));

      }
      
    }
    componentWillUnmount(){
      const { match, dispatch, open } = this.props; 
      this.props.dispatch(expectGetMovieById(match.params.id));
    }
    render(){
        const {classes, movie}  = this.props;
     
        if(!movie){
        

          return (
            <CircularProgress className={classes.progress} />
          )
        }
        if(movie.loading){
        

          return (
            <CircularProgress className={classes.progress} />
          )
        }
        let typePlayer = ()=>{
          if(this.state.playType === "ipfs"){
            return (
              <video src={movie.url} ref="streamPlayer"  style={
                {
                  width: "100%",
                  minWidth: "375px",
                  display: "inline-block",
                  left: -38,
                  position: "relative"
                  
                }
              }
                controls="controls" autoPlay={true} 
                name="media">

            </video>
            )
          }
          if(this.state.playType === "webtorrent"){
            return (
              <h3>使用种子播放器</h3>
            )
          }
        }
        return (
          <Grid container spacing={24} 
          direction="row"
          >
          {
            movie.url !== "false" && 
            <Grid item xs={12} sm={12}>
            <Typography className={classes.videoLines} variant="headline" gutterBottom>如果影片载入速度慢，请耐心等待</Typography>
            <Typography className={classes.videoLines} variant="headline" gutterBottom>或者您可以分享给您的朋友以加快速度，看的人越多！载入速度越快！</Typography>
            <Typography className={classes.videoLines} variant="headline" gutterBottom>影片分享链接:</Typography>
            <Typography className={classes.videoLines} variant="body1" gutterBottom>{window.location.href}</Typography>
          </Grid>
            
          }
          
          
          <Grid item xs={12}  sm={12} md={6}>
          {
            movie.url === "false" ? 
            <Typography className={classes.videoLines} 
            variant="headline" gutterBottom>
            本片暂时没有播放源，小编正在快马加鞭，敬请期待
            </Typography>
            :
            <div>
               <PlayerSelector movie={movie} />
            </div>
           

          }
             
            
          </Grid>
          <Grid item xs={6}  sm={6} md={6}>
          <Avatar className={classes.videoLines}
              alt={movie.title}
              src={movie.cover}
              style={{width: "100%", height: "100%"}}
            />
          </Grid>
          <Grid item xs={6}  sm={6} md={6} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "space-around",
          }}>
          
            <Typography variant="headline" gutterBottom>{movie.title}</Typography>
            <Typography variant="title" gutterBottom>主演：{movie.actorsZh[0]+"("+movie.actors[0]+")"}</Typography>
            <Typography variant="body2" gutterBottom>创建时间：{movie.createdAt}</Typography>
            
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="body1" gutterBottom>{movie.description}</Typography>
          </Grid>
          
          <Grid item xs={6} sm={8} md={12}>
            {
              movie.imgs.map((img,index)=>
                <img style={{
                  width: "50%"
                }} key={index} className={classes.videoLines} src={img} alt={movie.title} />
              )
            }
          </Grid>
          </Grid>
           
        )
    }

}

PlayPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapToState(state){
  return {
    movie: state.MovieReducer.movie,
    open: state.AppReducer.sideBarOpen
  }
}

export default connect(mapToState)(withStyles(styles)(PlayPage));

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MovieCard from './MovieCard';
import  { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getMoviesByTag } from '../actions/movies';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    flexGrow: 2,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});


class MovieCardList extends React.Component {
  constructor(props){
    super(props);
    
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.tag !== this.props.match.params.tag){
      if(!this.props.open){
        this.loadMoives( this.props.match.params.tag);
  
      }
      
    }
  }


  componentDidMount(){
    const { match, open} = this.props;
    if(!open){
      this.loadMoives( match.params.tag);

    }
    
  }
  
  loadMoives=(tag)=>{
    const { dispatch } = this.props;
     dispatch(getMoviesByTag(tag))

  }

  
  render(){
    const { classes, movies, match, loading } = this.props;
    
    let moviesComponent =null
    if(movies){
      moviesComponent  = movies.map(movie=>{
        return <Grid key={movie._id} item xs>
                <MovieCard movie={movie}  />
            </Grid>
      })
    }
  
    return (
      <div className={classes.root}>
       <Typography variant="headline" gutterBottom>{match.params.tag? match.params.tag : "热门"}</Typography>
       <Divider light />
        <Grid container spacing={24} 
        alignItems="center"
        direction="row"
        justify="center"
        >
          { 
            loading &&
            <CircularProgress className={classes.progress} />
          }
          
          {!loading && moviesComponent}

          { 
            movies && movies.length === 0 && !loading &&
            <Typography variant="headline" gutterBottom>暂无，敬请期待</Typography>
            
          }
          
        </Grid>
      </div>
    );
  }

  
}

MovieCardList.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapToState(state){
  
  return {
    movies: state.MoviesReducer.movies[state.MoviesReducer.tag],
    loading: state.MoviesReducer.loading,
    err: state.MoviesReducer.failedReason,
    open: state.AppReducer.sideBarOpen,
    onLoadTimes: state.MoviesReducer.onLoadTimes,
    tag: state.MoviesReducer.tag
  }
}

export default connect(mapToState)(withStyles(styles)(MovieCardList));

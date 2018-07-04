import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import {getMoviesByTag} from '../actions/movies.js'

import {connect} from 'react-redux';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
class HomePage extends React.Component {


  componentDidMount(){
    const { onLoadTimes} = this.props;

      if(!this.props.open){
         
          this.loadMoives("热门");
  
      }
  }
  loadMoives=(tag)=>{
    const { dispatch } = this.props;
    
    dispatch(getMoviesByTag(tag))
  }
  handlePushToMovie = (id)=> {
    this.props.history.push('/movies/'+id+'/play');
  }
  render(){
    const { classes, movies } = this.props;
    
    return (
        <div className={classes.root}>
          <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
              <ListSubheader component="div">"热门"</ListSubheader>
            </GridListTile>
            {movies.map(tile => (
              <GridListTile key={tile.cover}>
                <img src={tile.cover} alt={tile.title} />
                <GridListTileBar onClick={() => this.handlePushToMovie(tile._id)}
                  title={tile.title}
                  subtitle={<span>by: {tile.actors[0]}</span>}
                  actionIcon={
                    <IconButton className={classes.icon}>
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      );

  }

  
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapToState(state){
    return {
        movies: state.MoviesReducer.list,
        loading: state.MoviesReducer.loading,
        err: state.MoviesReducer.failedReason,
        open: state.AppReducer.sideBarOpen,
        onLoadTimes: state.MoviesReducer.onLoadTimes,
        tag: state.MoviesReducer.tag
      }
}

export default connect(mapToState)(withStyles(styles)(HomePage));

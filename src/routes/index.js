import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import SideNavList from '../components/SideNavList.js';
import LOGO from '../components/images/favicon.png'
import MovieCardList from '../components/MovieCardList.js';
import PlayPage from '../components/PlayPage.js'
import HomePage from './HomePage.js'
import  { connect } from 'react-redux';
import { APP_SWITCH_SIDEBAR } from '../actions/app.js';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import CreateMovie from '../components/CreateMovie.js'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: "100%",
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'fix',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  'appBarShift-right': {
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    flexDirection: "row",
    alignItems: "center",
    justifyItems: "center",
    alignContent: "center",
    justifyContent: "space-around",
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  'content-right': {
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  'contentShift-right': {
    marginRight: 0,
  },
});



class AppRoutes extends React.Component {

  handleDrawerToggle = () => {
    const { dispatch } = this.props;
    dispatch({
        type: APP_SWITCH_SIDEBAR
    });
  };



  render() {
    const { classes, theme, open, anchor } = this.props;

    const drawer = (
      <Drawer
        variant="persistent"
        anchor={anchor}
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
        <Router>
        <Link to="/">
            <img src={LOGO} onClick={this.handleDrawerToggle} />
            </Link>
          </Router>
          <IconButton onClick={this.handleDrawerToggle}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <SideNavList/>
        <Divider />
        <SideNavList />
      </Drawer>
    );

    let before = null;
    let after = null;

    if (anchor === 'left') {
      before = drawer;
    } else {
      after = drawer;
    }

    const TagsComponents = ({match}) => {

      return (
        <Route path={`${match.url}/:tag`} component={MovieCardList} />

      )
    }
    
    const MoviePlayer = ({match}) => {
      return (
        <Route path={`${match.url}/:id/play`} component={PlayPage} />

      )
    }

    return (
      <div className={classes.root}>
        
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-${anchor}`]]: open,
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerToggle}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                巫力格格
              </Typography>
            </Toolbar>
          </AppBar>
          {before}
          <main
            className={classNames(classes.content, classes[`content-${anchor}`], {
              [classes.contentShift]: open,
              [classes[`contentShift-${anchor}`]]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            
            
            <Router>
              <div>
              <Route exact path="/" component={HomePage} />
              <Route path="/tags" component={TagsComponents} />

              <Route path="/movies" component={MoviePlayer} />
              <Route path="/create/movies/new" component={CreateMovie} />
              
              
              </div>
            </Router>
          </main>
          {after}
        </div>
      </div>
    );
  }
}

AppRoutes.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

function mapToState(state){
  return {
      open: state.AppReducer.sideBarOpen,
      anchor: state.AppReducer.anchor,
  }
}

export default connect(mapToState)(withStyles(styles, { withTheme: true })(AppRoutes));
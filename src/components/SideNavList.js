import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
import { HashRouter as Router, NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { APP_SWITCH_SIDEBAR } from '../actions/app';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  
});

class SideNavList extends React.Component {


  handleClick= () => {
      const { dispatch } = this.props;
      dispatch({
          type: APP_SWITCH_SIDEBAR
      });
  }


  render() {
    const {classes, locked} = this.props;
    const testIcon = {
        icon: <InboxIcon />,
    }
    return (
      <List className={classes.root}>
        <Router>
            <div>
            <NavLink  exact to="/tags/冷门" style={{textDecoration: 'none'}}>

            <ListItem button   onClick={this.handleClick}>
            
                <ListItemIcon>
                    {testIcon.icon}
                </ListItemIcon>
            
                <ListItemText primary="冷门" />
            
            </ListItem>
            </NavLink>
            <NavLink  exact to="/tags/番号" style={{textDecoration: 'none'}}>

                <ListItem button   onClick={this.handleClick}>
                <ListItemIcon>
                    <StarIcon />
                </ListItemIcon>
                <ListItemText primary="番号" />
                </ListItem>
            </NavLink>
            <NavLink  exact to="/tags/站长推荐" style={{textDecoration: 'none'}}>

                <ListItem button   onClick={this.handleClick}>
                    <ListItemIcon>
                        <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary="站长推荐" />
                </ListItem>
            </NavLink>
            <NavLink  exact to="/tags/美剧" style={{textDecoration: 'none'}}>

                <ListItem button   onClick={this.handleClick}>
                    <ListItemIcon>
                        <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="美剧" />
                </ListItem>
            </NavLink>
            <NavLink  exact to="/tags/英剧" style={{textDecoration: 'none'}}>

                <ListItem button   onClick={this.handleClick}>
                    <ListItemIcon>
                        <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary="英剧" />
                </ListItem>
            </NavLink>
            <NavLink  exact to="/tags/动漫" style={{textDecoration: 'none'}}>

                <ListItem button   onClick={this.handleClick}>
                <ListItemIcon>
                    <DeleteIcon />
                </ListItemIcon>
                <ListItemText primary="动漫" />
                </ListItem>
            </NavLink>

            </div>
        </Router>
           
            </List>
    );
  }
}

SideNavList.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

function mapToState(state){
    return {
        open: state.AppReducer.sideBarOpen,
        locked: state.MoviesReducer.loading,
    }
}

export default connect(mapToState)(withStyles(styles, { withTheme: true })(SideNavList));
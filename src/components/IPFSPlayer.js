import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

function IPFSPlayer(props) {
  const { classes, movie } = props;
  if(!movie.url && !movie.ipfsUrl){
    return <h3>
      本片暂时没有IPFS播放源，小编正在快马加鞭，敬请期待
    </h3>
  }
  return (
    <video src={movie.url? movie.url : movie.ipfsUrl} style={
        {
          width: "100%",
          minWidth: "375px",
          display: "inline-block",
          position: "relative"
          
        }
      }
        controls="controls" autoPlay={true} 
        name="media">

    </video>
  );
}

IPFSPlayer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IPFSPlayer);
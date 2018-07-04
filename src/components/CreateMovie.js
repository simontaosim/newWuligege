import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ImagesUploader from './ImagesUploader';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';


import {db} from '../services/initRemoteDb';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: "column"
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 150,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  
});

const ranges = [
  {
    value: 'ipfs',
    label: 'ipfs',
  },
  {
    value: 'webtorrent',
    label: 'webtorrent',
  },
  {
    value: 'normal',
    label: '普通',
  }
  
];

class CreateMovie extends React.Component {
  state = {
        title: '',
        urlType: '',
        url: '',
        ipfsUrl: '',
        webtorrentUrl: '',
        isStream: false,
        cover: '',
        actorsZh: [],
        actorsEn: [],
        actors: [],
        description: '',
        createdAt: '',
        imgs: [],
        tags: [],
        onSave: false,
        actorToPut: "",
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  

  getRemoteImg = (img, single) => {
      console.log(single);
      
    if(single){
        this.setState({
            cover: img,
        })
    }else{
        let imgs = this.state.imgs;
        imgs.push(img);
        this.setState({
            imgs,
        })
    }

    
    
  }

  save = () => {
      let movie  = this.state;
      if(movie.title === ''){
          alert('标题不得为空')
          return false;
      }
      if(movie.urlType === ''){
          alert('请指定视频地址类型');
          return false;
      }
      if(movie.url === ''){
          alert('请提供视频播放地址');
          return false;
      }
      if(movie.cover === ""){
          alert('请完成封面上传');
          return false;
      }
      if(movie.imgs.length === 0){
          alert('相册至少有一张图片');
          return false;
      }
      if(movie.actors.length === 0){
          alert('请填写演员（原名）')
          return false;

      }
      if(movie.actorsZh.length === 0) {
          alert('请填写演员(中文)')
          return false;
      }
      if(movie.description === ''){
          alert("请填写影片介绍");
          return false;
      }
      if(movie.tags.length === 0){
          alert("请至少指定一个标签");
          return false;
      }
      let movieToPut = Object.assign({}, movie, {
          createdAt: new Date(),
          _id: (new Date()).getTime().toString()+Math.random().toString()
      })
      this.setState({
          onSave: true
      })

      db.put(movieToPut).then(rlt=>{
          if(rlt){
              this.setState({
                  onSave: false
              });
              alert("保存成功");
          }
      }).catch(err=>{
            this.setState({
                onSave: false
            });
            console.error("保存出错", err);
            
            alert("保存出错"+ err);
      })

      


  };

  addActor = () => {
      let actors = this.state.actors;
      let actorInput = this.state.actorToPut;
      
      actors.push(actorInput);
      this.setState({
          actors, actorToPut: ""
      });
  }
  addActorZh = () => {
    let actorsZh = this.state.actorsZh;
    let actorInput = this.state.actorZhToPut;
    
    actorsZh.push(actorInput);
    this.setState({
        actorsZh, actorZhToPut: ""
    });
}
addTag = () => {
    let tags = this.state.tags;
    let tagInput = this.state.tagToPut;
    
    tags.push(tagInput);
    this.setState({
        tags, tagToPut: ""
    });
}

  render() {
    const { classes } = this.props;
    console.log(this.state.actorToPut);
    
    return (
      <div className={classes.root}>
        <Typography variant="headline" gutterBottom>上传一部新视频</Typography>

        <FormControl>
            <InputLabel
            FormLabelClasses={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
            }}
            htmlFor="custom-css-input"
            >
            视频标题
            </InputLabel>
            <Input
            classes={{
                underline: classes.cssUnderline,
            }}
            id="custom-css-input"
            onChange={this.handleChange('title')}
            />
       </FormControl>
        
        <div>
        <Divider light/>
            <Typography variant="subheading" gutterBottom>上传封面</Typography>

            <ImagesUploader single={true} getRemoteImg={this.getRemoteImg} /> 
        </div>
        <TextField
          select
          label="地址类型"
          className={classNames(classes.margin, classes.textField)}
          value={this.state.urlType}
          onChange={this.handleChange('urlType')}
        >
          {ranges.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <FormControl>
            <InputLabel
            FormLabelClasses={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
            }}
            htmlFor="custom-css-input"
            >
            默认播放地址
            </InputLabel>
            <Input
            onChange={this.handleChange('url')}
            id="custom-css-input"
            />
       </FormControl>
       <FormControl>
            <InputLabel
            FormLabelClasses={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
            }}
            htmlFor="custom-css-input"
            >
            ipfs播放地址
            </InputLabel>
            <Input
            onChange={this.handleChange('ipfsUrl')}
            id="custom-css-input"
            />
       </FormControl>
       <FormControl>
            <InputLabel
            FormLabelClasses={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
            }}
            htmlFor="custom-css-input"
            >
            种子播放地址
            </InputLabel>
            <Input
            onChange={this.handleChange('webtorrentUrl')}
            id="custom-css-input"
            />
       </FormControl>
       <div>
        <FormControlLabel
            control={
              <Checkbox
                checked={this.state.antoine}
                onChange={this.handleChange('isStream')}
                value="antoine"
              />
            }
            label="是否是流媒体"
          />
          </div>
       <TextField
          id="multiline-static"
          label="简介"
          multiline
          rows="4"
          defaultValue=""
          value={this.state.description}
          className={classes.textField}
          onChange={this.handleChange('description')}
          margin="normal"
        />
        <div>
        <Divider light/>
            <Typography variant="subheading" gutterBottom>相册</Typography>

            <ImagesUploader getRemoteImg={this.getRemoteImg} /> 
        </div>
        <div>
            <div>
                {
                    this.state.actors.map((actor, index)=>
                    <span style={{
                        marginLeft: "10px"
                    }} key={index}>{actor}</span>)
                }
            </div>
            <TextField
            label="添加演员"
            rows="4"
            value={this.state.actorToPut}
            defaultValue=""
            className={classes.textField}
            onChange={this.handleChange('actorToPut')}
            margin="normal"
            />
            <Button onClick={this.addActor}  variant="raised">添加演员(原名)</Button>
        </div>
        <div>
        <div>
                {
                    this.state.actorsZh.map((actorZh, index)=>
                    <span style={{
                        marginLeft: "10px"
                    }} key={index}>{actorZh}</span>)
                }
            </div>
        <TextField
          id="multiline-static"
          label="添加演员"
          rows="4"
          defaultValue=""
          className={classes.textField}
          value={this.state.actorZhToPut}
          onChange={this.handleChange('actorZhToPut')}
          margin="normal"
        />
        <Button onClick={this.addActorZh}  variant="raised">添加演员(中文)</Button>
        </div>
        <div>
        <div>
                {
                    this.state.tags.map((tag, index)=>
                    <span style={{
                        marginLeft: "10px"
                    }} key={index}>{tag}</span>)
                }
            </div>
        <TextField
          id="multiline-static"
          label="添加标签"
          rows="4"
          defaultValue=""
          className={classes.textField}
          margin="normal"
          onChange={this.handleChange('tagToPut')}
          value={this.state.tagToPut}
          onChange={this.handleChange('tagToPut')}
        />
        
        <Button onClick={this.addTag} variant="raised">添加标签</Button>
        </div>
        
        <Button style={{
            position: "fixed",
            bottom: 20,
            right: 20,
        }} variant="fab" color="primary" aria-label="add" className={classes.button}
        onClick={this.save}
        >
            保存
        </Button>

      </div>
    );
  }
}

CreateMovie.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateMovie);

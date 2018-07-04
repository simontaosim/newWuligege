import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import IPFSPlayer from './IPFSPlayer';
import TorrentPlayer from './TorrentPlayer';
const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: "center",
    },
    appBar: {
        position: 'relative',
      },
      flex: {
        flex: 1,
      },
  });
  function Transition(props) {
    return <Slide direction="up" {...props} />;
  }

class PlayerSelector extends React.Component {
    constructor(props){
        super(props);
        this.state={
            open: false,
            playType: "ipfs",
        }
    }
    handleClickOpen = (playType) => {
        this.setState({ open: true, playType });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };

    componentDidMount(){
        const {movie} = this.props;
        this.setState({
            playType: movie.urlType
        })
    }
    render(){
        const {classes, movie} = this.props;
        return (
            <div className={classes.root}>
           
                <div>
                
                <Button variant="contained" onClick={()=>this.handleClickOpen("webtorrent")} color="secondary" className={classes.button}>
                    使用webTorrent种子播放(推荐)
                </Button>
                <Button variant="contained" onClick={()=>this.handleClickOpen("ipfs")} color="primary" className={classes.button}>
                    使用IPFS网络播放
                </Button>
                </div>
            <Dialog
                fullScreen
                open={this.state.open}
                onClose={this.handleClose}
                TransitionComponent={Transition}
                >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                    {
                        this.state.playType === 'ipfs' &&
                        <span> IPFS播放器--正在播放.....{movie.title}</span>

                    }
                     {
                        this.state.playType === 'webtorrent' &&
                        <span> webtorrent播放器--正在播放.....{movie.title}</span>

                    }
                       
                    </Typography>
                    <Button color="inherit" onClick={this.handleClose}>
                        关闭播放器
                    </Button>
                    </Toolbar>
                </AppBar>
                <List className={classes.root}>
                    {
                        this.state.playType === 'ipfs' &&
                        <IPFSPlayer movie={movie}/>

                    }
                    {
                        this.state.playType === 'webtorrent' &&
                        <TorrentPlayer movie={movie} />

                    }

                    {
                        this.state.playType === 'ipfs' &&
                        <div className={classes.root} style={{width: "90%"}}>
                            <Typography variant="title" gutterBottom>
                                IPFS播放器简介
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                               
                                    星际文件系统
                                    Ipfs-logo-1024-ice-text.png
                                    开发者	Protocol Labs
                                    稳定版本	
                                    0.4.13 （2017年11月16日，​7个月前 ）
                                    开发状态	活跃
                                    编程语言	协议实现：Go（参考实现）、JavaScript、C语言[1], Python
                                    客户端库：Go、Java、JavaScript、Python、Scala、Haskell、Swift、Common Lisp、Rust、Ruby、PHP、C#、Erlang
                                    操作系统	FreeBSD、Linux、macOS、Windows
                                    语言	Go、JavaScript、Python
                                    类型	协议、分布式文件系统、内容分发网络
                                    许可协议	MIT许可证
                                    网站	ipfs.io
                                    源代码库	github.com/ipfs/ipfs
                                    星际文件系统（InterPlanetary File System，缩写IPFS）是一个旨在创建持久且分布式存储和共享文件的网络传输协议。[2]它是一种内容可寻址的对等超媒体分发协议。在IPFS网络中的节点将构成一个分布式文件系统。它是一个开放源代码项目，自2014年开始由Protocol Labs在开源社区的帮助下发展。[3]其最初由Juan Benet设计。
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                               
                                    IPFS是一个对等的分布式文件系统，它尝试为所有计算设备连接同一个文件系统。在某些方面，IPFS类似于万维网，但它也可以被视作一个独立的BitTorrent群、在同一个Git仓库中交换对象。换种说法，IPFS提供了一个高吞吐量、按内容寻址的块存储模型，及与内容相关超链接。[11]这形成了一个广义的Merkle有向无环图（DAG）。IPFS结合了分布式散列表、鼓励块交换和一个自我认证的名字空间。IPFS没有单点故障，并且节点不需要相互信任。[12]分布式内容传递可以节约带宽，和防止HTTP方案可能遇到的DDoS攻击。

                                该文件系统可以通过多种方式访问，包括FUSE与HTTP。将本地文件添加到IPFS文件系统可使其面向全世界可用。文件表示基于其哈希，因此有利于缓存。文件的分发采用一个基于BitTorrent的协议。其他查看内容的用户也有助于将内容提供给网络上的其他人。IPFS有一个称为IPNS的名称服务，它是一个基于PKI的全局名字空间，用于构筑信任链，这与其他NS兼容，并可以映射DNS、.onion、.bit等到IPNS。
                            </Typography>
                        </div>
                    }
                    {
                        this.state.playType === 'webtorrent' &&
                        <div className={classes.root} style={{width: "90%"}}>
                            <Typography variant="title" gutterBottom>
                            WebTorrent：基于浏览器的流 BT 客户端
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                               
                            WebTorrent 是用于 Node.js 和浏览器的流 torrent 客户端，完全使用 JavaScript 编写。WebTorrent 是个轻量级，快速的开源 BT 客户端，拥有非常棒的用户体验。

 

在 node.js 中，模块只是简单的 torrent 客户端，使用 TCP 和 UDP 来和其他 torrent 客户端进行通讯。

在浏览器中，WebTorrent 使用 WebRTC  (数据通道)进行点对点的传输，无需任何浏览器插件，扩展或者安装。注意：在浏览器上，WebTorrent 不支持 UDP/TCP 点对点传输。

WebTorrent Desktop 连接 BitTorrent 和WebTorrent 端点。
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                               
                            特性
                                Node.js &浏览器的 BT 客户端 (相同的 npm 包)
                                速度非常快
                                可同时，高效的下载多个 torrents
                                纯 Javascript (无原生依赖)
                                像 streams 一样表示文件
                                支持高级 BT 客户端特性
                                magnet uri 支持，通过 ut_metadata
                                点发现，通过 dht, tracker 和 ut_pex
                                协议扩展 api，添加新扩展
                                完整的测试套件 (完全支持离线运行，非常可靠快速)
                                仅浏览器支持的特性：
                                WebRTC 数据通道
                                P2P 网络
                                流视频 torrent 为 video 标签 (webm (vp8, vp9) 或者 mp4 (h.264))
                                支持 Chrome, Firefox 和 Opera
                            </Typography>
                        </div>
                    }
                </List>
                </Dialog>
            </div>
        )
    }
  
}

PlayerSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlayerSelector);
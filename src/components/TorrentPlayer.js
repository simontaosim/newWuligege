import React from 'react'
import moment from 'moment';
import WebTorrent from 'webtorrent';
import './TorrentPlayer.css';
import LinearBuffer from './LinearBuffer'
class TorrentPlayer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            progress: 0,
            numPeers: '',
            downloaded: 0,
            total: 0,
            uploadSpeed: 0,
            downloadSpeed: 0,
            remaining: 0,
            percent: 0,
            file: null,
            totalTip: "加载中...",
            fileLoaded: false
        }
        this.webTorrent = new WebTorrent();

    }

    onProgress = (torrent) => {
        if(torrent){
            console.log("种子数量", torrent.numPeers);
            
            let numPeers = torrent.numPeers + (torrent.numPeers === 1 ? ' peer' : ' peers');
            this.setState({
                numPeers,
                totalTip: ''

            });
            let percent = Math.round(torrent.progress * 100 * 100) / 100;
            this.setState({
                percent
            })
            let total = this.prettyBytes(torrent.length)
            this.setState({
                    total
            });
            let downloadSpeed = this.prettyBytes(torrent.downloadSpeed) + '/s'
            this.setState({
                downloadSpeed
            });

            let uploadSpeed = this.prettyBytes(torrent.uploadSpeed)+ '/s';
            this.setState({
                uploadSpeed
            });

            let remaining
            if (torrent.done) {
                remaining = 'Done.'
            } else {
                remaining = moment.duration(torrent.timeRemaining / 1000, 'seconds').humanize()
                remaining = remaining[0].toUpperCase() + remaining.substring(1) + ' remaining.'
            }
            this.setState({
                remaining
            });



        }
       

    }
    prettyBytes = (num) => {
        var exponent, unit, neg = num < 0, units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        if (neg) num = -num
        if (num < 1) return (neg ? '-' : '') + num + ' B'
        exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1)
        num = Number((num / Math.pow(1000, exponent)).toFixed(2))
        unit = units[exponent]
        return (neg ? '-' : '') + num + ' ' + unit
    }

    getFileFromTorrent = async (torrent) => {
        let file = await torrent.files.find((file) =>{
            console.error("种子文件？", file);

            return file.name
          })
  
          // Stream the file in the browser
          let output = this.refs.output;
          console.error("种子文件？", file);
          
          if(file === undefined){
            const { movie } = this.props;
          console.error("种子文件没有");
            
            this.webTorrent.add(movie.webtorrentUrl, async torrent=> await this.watchDownloading(torrent));
          }else{
          console.error("种子文件有");
            this.setState({
                fileLoaded: true,
            })
            await file.appendTo(output,{
                autoplay: true
            });
          }
         
          
          
         
    }
    onDone=(torrent)=>{
        this.refs.videoRoot.className += ' is-seed';
        this.onProgress(torrent);
    }

    watchDownloading=async (torrent)=>{
        await this.getFileFromTorrent(torrent);
        setInterval(()=>this.onProgress(torrent), 500)
        this.onProgress(torrent);
        torrent.on('done', ()=>this.onDone(torrent))
        
    }
    componentDidMount(){
        const { movie } = this.props;
        this.setState({
            fileLoaded: false,
        })
        this.webTorrent.add(movie.webtorrentUrl, async torrent=> await this.watchDownloading(torrent));
    }
    render(){
        return (
            <div ref="videoRoot" style={{
                width: "100%",
                color: 'wheat'
            }}>
                <div id="hero">
                    <div id="output" ref="output">
                        {
                            !this.state.fileLoaded && 
                            <LinearBuffer text="种子播放器加载中" />
                        }
                        <div id="progressBar" style={{width: this.state.percent+"%"}} ref='progressBar'></div>
                    </div>
                    <div id="status">
                        <div>
                        <code id="numPeers">{this.state.numPeers}</code>.
                        </div>
                        <div>
                        &#x2198;<code id="downloadSpeed">{this.state.downloadSpeed} b/s</code>
                        / &#x2197;<code id="uploadSpeed">{this.state.uploadSpeed} b/s</code>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TorrentPlayer
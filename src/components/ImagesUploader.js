import React, { Component } from "react";
const unsignedUploadPreset = 'rq6jvg1m';


class ImagesUploader extends Component {
    constructor(props){
      super(props);
      this.state = {
        cover:'',
        status:false
      }
    }
    handleClickCover=(e)=>{
        if(this.refs.fileElems){
            this.refs.fileElems.click();
        }
        e.preventDefault();
        return false;
    }
// ************************ Drag and drop拖拽 ***************** //

    handleDrapenter=(e)=>{
        e.stopPropagation();
        e.preventDefault();
    }

    handleDrapover=(e)=>{
        e.stopPropagation();
        e.preventDefault();
    }
    handleDrop=(e)=>{
        e.stopPropagation();
        e.preventDefault();
        let dt = e.dataTransfer;
        let files = dt.files;
        this.handleFiles(files);
    }

    handleFiles = (files) => {
        if(this.props.single){
            this.uploadFile(files[0]); 
            return false;
        }
        for (var i = 0; i < files.length; i++) {
            this.uploadFile(files[i]); // call the function to upload the file
          }
    }

    uploadFile = (file) => {
        let url = "https://api.cloudinary.com/v1_1/ddycd5xyn/image/upload";
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        // Reset the upload progressCover bar
         document.getElementById('progressCover').style.width = 0;

        // Update progressCover (can be used to show progressCover indicator)
        xhr.upload.addEventListener("progressCover", function(e) {
          var progressCover = Math.round((e.loaded * 100.0) / e.total);
          document.getElementById('progressCover').style.width = progressCover + "%";

          console.log(`fileuploadprogressCover data.loaded: ${e.loaded},
        data.total: ${e.total}`);
        });

        xhr.onreadystatechange = (e) => {
          if (xhr.readyState == 4 && xhr.status == 200) {
            // File uploaded successfully
            var response = JSON.parse(xhr.responseText);
            let remoteurl = response.secure_url;
            var img = new Image(); // HTML5 Constructor
            img.src = remoteurl;
            this.props.getRemoteImg(remoteurl, this.props.single);
            img.alt = response.public_id;
            if(this.props.single){
                this.refs.gallerys.innerHTML = '';
            }
            this.refs.gallerys.appendChild(img);
          }
        };

        fd.append('upload_preset', unsignedUploadPreset);
        fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
        fd.append('file', file);
        xhr.send(fd);
    }

    handleFileChange=(e)=>{
        let files =  this.refs.fileElems.files;
        if(this.props.single){
            this.uploadFile(files[0]); 
            return false;
        }
        for (var i = 0; i < files.length; i++) {
            this.uploadFile(files[i]); // call the function to upload the file
          }
    }

    componentDidMount(){
        let fileElems = this.refs.fileElems;
        console.log(this.refs.gallerys);
        
    }

    render() {
        return (
            <div id="dropbox"
            onDragEnter={(e)=>this.handleDrapenter(e)}
            onDragOver={(e)=>this.handleDrapover(e)}
            onDrop={(e)=>this.handleDrop(e)}
            >
              <div style={{width:'50%'}}>
                    <span style={{textAlign:"center"}}><a href="#" id="fileSelect" onClick={(e)=>this.handleClickCover(e)}>{this.props.single? '点击选择图片' : '选择多张图片'}</a></span>
              </div>
                    <form className="my-form">
                        <div className="form_line">
                        <div className="form_controls">
                            <div className="upload_button_holder">
                            <input onChange={(e)=>this.handleFileChange(e)} ref="fileElems" type="file" id="fileElems" multiple={!this.props.single} accept="image/*" style={{display: "none"}} />

                            </div>
                        </div>
                        </div>
                    </form>
                    <div className="progressCover-bar" id="progressCover-bar">
                        <div className="progressCover" id="progressCover"></div>
                    </div>
                    <div ref="gallerys" >
                    
                    </div>
            </div>
        );
    }
}


export default ImagesUploader;
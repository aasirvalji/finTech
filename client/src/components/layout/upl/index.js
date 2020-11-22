import React, { Component } from 'react';
import axios from 'axios';
import './index.css'
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'

const bucketRoot = 'https://my-aws-bucket-90091.s3.amazonaws.com/'

class Upload extends Component {
  constructor(props){
    super(props);
    this.state = {
      success : false,
      url : "",
      fileName: "",
      selectedFileName: ""
    }
  }
  
  handleChange = (ev) => {
    this.setState({success: false, url : ""});
   if (document.getElementById('fileInput').files.item(0).name.length > 0) { 
     this.setState({ selectedFileName: document.getElementById('fileInput').files.item(0).name })
   }
  }
  // Perform the upload
  handleUpload = (ev) => {
    console.log(this.uploadInput)
    // Get file
    let file = this.uploadInput.files[0];
    // Split the filename to get the name and type
    let fileParts = this.uploadInput.files[0].name.split('.');

    let fileName = fileParts[0];
    let fileType = fileParts[1];

    console.log("Preparing the upload");

    // Send filename and filetype to get back a presigned URL that we can write to
    axios.post("http://localhost:5000/api/image",{
      fileName : this.state.selectedFileName.split('.')[0],
      fileType : fileType
    })
    .then(response => {
      var returnData = response.data.data.returnData;

      // Get signed request and URL from backend
      var signedRequest = returnData.signedRequest;
      var url = returnData.url;
      this.setState({url: url})
      console.log("Recieved a signed request " + signedRequest);
      console.log('Recieved a write URL @' + url);
      
     // Put the fileType in the headers for the upload
      var options = {
        headers: {
          'Content-Type': fileType
        }
      };

      // Send file to write URL
      console.log(signedRequest)
      axios.put(signedRequest,file,options)
      .then(result => {
        console.log("Response from s3")
        this.setState({success: true});

            axios.post("http://localhost:5000/api/profile/aws/image",{
                imgUrl: fileName
              })
              .then(response => {
               console.log(response.data.text)
               this.setState({ selectedFileName: ''});
              })      
          .catch(error => {
            console.log((error));
            this.setState({ selectedFileName: ''});
          })

      })
      .catch(error => {
        console.log((error));
        this.setState({ selectedFileName: ''});
      })
    })
    .catch(error => {
      console.log((error));
      this.setState({ selectedFileName: ''});
    })
  }

  getImageFromS3 = () => {
    // https://my-aws-bucket-90091.s3.amazonaws.com
    console.log(this.state)
    document.getElementById('display-img').src = `https://my-aws-bucket-90091.s3.amazonaws.com/${this.state.fileName}`
  }
  
  
  render() {
    return (
      <div className="App">
<div className='upload-display-container'>

        <center>
          <h1>Upload a file</h1>
          {this.state.success ? 
         
          <div style={{padding:50}}>
          <h3 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h3>
          <a href={this.state.url}>Access the file here</a>
          <br/>
        </div>
          
          : null}

          <label class="custom-file-upload">
            Select file
          <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file" id='fileInput'/>
          </label>

          { this.state.selectedFileName && <p>Image selected: {this.state.selectedFileName} </p>}

          <br/>
         {this.uploadInput !== undefined && <button id="upload-button" onClick={this.handleUpload}>UPLOAD</button>}
        </center>

          
        {/* <hr></hr>
            <h3> Enter photo name: </h3> <input type='text' onChange={(e) => this.setState({ fileName: e.target.value })}></input>
            <button id="upload-button" onClick={() => this.getImageFromS3()}>Get Image</button>
            <br></br>
            <img id='display-img' alt='display'></img>
        <hr></hr> */}

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Upload);
import React, { Component } from 'react';
import axios from 'axios';

const bucketRoot = 'https://my-aws-bucket-90091.s3.amazonaws.com/'

class HelperUpload extends Component {
  constructor(props){
    super(props);
    this.state = {
      success : false,
      url : "",
      fileName: "",
      picFile: undefined
    }
  }
  
  handleChange = (ev) => {
    this.setState({success: false, url : ""});
    
  }
  // Perform the upload
  handleUpload = (ev) => {
    console.log(this.uploadInput)
    // Get file
    let file = this.props.picFile;
    // Split the filename to get the name and type
    let fileParts = this.props.picFile.name.split('.');

    let fileName = fileParts[0];
    let fileType = fileParts[1];

    console.log("Preparing the upload");

    // Send filename and filetype to get back a presigned URL that we can write to
    axios.post("http://localhost:5000/api/image",{
      fileName : fileName,
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

            axios.post("http://localhost:5000/api/image/parse",{
                imgUrl: bucketRoot + fileName
              })
              .then(response => {
               console.log(response.data.text)
              })      
          .catch(error => {
            alert("ERROR " + JSON.stringify(error));
          })

      })
      .catch(error => {
        alert("ERROR " + JSON.stringify(error));
      })
    })
    .catch(error => {
      alert(JSON.stringify(error));
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
          { console.log( this.state.picFile )}
          { this.props.picFile && <p>file exists</p> }
        <hr></hr>
        <button onClick={this.handleUpload}>Submit file</button> 
        {this.state.success ? 
          
          <div style={{padding:50}}>
          <h3 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h3>
          <a href={this.state.url}>Access the file here</a>
          <br/>
        </div>
          
          : null}
        {/* <center>
          <h1>UPLOAD A FILE</h1>
          {this.state.success ? 
          
          <div style={{padding:50}}>
          <h3 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h3>
          <a href={this.state.url}>Access the file here</a>
          <br/>
        </div>
          
          : null}
          <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file"/>
          <br/>
          <button onClick={this.handleUpload}>UPLOAD</button>
        </center> */}
      </div>
    );
  }
}
export default HelperUpload;
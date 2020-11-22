import React, { Component } from 'react';
import axios from 'axios';
import './helper.css'
import Button from '@material-ui/core/Button';

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

  // componentDidUpdate(nextProps) {
  //   const { show } = this.props
  //   if (nextProps.show !== show) {
  //    if (show) {
  //     getMoreData().then(resp => this.setState({ data: resp.data }))
  //    }
  //   }
  //  }
  
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
            console.log(error);
          })
      })
      .catch(error => {
        console.log(error);
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

  getImageFromS3 = () => {
    // https://my-aws-bucket-90091.s3.amazonaws.com
    console.log(this.state)
    document.getElementById('display-img').src = `https://my-aws-bucket-90091.s3.amazonaws.com/${this.state.fileName}`
  }
  
  
  render() {
    return (
      <div className="helper-upload-container">
          { console.log( this.state.picFile )}
          { this.props.picFile && <p>file exists</p> }

    {this.props.picFile !== undefined &&  
    <Button onClick={this.handleUpload} id='helper-upload-button'>Submit file</Button>}

        {this.state.success &&
          <div style={{padding:50}}>
          <h3 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h3>
          <a href={this.state.url}>Access the file here</a>
          <br/>
        </div>
          }
                </div>
    );
  }
}
export default HelperUpload;
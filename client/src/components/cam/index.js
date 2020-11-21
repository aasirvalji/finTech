import React from "react";
import Webcam from "react-webcam";
import axios from "axios";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
   
  const Camera = () => {
    const webcamRef = React.useRef(null);
   
    const capture = React.useCallback(
      () => {
        const imageSrc = webcamRef.current.getScreenshot();
        var file = dataURLtoFile(imageSrc, 'a.png');
        console.log(file);

        var options = {
            headers: {
                'Content-Type': 'image/png'
            }
        }

        axios.post('http://localhost:5000/camera', file, options)
        .then(() => {
            console.log('request complete')
        })
      },
      [webcamRef]
    );


    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, {type:mime});
    }
   
    return (
      <>
        <Webcam
          audio={false}
          height={720}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
        />
        <button onClick={capture}>Capture photo</button>
      </>
    );
  };

  export default Camera
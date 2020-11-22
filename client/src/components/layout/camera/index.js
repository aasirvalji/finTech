import React, { useState, useLayoutEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import HelperUpload from '../upl/helper'
import './index.css'
import Button from '@material-ui/core/Button';

// calc window size helper function
function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
   
  const Camera = () => {
      const [f, setF] = useState(undefined);
      const [width, height] = useWindowSize();
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
        setF(file);
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
      <div className='webcam-display-container'>
      <Webcam
          audio={false}
          className='webcam-display'
          height={height / 1.7}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={width / 1.7}
          screenshotQuality={1}
          videoConstraints={videoConstraints}
        />
        <Button onClick={capture} id='webcam-capture-button'>Capture photo</Button>
        <HelperUpload picFile={f}/>
      </div>
      </>
    );
  };

  export default Camera
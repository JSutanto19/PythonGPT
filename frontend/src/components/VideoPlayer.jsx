import React, { useEffect, useRef } from 'react';
import { BiWindowClose } from "react-icons/bi";

const VideoPlayer = ({ src, startTime, close }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = startTime;
      videoRef.current.play();
    }
  }, [startTime]);

  return (
    <div style={{
      width: '100%', // Full width container
      height: 'auto', // Height adjusts to content
      position: 'relative', // Needed for absolute positioning of close button
      backgroundColor: 'white'
    }}>
      {console.log(src)}
      <video ref={videoRef} width="100%" style={{ maxWidth: '800px' }} controls> {/* Increased max width */}
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button onClick={close} style={{
        position: 'absolute', // Positioning button
        top: '5px', // 5px from the top of the container
        right: '5px', // 5px from the right of the container
        background: 'transparent', // Optional: makes the button background transparent
        border: 'none', // No border for a cleaner look
        cursor: 'pointer' // Cursor pointer to indicate it's clickable
      }}>
        <BiWindowClose size="24px" color='white'/> {/* Icon size adjustment if needed */}
      </button>
    </div>
  );
};

export default VideoPlayer;


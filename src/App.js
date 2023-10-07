import './App.css';
import Navigation from './utils/navigation/navigation'
import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Controller, Scene } from 'react-scrollmagic';
import ReactPlayer from 'react-player'
import myvideo from './videos/vid.MOV';
import SplitText from './test';
import Experience from './Experience';
import Certificates from './Certificates';


function App() {
  const videoRef = useRef(null);
  const scrollREf = useRef(null);

  const [y, setY] = useState(window.scrollY);

  const handleNavigation = useCallback(
  e => {
  const window = e.currentTarget;
  setY(window.scrollY);
  videoRef && videoRef.current.seekTo(y/2000,"fraction"); 
}, [y]
);

useEffect(() => {
setY(window.scrollY);
window.addEventListener("scroll", handleNavigation);

return () => {
  window.removeEventListener("scroll", handleNavigation);
};
}, [handleNavigation]);

  return (
    <div className="App">
      <Navigation/>
        <div className='header'>
          <ReactPlayer className="player" width={"100vw"} height={"100vh"} z-index={-1} url={myvideo} playing={false} ref={videoRef}/>
          <SplitText/>
        </div>
        <Experience/>
        <Certificates/>
       
    </div>
  );
}

export default App;

import "./App.css";
import Navigation from "./utils/navigation/navigation";
import React, { useRef, useCallback, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import myvideo from "./videos/earth.mp4";
import SplitText from "./test";
import Experience from "./Experience";
import Certificates from "./Certificates";
import Backtotop from "./utils/footer/Backtotop";
import Aboutme from "./Aboutme";
import Projects from "./Projects";
import Footer from "./Footer";
import Education from "./Education";

function App() {
  const videoRef = useRef(null);

  const [y, setY] = useState(window.scrollY);

  const handleNavigation = useCallback(
    (e) => {
      const window = e.currentTarget;
      setY(window.scrollY);
      videoRef && videoRef.current.seekTo(y / 2000, "fraction");
    },
    [y]
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
      <Navigation />
      <Backtotop />
      <div className="header">
        <ReactPlayer
          className="player"
          width={"100vw"}
          height={"100vh"}
          z-index={-1}
          url={myvideo}
          playing={false}
          ref={videoRef}
        />
        <SplitText />
      </div>
      <div className = "mobile-intro">
          <span>
              Hi, I'm Prasanna Nivas
          </span>
          <br/>
          <span>
            Full Stack Developer
          </span>
        </div>
      <Aboutme />
      <Education/>
      <Experience />
      <Certificates />
      <Projects />
      <Footer />
    </div>
  );
}

export default App;

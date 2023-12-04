import React, { useCallback, useEffect, useState } from 'react'
import './navigation.css';

function Navigation() {

    const [y, setY] = useState(window.scrollY);
    const [navbar, setNavbar] = useState(true);

const handleNavigation = useCallback(
  e => {
    const window = e.currentTarget;
    if (y > window.scrollY) {
      setNavbar(true)
    } else if (y < window.scrollY) {
      setNavbar(false)
    }
    setY(window.scrollY);
  }, [y]
);

useEffect(() => {
  setY(window.scrollY);
  window.addEventListener("scroll", handleNavigation);
  document.addEventListener('mousemove', event => {
    if(event.clientY <=50){
      setNavbar(true)
    }    
})

  return () => {
    window.removeEventListener("scroll", handleNavigation);
  };
}, [handleNavigation]);

  return (
    <div className={`navigation ${!navbar && 'hidden-navbar'}`} >
            <div className='navigation--container--logo'>
                <a href = "#"> NIVAS.DEV </a>
            </div>
            <ul className='navigation--items'>
                <li> <a href = "#skills-and-experience-container"> Skills </a></li>
                <li> <a href = "#certificates-and-obtained-container">Certificates</a></li>
                <li> <a href = "#Aboutme">About Me</a></li>
                <li><a href="https://github.com/prasannanivas?tab=repositories">GitHub</a></li>
            </ul>
    </div>
  )
}

export default Navigation
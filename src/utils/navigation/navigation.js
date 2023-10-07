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

  return () => {
    window.removeEventListener("scroll", handleNavigation);
  };
}, [handleNavigation]);

  return (
    <div className={`navigation ${!navbar && 'hidden-navbar'}`} >
            <div className='navigation--container--logo'>
                Nivas.dev
            </div>
            <ul className='navigation--items'>
                <li>About</li>
                <li>Profile</li>
                <li>GitHub</li>
            </ul>
    </div>
  )
}

export default Navigation
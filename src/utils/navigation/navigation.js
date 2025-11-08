import React, { useCallback, useEffect, useState } from "react";
import "./navigation.css";

function Navigation() {
  const [y, setY] = useState(window.scrollY);
  const [navbar, setNavbar] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigation = useCallback(
    (e) => {
      const window = e.currentTarget;
      if (y > window.scrollY) {
        setNavbar(true);
      } else if (y < window.scrollY) {
        setNavbar(false);
      }
      setY(window.scrollY);
    },
    [y]
  );

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener("scroll", handleNavigation);
    document.addEventListener("mousemove", (event) => {
      if (event.clientY <= 50) {
        setNavbar(true);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className={`navigation ${!navbar && "hidden-navbar"}`}>
      <div className="navigation--container--logo">
        <a href="#top"> NIVAS.DEV </a>
      </div>

      <button
        className={`hamburger ${mobileMenuOpen ? "active" : ""}`}
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul
        className={`navigation--items ${
          mobileMenuOpen ? "mobile-menu-open" : ""
        }`}
      >
        <li>
          <a href="#Aboutme" onClick={closeMobileMenu}>
            About Me
          </a>
        </li>
        <li>
          <a href="#education" onClick={closeMobileMenu}>
            Education
          </a>
        </li>
        <li>
          <a href="#skills-and-experience-container" onClick={closeMobileMenu}>
            {" "}
            Skills{" "}
          </a>
        </li>
        <li>
          <a
            href="#certificates-and-obtained-container"
            onClick={closeMobileMenu}
          >
            Certificates
          </a>
        </li>
        <li>
          <a href="#projects" onClick={closeMobileMenu}>
            Projects
          </a>
        </li>
        <li>
          <a
            href="https://github.com/prasannanivas?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
          >
            GitHub
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;

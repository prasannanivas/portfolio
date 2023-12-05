import React from "react";
import "./Footer.css";
import { FaLinkedin, FaFacebook, FaInstagram, FaPhone } from "react-icons/fa";

function Footer() {
  return (
    <>
   
    <footer id="footer">
      <p>
        <a href="mailto:d.prasannanivas@gmail.com">
          Mail ME
        </a>
      </p>
      <div className="Social-media">
        <a
          href="https://www.linkedin.com/in/prasanna-nivas-8231b11a0/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={30} />
        </a>
        <a
          href="https://www.facebook.com/prasannanivas.ganguly/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook size={30} />
        </a>
        <a
          href="https://www.instagram.com/de_prasanna/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size={30} />
        </a>
      </div>
      <div>
        <p><FaPhone/>: +16478974085</p>
      </div>
    </footer>
    <p>&copy; Prasanna Nivas. All rights reserved.</p>
    </>
  );
}

export default Footer;

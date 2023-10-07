import React from "react";
import albertalogo from "./images/certificates/alberta-logo.png";
import stanfordlogo from "./images/certificates/stanford-logo.png";
import hongkonglogo from "./images/certificates/hongkong-logo.png";
import albertacert from './images/certificates/alberta-cert.png';
import stanfordcert from './images/certificates/stanford-cert.png';
import hongkongcert from './images/certificates/hongkong-cert.png';
import awslogo from './images/certificates/aws-logo.png';
import jiralogo from './images/certificates/jira-logo.png';
import jiracert from './images/certificates/jira-cert.png';
import freecodecamp_logo from './images/certificates/freecodecamp-logo.png';
import freecodecamp_backend_cert from './images/certificates/freecodecamp-backend-cert.png';
import udemylogo from './images/certificates/udemy-logo.png';
import durgapythoncert from './images/certificates/durga-python.png'
import awscert from './images/certificates/aws-cert.png'

import "./Certificates.css";

function Certificates() {
    const darkBeautifulColorsRGB = [
        'rgb(255, 0, 0)',      // Red
        'rgb(0, 255, 0)',      // Green
        'rgb(0, 0, 255)',      // Blue
        'rgb(255, 255, 0)',    // Yellow
        'rgb(255, 0, 255)',    // Magenta
        'rgb(0, 255, 255)',    // Cyan
        'rgb(128, 0, 0)',      // Maroon
        'rgb(0, 128, 0)',      // Green
        'rgb(0, 0, 128)',      // Navy
        'rgb(128, 128, 0)',    // Olive
        'rgb(128, 0, 128)',    // Purple
        'rgb(0, 128, 128)',    // Teal
        'rgb(255, 128, 0)',    // Orange
        'rgb(128, 255, 0)',    // Lime
        'rgb(128, 0, 255)',    // Purple
        'rgb(0, 128, 255)',    // Light Blue
        'rgb(255, 0, 128)',    // Pink
        'rgb(128, 255, 255)',  // Light Cyan
        'rgb(255, 128, 128)',  // Light Red
        'rgb(128, 255, 128)',  // Light Green
        'rgb(255, 128, 255)',  // Light Purple
    ];
    
    
    
    // You can access the colors in the array like this:
    console.log(darkBeautifulColorsRGB[0]); // Outputs 'rgb(41, 67, 78)'
    
  return (
    <div className="certificates-and-obtained-container">
      <div className="obtained--container">
        <h1>Certificates</h1>
        <div className="obtained--mover">
          <span>
            {" "}
            <img alt="" src={albertalogo} />
          </span>
          <span>
            {" "}
            <img alt="" src={stanfordlogo} />
          </span>
          <span>
            <img alt="" src={hongkonglogo} />
          </span>
          <span>
            {" "}
            <img alt="" src={freecodecamp_logo} />
          </span>
          <span>
            {" "}
            <img alt="" src={awslogo} />
          </span>
          <span>
            {" "}
            <img alt="" src={jiralogo} />
          </span>
          <span>
            {" "}
            <img alt="" src={udemylogo} />
          </span>
          <span>
            {" "}
            <img alt="" src={albertalogo} />
          </span>
          <span>
            {" "}
            <img alt="" src={stanfordlogo} />
          </span>
          <span>
            <img alt="" src={hongkonglogo} />
          </span>
          <span>
            {" "}
            <img alt="" src={freecodecamp_logo} />
          </span>
          <span>
            {" "}
            <img alt="" src={awslogo} />
          </span>
          <span>
            {" "}
            <img alt="" src={jiralogo} />
          </span>
          <span>
            {" "}
            <img alt="" src={udemylogo} />
          </span>
          <span>
            {" "}
            <img alt="" src={albertalogo} />
          </span>
          <span>
            {" "}
            <img alt="" src={stanfordlogo} />
          </span>
          <span>
            <img alt="" src={hongkonglogo} />
          </span>
          <span>
            {" "}
            <img alt="" src={freecodecamp_logo} />
          </span>
          <span>
            {" "}
            <img alt="" src={awslogo} />
          </span>
          <span>
            {" "}
            <img alt="" src={jiralogo} />
          </span>
          <span>
            {" "}
            <img alt="" src={udemylogo} />
          </span>
        </div>
      </div>
      <h2>certificates</h2>
      <div className="certificates">
          <div className="certificate" style={{backgroundColor: darkBeautifulColorsRGB[14] }}>
            <a href = "https://coursera.org/share/198e0abdcd2af43e5a2baee755a52bdd" ><img alt="" src = {albertacert} /></a>
          </div>
          <div className="certificate" style={{backgroundColor: darkBeautifulColorsRGB[14] }}>
            <a href = "https://coursera.org/share/4207dc8fb916082cd64db29a0b8f7c5c" ><img alt="" src = {stanfordcert} /></a>
          </div>
          <div className="certificate" style={{backgroundColor: darkBeautifulColorsRGB[14] }}>
            <a href = "https://coursera.org/share/b4cf0d562b59cab428ebeed22ad86030" ><img alt="" src = {hongkongcert} /></a>
          </div>
          <div className="certificate" style={{backgroundColor: darkBeautifulColorsRGB[14] }}>
            <a href = "" ><img alt="" src = {jiracert} /></a>
          </div>
          <div className="certificate" style={{backgroundColor: darkBeautifulColorsRGB[14] }}>
            <a href = "" ><img alt="" src = {durgapythoncert} /></a>
          </div>
          <div className="certificate" style={{backgroundColor: darkBeautifulColorsRGB[14] }}>
            <a href = "" ><img alt="" src = {freecodecamp_backend_cert} /></a>
          </div>
          <div className="certificate" style={{backgroundColor: darkBeautifulColorsRGB[14] }}>
            <a href = "" ><img alt="" src = {awscert} /></a>
          </div>
      </div>
    </div>
  );
}

export default Certificates;

import React from "react";
import lumellogo from "./images/Lumel-logo.png";
import zohologo from "./images/zoho-logo.png";
import toshibalogo from "./images/Toshiba-logo.png";
import "./Experience.css";

function Experience() {
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
    <div className="skills-and-experience-container">
      <div className="experience--container">
        <h1>Experience</h1>
        <div className="experience--mover">
          <span>
            {" "}
            <img alt="" src={lumellogo} />
          </span>
          <span>
            {" "}
            <img alt="" src={zohologo} />
          </span>
          <span>
            <img alt="" src={toshibalogo} />
          </span>
          <span>
            {" "}
            <img alt="" src={lumellogo} />
          </span>
          <span>
            {" "}
            <img alt="" src={zohologo} />
          </span>
          <span>
            <img alt="" src={toshibalogo} />
          </span>
          <span>
            {" "}
            <img alt="" src={lumellogo} />
          </span>
          <span>
            {" "}
            <img alt="" src={zohologo} />
          </span>
          <span>
            <img alt="" src={toshibalogo} />
          </span>
        </div>
      </div>
      <h2>Skills</h2>
      <div className="skills">
        <div className="skill-col-1">
          <div className="skill" style={{backgroundColor: darkBeautifulColorsRGB[14] }}>
            <h3>React</h3>
          </div>
          <div className="skill" style={{backgroundColor: darkBeautifulColorsRGB[16]}}>
            <h3>Node JS</h3>
          </div>
          <div className="skill" style={{backgroundColor: darkBeautifulColorsRGB[2]}}>
            <h3>CSS</h3>
          </div>
          <div className="skill" style={{backgroundColor: darkBeautifulColorsRGB[10]}}>
            <h3>Java</h3>
          </div>
        </div>
        <div className="skill-col-2">
          <div className="skill" style={{backgroundColor: darkBeautifulColorsRGB[4]}}>
          <h3>OOP</h3>
        </div>
        <div className="skill" style={{backgroundColor: darkBeautifulColorsRGB[15]}}>
          <h3>Data Structures</h3>
        </div>
        <div className="skill" style={{backgroundColor: darkBeautifulColorsRGB[6]}}>
          <h3>Algorithms</h3>
        </div>
          </div>
          <div className="skill-col-3">
          <div className="skill" style={{backgroundColor: darkBeautifulColorsRGB[7]}}>
          <h3>MongoDB</h3>
        </div>
        <div className="skill" style={{backgroundColor: darkBeautifulColorsRGB[9]}}>
          <h3>SQL</h3>
        </div>
          </div>
       
       
      </div>
    </div>
  );
}

export default Experience;

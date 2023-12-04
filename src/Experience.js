import React, { useEffect } from "react";
import lumellogo from "./images/Lumel-logo.png";
import zohologo from "./images/zoho-logo.png";
import toshibalogo from "./images/Toshiba-logo.png";
import algorithmslogo from "./images/logos/algorithmslogo.png"
import csslogo from "./images/logos/csslogo.png"
import dsalogo from "./images/logos/dsalogo.png"
import gitlogo from "./images/logos/gitlogo.png"
import javalogo from "./images/logos/Javalogo.png"
import mongologo from "./images/logos/mongologo.png"
import nodelogo from "./images/logos/nodelogo.png"
import ooplogo from "./images/logos/ooplogo.png"
import pythonlogo from "./images/logos/pythonlogo.png"
import reactlogo from "./images/logos/reactlogo.png"
import sqllogo from "./images/logos/sqllogo.png"

import "./Experience.css";

function Experience() {
  
  useEffect(() => {

    var callback = function (entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('intersecting-animation')
        }
        else{
          entry.target.classList.remove('intersecting-animation')
        }
      });
    };
    const observer = new IntersectionObserver(callback);
    const targets = document.querySelectorAll(".skill, .experience--container, .obtained--container, .certificate") || [];
    targets.forEach((target) => observer.observe(target));


  
  }, [])
  const darkBeautifulColorsRGB = [
      'rgb(255, 204, 204)',   // Light Red
      'rgb(204, 255, 204)',   // Light Green
      'rgb(204, 204, 255)',   // Light Blue
      'rgb(255, 255, 204)',   // Light Yellow
      'rgb(255, 204, 255)',   // Light Magenta
      'rgb(204, 255, 255)',   // Light Cyan
      'rgb(255, 204, 204)',   // Light Maroon
      'rgb(204, 255, 204)',   // Light Green
      'rgb(204, 204, 255)',   // Light Navy
      'rgb(255, 255, 204)',   // Light Olive
      'rgb(255, 204, 255)',   // Light Purple
      'rgb(204, 255, 255)',   // Light Teal
      'rgb(255, 230, 204)',   // Light Orange
      'rgb(204, 255, 204)',   // Light Lime
      'rgb(204, 204, 255)',   // Light Purple
      'rgb(204, 230, 255)',   // Light Light Blue
      'rgb(255, 204, 230)',   // Light Pink
      'rgb(204, 255, 255)',   // Light Light Cyan
      'rgb(255, 204, 204)',   // Light Light Red
      'rgb(204, 255, 204)',   // Light Light Green
      'rgb(255, 204, 255)',   // Light Light Purple
  ];
  
    
  return (
    <div id="skills-and-experience-container">
      <div className="experience--container">
        <h1>Experience & Skills</h1>
        <div className="experience--mover">
          <span>
            {" "}
            <img alt = "" src={lumellogo} />
          </span>
          <span>
            {" "}
            <img alt = ""  src={zohologo} />
          </span>
          <span>
            <img alt = ""  src={toshibalogo} />
          </span>
          <span>
            {" "}
            <img alt = ""  src={lumellogo} />
          </span>
          <span>
            {" "}
            <img alt = ""  src={zohologo} />
          </span>
          <span>
            <img alt = ""  src={toshibalogo} />
          </span>
          <span>
            {" "}
            <img alt = ""  src={lumellogo} />
          </span>
          <span>
            {" "}
            <img alt = ""  src={zohologo} />
          </span>
          <span>
            <img alt = ""  src={toshibalogo} />
          </span>
        </div>
      </div>
      
      <h2>Skills</h2>
      <div className="skills">
        <div className="skill-col-1">
          <div className="skill" style={{backgroundColor: darkBeautifulColorsRGB[14] }}>
            <h3>React</h3>
            <img alt = "" src = {reactlogo}/>
          </div>
          <div className="skill" style={{backgroundColor: darkBeautifulColorsRGB[16]}}>
            <h3>Node JS</h3>
            <img alt = "" src = {nodelogo}/>
          </div>
          <div className="skill" style={{backgroundColor: darkBeautifulColorsRGB[2]}}>
            <h3>CSS</h3>
            <img alt = "" src = {csslogo}/>
          </div>
          <div className="skill" style={{backgroundColor: darkBeautifulColorsRGB[10]}}>
            <h3>Java</h3>
            <img alt = "" src = {javalogo}/>
          </div>
          <div className="skill" style={{backgroundColor: darkBeautifulColorsRGB[6]}}>
          <h3>Python</h3>
          <img alt = "" src = {pythonlogo}/>
        </div>
        </div>
        <div className="skill-col-2">
          <div className="skill" style={{backgroundColor: darkBeautifulColorsRGB[4]}}>
          <h3>OOP</h3>
          <img alt = "" src = {ooplogo}/>
        </div>
        <div className="skill" style={{backgroundColor: darkBeautifulColorsRGB[15]}}>
          <h3>Data Structures</h3>
          <img alt = "" src = {dsalogo}/>
        </div>
        <div className="skill" style={{backgroundColor: darkBeautifulColorsRGB[6]}}>
          <h3>Algorithms</h3>
          <img alt = "" src = {algorithmslogo}/>
        </div>
        <div className="skill" style={{backgroundColor: darkBeautifulColorsRGB[16]}}>
          <h3>Git</h3>
          <img alt = "" src = {gitlogo}/>
        </div>
          </div>
          <div className="skill-col-3">
          <div className="skill" style={{backgroundColor: darkBeautifulColorsRGB[7]}}>
          <h3>MongoDB</h3>
          <img alt = "" src = {mongologo}/>
        </div>
        <div className="skill" style={{backgroundColor: darkBeautifulColorsRGB[9]}}>
          <h3>SQL</h3>
          <img alt = "" src = {sqllogo}/>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Experience;

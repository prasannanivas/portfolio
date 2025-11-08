import React, { useEffect, useRef, useState } from "react";
import lumellogo from "./images/Lumel-logo.png";
import zohologo from "./images/zoho-logo.png";
import RoostLogo from "./images/logos/roostLogo.png";
import toshibalogo from "./images/Toshiba-logo.png";
import algorithmslogo from "./images/logos/algorithmslogo.png";
import csslogo from "./images/logos/csslogo.png";
import dsalogo from "./images/logos/dsalogo.png";
import gitlogo from "./images/logos/gitlogo.png";
import javalogo from "./images/logos/Javalogo.png";
import mongologo from "./images/logos/mongologo.png";
import nodelogo from "./images/logos/nodelogo.png";
import ooplogo from "./images/logos/ooplogo.png";
import pythonlogo from "./images/logos/pythonlogo.png";
import reactlogo from "./images/logos/reactlogo.png";
import sqllogo from "./images/logos/sqllogo.png";
import dockerLogo from "./images/logos/dockerLogo.png";
import kubernetesLogo from "./images/logos/KubernetesLogo.png";
import oneuplogo from "./images/logos/1up_media_logo.jpeg";
import awsLogo from "./images/logos/awsLogo.png";
import reactNativeLogo from "./images/logos/reactnativeLogo.png";
import "./Experience.css";

const skills = [
  { name: "React", icon: reactlogo, color: "#61DAFB", category: "Frontend" },
  { name: "Node.js", icon: nodelogo, color: "#68A063", category: "Backend" },
  { name: "Java", icon: javalogo, color: "#f89820", category: "Backend" },
  { name: "Python", icon: pythonlogo, color: "#3776AB", category: "Language" },
  { name: "MongoDB", icon: mongologo, color: "#47A248", category: "Database" },
  { name: "SQL", icon: sqllogo, color: "#336791", category: "Database" },
  { name: "CSS", icon: csslogo, color: "#1572B6", category: "Frontend" },
  { name: "Git", icon: gitlogo, color: "#F05032", category: "Tools" },
  { name: "DSA", icon: dsalogo, color: "#764ba2", category: "Core" },
  {
    name: "Algorithms",
    icon: algorithmslogo,
    color: "#667eea",
    category: "Core",
  },
  { name: "OOP", icon: ooplogo, color: "#f093fb", category: "Core" },
  {
    name: "Docker",
    icon: dockerLogo,
    color: "#0999a7ff",
    category: "Devops",
  },
  {
    name: "Kubernetes",
    icon: kubernetesLogo,
    color: "#567df0ff",
    category: "Devops",
  },
  { name: "AWS", icon: awsLogo, color: "#aa6b27ff", category: "Cloud" },
  {
    name: "React Native",
    icon: reactNativeLogo,
    color: "#3586d3ff",
    category: "Mobile UI",
  },
];

const companies = [
  { logo: lumellogo, name: "Lumel Technologies" },
  { logo: zohologo, name: "Zoho" },
  { logo: toshibalogo, name: "Toshiba" },
  { logo: oneuplogo, name: "1UP Media" },
  { logo: RoostLogo, name: "Roost Digital" },
];

function Experience() {
  const [visibleSkills, setVisibleSkills] = useState([]);
  const skillRefs = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const currentRefs = skillRefs.current;
    const observers = currentRefs.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSkills((prev) => [...new Set([...prev, index])]);
          }
        },
        { threshold: 0.3, rootMargin: "0px 0px -50px 0px" }
      );

      if (ref) observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer, index) => {
        if (currentRefs[index]) {
          observer.unobserve(currentRefs[index]);
        }
      });
    };
  }, []);

  return (
    <div id="skills-and-experience-container" ref={sectionRef}>
      <div className="experience-section">
        <div className="experience-header">
          <h1>Experience & Expertise</h1>
          <p className="experience-subtitle">Trusted by Industry Leaders</p>
        </div>

        <div className="companies-showcase">
          <div className="companies-track">
            {[...companies, ...companies, ...companies].map(
              (company, index) => (
                <div key={index} className="company-card">
                  <img src={company.logo} alt={company.name} />
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className="skills-section">
        <div className="skills-header">
          <h2>Technical Arsenal</h2>
          <p className="skills-subtitle">Mastery Across the Full Stack</p>
        </div>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              ref={(el) => (skillRefs.current[index] = el)}
              className={`skill-card ${
                visibleSkills.includes(index) ? "visible" : ""
              }`}
              style={{ "--skill-color": skill.color }}
            >
              <div className="skill-glow"></div>
              <div className="skill-content">
                <div className="skill-icon-wrapper">
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="skill-icon"
                  />
                </div>
                <h3 className="skill-name">{skill.name}</h3>
                <span className="skill-category">{skill.category}</span>
              </div>
              <div className="skill-border"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Experience;

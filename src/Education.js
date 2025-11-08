import React, { useEffect, useRef, useState } from "react";
import "./Education.css";
import {
  FaGraduationCap,
  FaBook,
  FaAward,
  FaCalendar,
  FaMapMarkerAlt,
} from "react-icons/fa";

const educationData = [
  {
    Institution: "Coimbatore Institute of Technology",
    Degree: "Bachelors of Science in Computer Science",
    Grade: "8.61/10",
    years: "2018 - 2022",
    location: "Coimbatore, India",
    mapsrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.128644242673!2d77.02470567510379!3d11.02832588913619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba858979f85136b%3A0xdd9ca28d3c37cf8a!2sCoimbatore%20Institute%20of%20Technology!5e1!3m2!1sen!2sus!4v1701734628542!5m2!1sen!2sus",
    color: "#667eea",
  },
  {
    Institution: "Lambton College",
    Degree: "PG in Full Stack Software Development",
    Grade: "3.6/4",
    years: "2023 - 2024",
    location: "Toronto, Canada",
    mapsrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2918.493947398576!2d-79.33868912377396!3d43.77324967109667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d3bca1a3f78f%3A0x815365ed6c3b957e!2sLambton%20College%20In%20Toronto!5e1!3m2!1sen!2sus!4v1701734488740!5m2!1sen!2sus",
    color: "#764ba2",
  },
];

function Education() {
  const [visibleCards, setVisibleCards] = useState([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    const currentRefs = cardRefs.current;
    const observers = currentRefs.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          }
        },
        { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
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
    <div id="education">
      <div className="education-header">
        <h1>Education & Credentials</h1>
        <p className="education-subtitle">Academic Journey of Excellence</p>
      </div>

      <div className="education-timeline">
        {educationData.map((ed, index) => (
          <div
            key={ed.Degree}
            ref={(el) => (cardRefs.current[index] = el)}
            className={`education-card ${
              visibleCards.includes(index) ? "visible" : ""
            } ${index % 2 === 0 ? "left" : "right"}`}
            style={{ "--accent-color": ed.color }}
          >
            <div
              className="card-glow"
              style={{
                background: `radial-gradient(circle at center, ${ed.color}40, transparent)`,
              }}
            ></div>

            <div className="card-content">
              <div className="card-header">
                <div className="institution-badge">
                  <FaGraduationCap className="badge-icon" />
                </div>
                <div className="institution-info">
                  <h2>{ed.Institution}</h2>
                  <p className="location">
                    <FaMapMarkerAlt /> {ed.location}
                  </p>
                </div>
              </div>

              <div className="degree-section">
                <div className="degree-icon-wrapper">
                  <FaBook className="section-icon" />
                </div>
                <h3>{ed.Degree}</h3>
              </div>

              <div className="details-grid">
                <div className="detail-item">
                  <FaAward className="detail-icon" />
                  <div>
                    <span className="detail-label">Grade</span>
                    <span className="detail-value">{ed.Grade}</span>
                  </div>
                </div>

                <div className="detail-item">
                  <FaCalendar className="detail-icon" />
                  <div>
                    <span className="detail-label">Duration</span>
                    <span className="detail-value">{ed.years}</span>
                  </div>
                </div>
              </div>

              <div className="map-container">
                <div className="map-wrapper">
                  <iframe
                    title={ed.Institution}
                    className="location-map"
                    src={ed.mapsrc}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>

            <div className="card-border"></div>
          </div>
        ))}
      </div>

      <div className="timeline-line"></div>
    </div>
  );
}

export default Education;

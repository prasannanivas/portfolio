import React, { useEffect, useRef, useState } from "react";
import albertalogo from "./images/certificates/alberta-logo.png";
import stanfordlogo from "./images/certificates/stanford-logo.png";
import hongkonglogo from "./images/certificates/hongkong-logo.png";
import albertacert from "./images/certificates/alberta-cert.png";
import stanfordcert from "./images/certificates/stanford-cert.png";
import hongkongcert from "./images/certificates/hongkong-cert.png";
import awslogo from "./images/certificates/aws-logo.png";
import jiralogo from "./images/certificates/jira-logo.png";
import jiracert from "./images/certificates/jira-cert.png";
import freecodecamp_logo from "./images/certificates/freecodecamp-logo.png";
import freecodecamp_backend_cert from "./images/certificates/freecodecamp-backend-cert.png";
import udemylogo from "./images/certificates/udemy-logo.png";
import durgapythoncert from "./images/certificates/durga-python.png";
import awscert from "./images/certificates/aws-cert.png";

import "./Certificates.css";

const certificatesData = [
  {
    name: "Object-Oriented Design",
    institution: "University of Alberta",
    logo: albertalogo,
    cert: albertacert,
    link: "https://coursera.org/share/198e0abdcd2af43e5a2baee755a52bdd",
    color: "#667eea",
  },
  {
    name: "Machine Learning",
    institution: "Stanford University",
    logo: stanfordlogo,
    cert: stanfordcert,
    link: "https://coursera.org/share/198e0abdcd2af43e5a2baee755a52bdd",
    color: "#764ba2",
  },
  {
    name: "Front-End Web Development",
    institution: "Hong Kong University",
    logo: hongkonglogo,
    cert: hongkongcert,
    link: "https://coursera.org/share/198e0abdcd2af43e5a2baee755a52bdd",
    color: "#f093fb",
  },
  {
    name: "Jira Fundamentals",
    institution: "Atlassian",
    logo: jiralogo,
    cert: jiracert,
    link: "https://coursera.org/share/198e0abdcd2af43e5a2baee755a52bdd",
    color: "#0052CC",
  },
  {
    name: "Python Programming",
    institution: "Durga Software",
    logo: udemylogo,
    cert: durgapythoncert,
    link: "https://coursera.org/share/198e0abdcd2af43e5a2baee755a52bdd",
    color: "#3776AB",
  },
  {
    name: "Backend Development",
    institution: "freeCodeCamp",
    logo: freecodecamp_logo,
    cert: freecodecamp_backend_cert,
    link: "https://coursera.org/share/198e0abdcd2af43e5a2baee755a52bdd",
    color: "#0a0a23",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    institution: "Amazon Web Services",
    logo: awslogo,
    cert: awscert,
    link: "https://coursera.org/share/198e0abdcd2af43e5a2baee755a52bdd",
    color: "#FF9900",
  },
];

const providerLogos = [
  albertalogo,
  stanfordlogo,
  hongkonglogo,
  freecodecamp_logo,
  awslogo,
  jiralogo,
  udemylogo,
];

function Certificates() {
  const [visibleCerts, setVisibleCerts] = useState([]);
  const [scrollProgress, setScrollProgress] = useState([]);
  const certRefs = useRef([]);

  useEffect(() => {
    const currentRefs = certRefs.current;
    const observers = currentRefs.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCerts((prev) => [...new Set([...prev, index])]);
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

  useEffect(() => {
    const handleScroll = () => {
      const newProgress = certRefs.current.map((ref) => {
        if (!ref) return 0;
        const rect = ref.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementMiddle = rect.top + rect.height / 2;
        const progress =
          1 - Math.max(0, Math.min(1, elementMiddle / windowHeight));
        return progress;
      });
      setScrollProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="certificates-and-obtained-container">
      <div className="certificates-section">
        <div className="certificates-header">
          <h1>Certifications & Achievements</h1>
          <p className="certificates-subtitle">Recognized Excellence</p>
        </div>

        <div className="providers-showcase">
          <div className="providers-track">
            {[...providerLogos, ...providerLogos, ...providerLogos].map(
              (logo, index) => (
                <div key={index} className="provider-card">
                  <img src={logo} alt="Provider" />
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className="certificates-grid">
        {certificatesData.map((cert, index) => {
          const progress = scrollProgress[index] || 0;
          const translateX = (1 - progress) * 10;
          const opacity = progress;

          return (
            <div
              key={cert.name}
              ref={(el) => (certRefs.current[index] = el)}
              className={`certificate-card ${
                visibleCerts.includes(index) ? "visible" : ""
              }`}
              style={{
                "--cert-color": cert.color,
                transform: `translateX(${translateX}%)`,
                opacity: opacity,
              }}
            >
              <div className="certificate-glow"></div>
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="certificate-content"
              >
                <div className="certificate-image-wrapper">
                  <img
                    src={cert.cert}
                    alt={cert.name}
                    className="certificate-image"
                  />
                  <div className="certificate-overlay">
                    <div className="certificate-info">
                      <img
                        src={cert.logo}
                        alt={cert.institution}
                        className="institution-logo"
                      />
                      <h3 className="certificate-name">{cert.name}</h3>
                      <p className="institution-name">{cert.institution}</p>
                      <span className="view-credential">View Credential →</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Certificates;

import React, { useEffect, useRef, useState } from "react";
import myphoto from "./images/my-photos/Aboutme.jpeg";
import "./Aboutme.css";

function Aboutme() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    const currentRef = sectionRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();

        // Calculate when section is leaving viewport from top
        const scrolled = -rect.top;
        const sectionHeight = rect.height;

        // Fade out as it scrolls past
        if (scrolled > 0) {
          const progress = Math.min(scrolled / (sectionHeight * 0.5), 1);
          setScrollProgress(progress);
        } else {
          setScrollProgress(0);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const opacity = Math.max(1 - scrollProgress, 0);
  const scale = Math.max(1 - scrollProgress * 0.05, 0.95);
  const translateY = -scrollProgress * 100;

  return (
    <div
      id="Aboutme"
      ref={sectionRef}
      className={isVisible ? "animate-in" : ""}
      style={{
        opacity: opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
      }}
    >
      <h1>About Me</h1>
      <div className="contents">
        <p>
          I'm a Full-Stack Software Developer with 4+ years of experience
          crafting scalable web and mobile applications across the entire
          technology stack. My journey began with firmware development at
          Toshiba, where I built real-time performance tracking systems with
          React.js dashboards and data pipelines. This foundation propelled me
          into the dynamic world of full-stack development.
          <br />
          <br />
          At Lumel Technologies, I evolved into an expert in microservices
          architecture, designing containerized REST APIs with Docker and
          Kubernetes while implementing robust JWT/OAuth 2.0 security protocols.
          Currently at 1UP Media, I'm engineering AI-powered WordPress
          automation, architecting Node.js services on AWS with Auto Scaling
          Groups, and building intelligent content optimization pipelines using
          OpenAI and vector embeddings.
          <br />
          <br />
          My expertise spans React, Next.js, Node.js, Java Spring Boot, and
          cloud infrastructure on AWS. I'm passionate about building
          intelligent, secure, and performant systems—from algorithmic trading
          platforms with real-time WebSocket connections to mortgage broking
          mobile apps with role-based dashboards and encrypted file handling.
          With an AWS Solutions Architect certification and a strong foundation
          in system design, I'm driven to deliver innovative solutions that push
          the boundaries of modern web development.
        </p>
        <img className="myphoto" src={myphoto} alt="Prasanna Nivas D" />
      </div>
    </div>
  );
}

export default Aboutme;

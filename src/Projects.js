import React, { useEffect, useRef, useState } from "react";
import todoboardimg from "./images/Project/todoboard.png";
import thalapakattu1 from "./images/Project/thalapakattu1.png";
import thalapakattu2 from "./images/Project/thalapakattu2.png";
import moicollectorimg from "./images/Project/moi-collector.png";

// Roost previews
import roostWeb from "./images/Project/roost_previews/roost_web.png";
import roostWeb2 from "./images/Project/roost_previews/roost_web2.png";
import roostIos1 from "./images/Project/roost_previews/roost_ios_preview-01.png";
import roostIos2 from "./images/Project/roost_previews/roost_ios_preview-02.png";
import roostIos3 from "./images/Project/roost_previews/roost_ios_preview-03.png";
import roostIos4 from "./images/Project/roost_previews/roost_ios_preview-04.png";
import roostIos5 from "./images/Project/roost_previews/roost_ios_preview-05.png";

// 1UP Media previews
import oneupWeb1 from "./images/Project/oneup_previews/oneupweb1.png";
import oneupWeb2 from "./images/Project/oneup_previews/oneupweb2.png";
import oneupWeb3 from "./images/Project/oneup_previews/oneupweb3.png";

import "./Projects.css";

const projectData = [
  {
    projectTitle: "Roost - Toronto Mortgage Broking Platform",
    company: "Toronto, Canada",
    type: "Professional Project",
    description:
      "Developed a comprehensive mortgage broking platform connecting realtors, brokers, and clients. Built with React Native for mobile and React.js for web admin portal, enabling seamless property listings and mortgage applications.",
    keyFeatures: [
      "Role-Based Dashboards: Implemented custom dashboards for Clients, Realtors, and Mortgage Brokers to manage listings, approvals, and transactions",
      "Real-Time Communication: Integrated Socket.io for instant chat and notifications between all platform actors",
      "Secure File Management: Implemented document sharing via MongoDB GridFS and AWS S3 with encryption and authentication middleware",
      "Cross-Platform: React Native mobile app with React.js admin portal for comprehensive access",
    ],
    techStack: [
      "React Native",
      "React.js",
      "Node.js",
      "MongoDB",
      "Socket.io",
      "AWS S3",
    ],
    images: [
      roostWeb,
      roostWeb2,
      roostIos1,
      roostIos2,
      roostIos3,
      roostIos4,
      roostIos5,
    ],
    color: "#667eea",
    category: "Full-Stack Development",
  },
  {
    projectTitle: "1UP Media - AI-Powered Content Platform",
    company: "1UP Media",
    type: "Professional Project",
    description:
      "Engineered an enterprise-grade WordPress automation platform leveraging OpenAI API for SEO-optimized content generation. Built scalable Node.js microservices on AWS EC2 with auto-scaling capabilities.",
    keyFeatures: [
      "AI Content Generation: WordPress plugin with OpenAI API for automated SEO posts with keywords, tags, and images",
      "Cloud Architecture: Node.js services on EC2 behind ALB with Auto Scaling Groups; Amazon RDS for persistence",
      "Smart Linking: Vector embeddings for contextual internal links, improving site crawlability and engagement",
      "Content Analytics: MOZ API + Google Analytics integration for content decay detection with AI-driven 90-day recovery plans",
      "Multi-Channel Publishing: Facebook, X, LinkedIn connectors with scheduling and retry logic",
      "Security Hardened: IAM/least privilege access and secure configurations for ai.1upmedia.com backend",
    ],
    techStack: [
      "WordPress",
      "OpenAI API",
      "Node.js",
      "AWS EC2",
      "Amazon RDS",
      "MOZ API",
      "Google Analytics",
    ],
    images: [oneupWeb1, oneupWeb2, oneupWeb3],
    color: "#764ba2",
    category: "AI & Cloud Engineering",
  },
  {
    projectTitle: "Interactive Todo Board",
    type: "Personal Project",
    description:
      "Explore the seamless world of task management with this dynamic React app, offering a user-friendly interface akin to Trello. This project allows users to effortlessly create, edit, and delete tasks, enhancing productivity and organization.",
    keyFeatures: [
      "Drag-and-Drop Interface: Intuitive design enables users to effortlessly rearrange tasks across different stages",
      "Task Management: Create, edit, and delete tasks with ease for a personalized and organized to-do list",
      "Trello-Inspired Experience: Experience the convenience of a Trello-like board for effective task visualization",
      "Firebase Integration: Secure and efficient backend operations powered by Firebase, ensuring real-time updates",
    ],
    techStack: ["React", "Firebase"],
    githublink: "https://github.com/prasannanivas/Todo-DND",
    projectlink: "https://cheerful-marigold-d55221.netlify.app/",
    images: [todoboardimg],
    color: "#f093fb",
    category: "Web Development",
  },
  {
    projectTitle: "Employee Login System for Restaurant",
    company: "Thalapakatti",
    type: "Professional Project",
    description:
      "Developed a comprehensive Employee Login System tailored for restaurant operations. Leveraging React, Node, and SQL, this system facilitates seamless employee clock-in and clock-out functionality with detailed analytics.",
    keyFeatures: [
      "Employee Clock-In/Clock-Out: Streamlined process for employees to log in at shift start and log out at end",
      "Secure Database Storage: Utilizing SQL for robust and secure storage of employee login and logout data",
      "Date Range Analysis: Employers can select date ranges to obtain detailed insights into employee working hours",
    ],
    techStack: ["React", "Node.js", "SQL"],
    images: [thalapakattu1, thalapakattu2],
    color: "#0052CC",
    category: "Full-Stack Development",
  },
  {
    projectTitle: "Moi-Collector: Gift Management System",
    type: "Personal Project",
    description:
      "Introducing 'moi-collector,' a specialized React-based application designed to streamline the process of recording and managing monetary gifts during Tamil Hindu marriages with data visualization.",
    keyFeatures: [
      "Gift Tracking: Easily record and manage monetary gifts given by relatives during ceremonies",
      "Paperless Operation: Modern alternative to traditional pen-and-paper methods, reducing waste",
      "Data Analysis and Visualization: Utilizes ChartJS to provide insightful charts and comprehensive gift analysis",
      "Time-Saving Solution: Efficiently streamline the gift management process for users and event organizers",
    ],
    techStack: ["React", "ChartJS"],
    githublink: "https://github.com/prasannanivas/moi-collection-tracker",
    images: [moicollectorimg],
    color: "#3776AB",
    category: "Web Development",
  },
];

function Projects() {
  const [visibleProjects, setVisibleProjects] = useState([]);
  const projectRefs = useRef([]);

  useEffect(() => {
    const currentRefs = projectRefs.current;
    const observers = currentRefs.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleProjects((prev) => [...new Set([...prev, index])]);
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
    <div id="projects">
      <div className="projects-header">
        <h1>Featured Projects</h1>
        <p className="projects-subtitle">
          Building the Future, One Project at a Time
        </p>
      </div>

      <div className="projects-grid">
        {projectData.map((project, index) => (
          <div
            key={project.projectTitle}
            ref={(el) => (projectRefs.current[index] = el)}
            className={`project-card ${
              visibleProjects.includes(index) ? "visible" : ""
            }`}
            style={{ "--project-color": project.color }}
          >
            <div className="project-glow"></div>

            <div className="project-content">
              <div className="project-header">
                <div className="project-meta">
                  <span className="project-category">{project.category}</span>
                  {project.company && (
                    <span className="project-company">@ {project.company}</span>
                  )}
                </div>
                <h2 className="project-title">{project.projectTitle}</h2>
                <p className="project-description">{project.description}</p>
              </div>

              <div className="project-images">
                {project.images.map((img, idx) => (
                  <div key={idx} className="project-image-wrapper">
                    <img
                      src={img}
                      alt={`${project.projectTitle} preview ${idx + 1}`}
                    />
                  </div>
                ))}
              </div>

              <div className="project-features">
                <h3>Key Features</h3>
                <ul>
                  {project.keyFeatures.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="project-tech">
                <h3>Tech Stack</h3>
                <div className="tech-tags">
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {(project.githublink || project.projectlink) && (
                <div className="project-links">
                  {project.githublink && (
                    <a
                      href={project.githublink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <span>View on GitHub →</span>
                    </a>
                  )}
                  {project.projectlink && (
                    <a
                      href={project.projectlink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link primary"
                    >
                      <span>Live Demo →</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;

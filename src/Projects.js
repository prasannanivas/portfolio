import React from "react";
import todoboardimg from "./images/Project/todoboard.png";
import thalapakattu1 from "./images/Project/thalapakattu1.png";
import thalapakattu2 from "./images/Project/thalapakattu2.png";
import moicollectorimg from "./images/Project/moi-collector.png";

import "./Projects.css";

const projectData = [
  {
    projectTitle: "Interactive Todo Board",
    description:
      "Explore the seamless world of task management with this dynamic React app, offering a user-friendly interface akin to Trello. This project allows users to effortlessly create, edit, and delete tasks, enhancing productivity and organization. The drag-and-drop functionality empowers users to fluidly maneuver tasks between stages, streamlining their workflow.",
    keyFeatures: [
      "Drag-and-Drop Interface: Intuitive design enables users to effortlessly rearrange tasks across different stages.",
      "Task Management: Create, edit, and delete tasks with ease for a personalized and organized to-do list.",
      "Trello-Inspired Experience: Experience the convenience of a Trello-like board for effective task visualization.",
      "Firebase Integration: Secure and efficient backend operations powered by Firebase, ensuring real-time updates and reliability.",
    ],
    techStack: ["React", "Firebase"],
    conclusion:
      "Embark on a journey of enhanced productivity and organization with this React app. Elevate your task management experience and bring efficiency to the forefront.",
    githublink: "https://github.com/prasannanivas/Todo-DND",
    projectlink: "https://cheerful-marigold-d55221.netlify.app/",
    images: [todoboardimg],
  },
  {
    projectTitle: "Employee Login System for Restaurant",
    description:
      "Developed a comprehensive Employee Login System tailored for restaurant operations. Leveraging React, Node, and SQL, this system facilitates seamless employee clock-in and clock-out functionality, with detailed logs stored in a secure database. Employees can log in at the start of their shift and log out at the end, enabling precise tracking of working hours. Employers can easily retrieve and analyze this data by selecting a specific date range to obtain accurate hour calculations for efficient workforce management.",
    techStack: ["React", "Node", "SQL"],
    keyFeatures: [
      "Employee Clock-In/Clock-Out: Streamlined process for employees to log in at the start of their shift and log out at the end.",
      "Secure Database Storage: Utilizing SQL for robust and secure storage of employee login and logout data.",
      "Date Range Analysis: Employers can select a date range to obtain detailed insights into employee working hours for effective workforce management.",
    ],
    images: [thalapakattu1, thalapakattu2],
    conclusion:
      "Enhance your restaurant's operational efficiency with this Employee Login System, providing a reliable solution for tracking employee hours and improving overall workforce management.",
  },
  {
    projectTitle:
      "Moi-Collector: Simplifying Gift Management in Tamil Hindu Marriages",
    description:
      "Introducing 'moi-collector,' a specialized React-based application designed to streamline the process of recording and managing monetary gifts given by relatives during Tamil Hindu marriages. This efficient solution not only replaces traditional pen-and-paper methods but also incorporates data analysis and visualization using ChartJS. By leveraging React on the front end, 'moi-collector' saves valuable time and reduces paper usage, offering a modern approach to tracking and analyzing gift amounts in a visually intuitive manner.",
    techStack: ["React", "ChartJS"],
    keyFeatures: [
      "Gift Tracking: Easily record and manage monetary gifts given by relatives during Tamil Hindu marriages.",
      "Paperless Operation: Modern alternative to traditional pen-and-paper methods, reducing waste and promoting environmental sustainability.",
      "Data Analysis and Visualization: Utilizes ChartJS to provide insightful charts and analysis, offering a comprehensive overview of gift amounts.",
      "Time-Saving Solution: Efficiently streamline the gift management process, saving time for both users and event organizers.",
    ],
    conclusion:
      "Experience the convenience of 'moi-collector,' an innovative React-based application that not only simplifies gift tracking but also brings efficiency and modernization to the process of managing monetary contributions in Tamil Hindu marriages.",
    githublink: "https://github.com/prasannanivas/moi-collection-tracker",
    images: [moicollectorimg],
  },
];

function Projects() {
  return (
    <div id="projects">
      <div className="project-contents">
      <h1>Projects</h1>
        {projectData.map((projectObject) => {
          return (
            <div className="project">
              <div className="project-image">
              <h3>{projectObject.projectTitle}</h3>
                {projectObject.images?.map((imgs) => (<>
                    <img src = {imgs} alt ={projectObject.projectTitle} />
                </>))}
              </div><hr/>
              <div className="project-explanation">
                <p>{projectObject.description}</p> <hr/>
                <p>{projectObject.keyFeatures}</p><hr/>
                {projectObject.githublink && (
                 <> <a href={projectObject.githublink} target="_blank" rel="noopener noreferrer">Github link</a> <hr/></>
                )}
                {projectObject.projectlink && (
                 <> <a href={projectObject.projectlink} target="_blank" rel="noopener noreferrer">Project URL</a> <hr/></>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Projects;

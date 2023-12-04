import React from "react";
import myphoto from "./images/my-photos/Aboutme.jpeg";
import "./Aboutme.css";

function Aboutme() {
  return (
    <div id="Aboutme">
      <h1>About Me</h1>
      <div className="contents">
        <p>
          With a solid foundation in computer engineering, my professional
          journey began with a firmware development internship at Toshiba, where
          I honed my skills in embedded systems. This experience laid the
          groundwork for a transition to the dynamic realm of web development.
          Joining Lumel Technologies as a React Developer, I rapidly evolved
          into a full-stack developer, proficient in React, Node.js, MongoDB,
          and the intricacies of microservices architecture. My exposure to
          Kubernetes and Docker underscored my commitment to modern, scalable,
          and containerized application development. During my tenure, I
          embraced Agile methodologies, ensuring adaptive and collaborative
          development processes. Prior to this, my summer internship at ZOHO
          equipped me with expertise in Java, Spring technologies, and design
          patterns. My diverse experiences collectively reflect a passion for
          continuous learning, adaptability, and a commitment to staying at the
          forefront of technology trends. As I navigate this dynamic field, I am
          enthusiastic about contributing to innovative solutions and pursuing
          further opportunities for growth and leadership in the ever-evolving
          landscape of software development.
        </p>
        <img className="myphoto" src={myphoto} alt="it's meeee" />
      </div>
    </div>
  );
}

export default Aboutme;

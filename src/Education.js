import React from "react";
import "./Education.css";
import { FaGraduationCap, FaBook, FaAward, FaCalendar } from "react-icons/fa";

const educationData = [
  {
    Institution: "Coimbatore Institute of Technology",
    Degree: "Bachelors of Science in Computer Science",
    Grade: "8.61/10",
    years: "2018 - 2022",
    mapsrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.128644242673!2d77.02470567510379!3d11.02832588913619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba858979f85136b%3A0xdd9ca28d3c37cf8a!2sCoimbatore%20Institute%20of%20Technology!5e1!3m2!1sen!2sus!4v1701734628542!5m2!1sen!2sus"
  },
  {
    Institution: "Lambton College",
    Degree: "PG in Full Stack Software Development",
    Grade: "3.6/4",
    years: "2023 - 2024",
    mapsrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2918.493947398576!2d-79.33868912377396!3d43.77324967109667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d3bca1a3f78f%3A0x815365ed6c3b957e!2sLambton%20College%20In%20Toronto!5e1!3m2!1sen!2sus!4v1701734488740!5m2!1sen!2sus",
  },
];

function Education() {
  return (
    <div id="education">
      <h1>Education</h1>
      {educationData.map((ed) => (
        <div style = {{display:'flex', width:"95%", margin:"2.5%",   backgroundColor: "rgb(21, 14, 54)"}}>
          <div className="edu-details" key={ed.Degree}>
            <h1>
              <FaGraduationCap /> {ed.Institution}
            </h1>{" "}
            <hr />
            <h3>
              {" "}
              <FaBook /> {ed.Degree}
            </h3>
            <hr />
            <h4>
              {" "}
              <FaAward /> {ed.Grade}
            </h4>
            <hr />
            <h5>
              {" "}
              <FaCalendar /> {ed.years}
            </h5>
            <hr />
          </div>
          <div className="Map">
            <iframe
              title={ed.Institution}
              height={250}
              width={250}
              style={{ border: 0 }}
              src={ed.mapsrc}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Education;

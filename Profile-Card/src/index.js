import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const skills = [
  {
    skill: "HTML + CSS",
    level: "advanced",
    color: "#2662EA",
  },
  {
    skill: "Javascript",
    level: "advanced",
    color: "#EFD81D",
  },
  {
    skill: "Selenium",
    level: "👍🏾",
    color: "#C3DCAF",
  },
  {
    skill: "Cypress",
    level: "intermediate",
    color: "#3E84F3",
  },
  {
    skill: "Playwright",
    level: "beginner",
    color: "#60DAFB",
  },
  {
    skill: "React",
    level: "beginner",
    color: "#FF3B00",
  },
  {
    skill: "C#",
    level: "beginner",
    color: "#ABC123",
  },
];

function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        {/*
        Should contain one skill component for each web dev skill that you have customized with props
        */}
        <SkillList />
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <img className="avatar" src="LuisMedinaCoca.png" alt="luis medina coca" />
  );
}

function Intro() {
  return (
    <div>
      <h1>Luis Javier Medina Coca</h1>
      <p>
        SSr Quality Assurance Engineer and teacher. When not coding or working
        at Patagonian, I like to study a little of React, reading some fantasy
        books or enjoy walking with my dog at park.
      </p>
    </div>
  );
}

function SkillList() {
  return (
    <div className="skill-list">
      {skills.map((skill) => (
        <Skill skill={skill.skill} color={skill.color} level={skill.level} />
      ))}
    </div>
  );
}

function Skill({ skill, color, level }) {
  return (
    <div className="skill" style={{ backgroundColor: color }}>
      <span>{skill}</span>
      <span>
        {level === "beginner" && "👶🏽"}
        {level === "intermediate" && "👍🏾"}
        {level === "advanced" && "💪🏽"}
      </span>
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

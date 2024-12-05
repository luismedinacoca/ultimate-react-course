import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

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
      <Skill skill="HTML + CSS" emoji="💪🏽" color="blue" />
      <Skill skill="Javascript" emoji="💪🏽" color="orange" />
      <Skill skill="Cypress" emoji="👍🏾" color="green" />
      <Skill skill="Selenium" emoji="👍🏾" color="yellow" />
      <Skill skill="Playwright" emoji="👍🏾" color="orangered" />
      <Skill skill="React" emoji="👍🏾" color="pink" />
    </div>
  );
}

function Skill(props) {
  return (
    <div className="skill" style={{ backgroundColor: props.color }}>
      <span>{props.skill}</span>
      <span>{props.emoji}</span>
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

import PropTypes from "prop-types";
import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
  return (
    <div>
      <Steps />
      {/* <Steps /> */}
      {/* Passing StepMessage componenet */}
      <StepMessage step={1}>
        <p>Pass in content</p>
        <p>✌️</p>
      </StepMessage>
      <StepMessage step={2}>
        <p>Read children prop</p>
        <p>🤩</p>
      </StepMessage>
    </div>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  //Event handler functions
  function handlePrevious() {
    // if (step > 1) setStep(step - 1);
    if (step > 1) setStep((s) => s - 1);
  }
  function handleNext() {
    // if (step < 3) setStep(step + 1);
    if (step < 3) setStep((s) => s + 1); //!test: run this line the the following line
    // if (step < 3) setStep((s) => s + 1);
  }

  return (
    <div>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          {/* //replaced by <StepMessage/> component
          <p className="message">
            Step {step}: {messages[step - 1]}
          </p> 
          */}
          <StepMessage step={step}>
            {messages[step - 1]}
            <div className="buttons">
              <Button
                bgColor="#e7e7e7"
                textColor="#333"
                onClick={() => alert(`Learn how to ${messages[step - 1]}`)}
              >
                Learn how
              </Button>
            </div>
          </StepMessage>

          <div className="buttons">
            <Button bgColor="#7950F2" textColor="#FFF" onClick={handlePrevious}>
              <span>👈</span> Previous
            </Button>
            {/* <button
              style={{ backgroundColor: "#7950F2", color: "#FFF" }}
              onClick={handlePrevious}
            >
              Previous
            </button> */}
            <Button bgColor="#7950F2" textColor="#FFF" onClick={handleNext}>
              Next <span>👉</span>
            </Button>
            {/* <button
                style={{ backgroundColor: "#7950F2", color: "#FFF" }}
                onClick={handleNext}
              >
                Next
              </button> */}
          </div>
        </div>
      )}
    </div>
  );
}

function StepMessage({ step, children }) {
  return (
    <p className="message">
      <h3>Step {step}:</h3>
      {children}
    </p>
  );
}

function Button({ textColor, bgColor, onClick, children }) {
  return (
    // <button
    //   style={{ backgroundColor: "#7950F2", color: "#FFF" }}
    //   onClick={handlePrevious}
    // >
    //   Text
    // </button>

    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default App;

/*********** PROPS ***********/
Button.propTypes = {
  textColor: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

StepMessage.propTypes = {
  step: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

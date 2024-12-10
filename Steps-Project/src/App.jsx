import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
  // if(step > 0) {
  //   const [step, setStep] = useState(1);  //! useState must not be inside conditional expression!
  // }
  const [step, setStep] = useState(1);
  // let [step, setStep] = useState(1);

  //Event handler functons
  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }
  function handleNext() {
    if (step < 3) setStep((s) => s + 1);
    // step = step + 1;
    // console.log("step: ", step);
  }

  return (
    <div className="steps">
      <div className="numbers">
        <div className={step >= 1 ? "active" : ""}>1</div>
        <div className={step >= 2 ? "active" : ""}>2</div>
        <div className={step >= 3 ? "active" : ""}>3</div>
      </div>

      <p className="message">
        Step {step}: {messages[step - 1]}
      </p>
      <div className="buttons">
        <button
          style={{ backgroundColor: "#7950F2", color: "#FFF" }}
          onClick={handlePrevious}
          // onClick={() => alert("Previous")}
          // onMouseEnter={() => alert("Previous")}
        >
          Previous
        </button>
        <button
          style={{ backgroundColor: "#7950F2", color: "#FFF" }}
          // onClick={() => alert("Next")}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;

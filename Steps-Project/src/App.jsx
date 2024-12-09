const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
  const step = 1;

  //Event handler functons
  function handlePrevious() {
    alert("Previous");
  }
  function handleNext() {
    alert("Next");
  }

  
  return (
    <div className="steps">
      <div className="numbers">
        <div className={`${step >= 1 ? "active" : ""}`}>1</div>
        <div className={`${step >= 2 ? "active" : ""}`}>2</div>
        <div className={`${step >= 3 ? "active" : ""}`}>3</div>
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

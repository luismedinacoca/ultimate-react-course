import { useState, useReducer } from "react";

const reducer = (state, action) => {
  console.log(state, action);
  //return state + action; //return the next state!
  //if (action.type === "inc") return state + action.payload;
  if (action.type === "inc") return state + 1;

  //if (action.type === "dec") return state + action.payload;
  if (action.type === "dec") return state - 1;
  
  if (action.type === "setCount") return action.payload;
};

function DateCounter() {
  //const [count, setCount] = useState(0);

  const [count, dispatch] = useReducer(reducer, 0);
  const [step, setStep] = useState(1);

  // This mutates the date object.
  //const date = new Date("june 21 2027");
  const date = new Date();
  date.setDate(date.getDate() + count);

  const dec = () => {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
    //dispatch(-1);
    //dispatch({ type: "dec", payload: -1 });
    dispatch({ type: "dec" });
  };

  const inc = () => {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
    //dispatch(1);
    //dispatch({ type: "inc", payload: 1 });
    dispatch({ type: "inc" });
  };

  const defineCount = (e) => {
    // setCount(Number(e.target.value));
    //dispatch(Number(e.target.value));
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = (e) => {
    setStep(Number(e.target.value));
  };

  const reset = () => {
    // setCount(0);
    setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button type="button" onClick={dec}>
          -
        </button>
        <input value={count} onChange={defineCount} />
        <button type="button" onClick={inc}>
          +
        </button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button type="button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
export default DateCounter;

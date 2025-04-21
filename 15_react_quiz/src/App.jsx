import Header from "./Header";
import Main from "./components/Main";
import { useEffect, useReducer } from "react";

const initialState = {
  questions: [],

  //status: loading, error, ready, active, finished
  status: "loading",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    default:
      throw new Error("Action unknown");
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      //.then((data) => console.log(data))
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      //.catch((err) => console.error("Error: " + err));
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Question</p>
      </Main>
    </div>
  );
};

export default App;

# Create a fake API

1. Having `./src/data/questions.json` file:

2. Run:
```bash
npm i json-server
```

3. Open `package.json` file:

4. Add
```json
  "scripts": {
    "dev": "vite",
    ...
    "server": "json-server --watch src/data/questions.json --port 8000"
  },
```

5. Execute from terminal:
```bash
npm run server
```

Now [http://localhost:8000/questions](http://localhost:8000/questions) is ready to get the data.

# Reducer Hook:

## 1. Call the useReducer hook:
```js
const [state, dispatch] = useReducer(reducer, initialState);
```

1.1 `reducer` is a callback
1.2 `initialState` is an object with:
    a. `questions` array which is empty
    b. `status` = 'Loading'

## 2. Initial State: `initialState`
```js
const initialState = {
  questions: [],
  status: "loading",
};
```

## 3. `reducer` function:
```js
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
```

## 4. useEffect:
```js
import { useEffect } from 'react';

useEffect(() => {
  async function loadingQuestions() {
    try {
      const res = await fetch("http://localhost:8000/questions");
      const data = await res.json();
      // console.log(data);
      dispatch({ type: "dataReceived", payload: data });
    } catch (err) {
      // console.error("Error: " + err);
      dispatch({ type: "dataFailed" });
    }
  }

  cargarPreguntas();
}, []);
```

## 5. State Diagram:

<img src="./images/Reducer-loading-error-ready.png">

# Lecture 192:

## `State` Destructuring:
1. Having:
```js
import { useReducer } from "react";
...

const initialState = {
  questions: [],
  status: "loading",
};
....
//useReducer hook:
const [state, dispatch] = useReducer(reducer, initialState);
```
2. Destructuring the state from useReducer:
```js
const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
const numQuestions = questions.length;
...
<Main>
  {status === "ready" && <StartScreen numQuestions={numQuestions}>}
</Main>
```

# Lecture 193:

## Add new status:
```js
const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      ...
    case "dataFailed":
      ...
    case "start":
      return {
        ...state,
        status: "active"
      }  
    default:
      throw new Error("Action unknown");
  }
};
```

## Send `dispatch` function through `StartScreen` component:
```js
/* ./src/app.jsx */
...
<Main>
  {status === "ready" && 
    <StartScreen 
      numQuestions={numQuestions} 
      dispatch={dispatch}
    />
  }
  {status === "active" && <Question>}
</Main>


/* ./src/component/StartScreen.jsx */
const StartScreen = ({ numQuestions, dispatch  }) => {
  return(
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button 
        className="btn btn-ui"
        onClick={ () => dispatch( type: "start" )}
      >
        Let's Start
      </button>
    <div>
  )
}
```

## State Diagram:

<img src="./images/Reducer - active(start).png">

# Lecture 194:

## We need index as props:

1. Add `index` in `InitialState` object:
```js
const initialState = {
  questions: [],
  status: "loading",
  index: 0,  // 👈🏽
};
```

2. Pass this `index` as props in `Question` component as `question={questions[index]}` in `appjs` file.
```js
<Main>
  {/* {state.status} */}
  {status === "loading" && <Loader />}
  {status === "error" && <Error />}
  {status === "ready" && (
    <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
  )}
  {status === "active" && <Question question={questions[index]} />}
</Main>
```

3. Go to `Question` component and make a `console.log` for question prop `questions[index]` and familiarate with its values:
```json
{
  "question": "Which is the most popular JavaScript framework?",
  "options": [
    "Angular",
    "React",
    "Svelte",
    "Vue"
  ],
  "correctOption": 1,
  "points": 10,
  "id": "42f8"
}
```

4. complete the `Question` component:
```js
import Options from "./Options";

const Question = ({ question }) => {
  console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      {/* 
        <div className="options">
          {question.options.map((option) => (
            <button className="btn btn-option" key={option}>{option}</button>
          ) )}
        </div>
      */}
      <Options question={question} />
    </div>
  );
};

export default Question;
```
5. Create `Options` component:
```js
import React from "react";

const Options = ({question}) => {
  return (
    <div className="options">
      {question.options.map((option) => (
        <button type="button" className="btn btn-opition" key={option}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
```


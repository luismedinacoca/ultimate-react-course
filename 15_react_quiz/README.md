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

# Lecture 195:

## Question/Option (answer) logic:
Now we are in Question, we need to find out which answer is correct. So nwe need a state for answer.

### Create a new state: `answer: null`
```js
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,  // 👈🏽
};
```

### Destructuring the InitialState:
```js
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,   // 👈🏽  
};

//destructuring the initial state:
const [{ questions, status, index, answer* }, dispatch] = useReducer(reducer, initialState);
```

### Create an action in the Reducer in order to update the answer:
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
    case "newAnswer":
      return {
        ...state,
        answer: action.payload,
      }  
    default:
      throw new Error("Action unknown");
  }
};
```

### Need to send `dispatch` function `answer` value to `Option` component:
So we need to send dispatch from App.jsx > Question component > Option component

```js
// app.jsx
 <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Question
              question={questions[index]}
              dispatch={dispatch}   // 👈🏽
              answer={answer}       // 👈🏽  
            />
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
```

then
```js
import Options from "./Options";

const Question = ({ question, dispatch, answer }) => {  // 👈/🏽
  console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} /> // 👈🏽  
    </div>
  );
};

export default Question;
```
finally in Option component:
```js
import React from "react";

const Options = ({ question, dispatch, answer }) => {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index*) => (
        <button
          type="button"
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
```

## Points logic:

### Adding points in `InitialState`:
```js
const initialState = {
  questions: [],

  //status: loading, error, ready, active, finished
  status: "loading",
  index: 0, //currentIndex
  answer: null,
  points: 0,  // 👈🏽
};
```

### How point affect to function `reducer` in "newAnswer" action:
```js
const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ... };
    case "dataFailed":
      return {...};
    case "start":
      return {...};
    case "newAnswer": {
      const question = state.questions.at(state.index);  // 👈🏽 currentQuestion
      return {
        ...state,
        answer: action.payload,  // option 'index' in currentQuestion
        points:
          action.payload === question.correctOption
            ? // ? state.points + 1
              state.points + question.points
            : state.points,
      };
    }
    default:
      throw new Error("Action unknown");
  }
};
```

# Lecture 196:

having the InitialState as:
```js
const initialState = {
  questions: [],
  //status: loading, error, ready, active, finished
  status: "loading",
  index: 0, //currentIndex  ❓
  answer: null,
  points: 0,
};
```


Add new action named `nextQuestion` in `reducer` function:
```js
const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ... };
    case "dataFailed":
      return {...};
    case "start":
      return {...};
    case "newAnswer": {
      const question = state.questions.at(state.index);  
      return { ... };
    }
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1 // 👈🏽
      };
    default:
      throw new Error("Action unknown");
  }
};
```

Add the `NextButton`component passing the dispatch and answer:
```js
<Main>
  {status === "loading" && <Loader />}
  {status === "error" && <Error />}
  {status === "ready" && (
    <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
  )}
  {status === "active" && (
    <>
      <Question
        question={questions[index]}
        dispatch={dispatch}
        answer={answer}
      />
      <NextButton 
        dispatch={dispatch}
        answer={answer}
      /> {/* 👈🏽 👈🏽 */}
    </>
  )}
</Main>
```

Create `NextButton` component
- Reducer does not need any data, and therefore no payload is necessary!

```js
const NextButton = ({ dispatch, answer }) => {
  if (answer === null) return null;
  return (
    <button
      type="button"
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  );
};
export default NextButton;
```

Issue:
- answer has not been reset

Fixing:
```js
const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ... };
    case "dataFailed":
      return {...};
    case "start":
      return {...};
    case "newAnswer": {
      const question = state.questions.at(state.index); 
      return { ... };
    }
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null // 👈🏽
      };
    default:
      throw new Error("Action unknown");
  }
};
```

# Lecture 197:

## 1. Create Pregress Bar component:
Props needed:
- index which it starts at 1. So {index + 1}
- numQuestions in order to know total question number.

```js
const Progress = ({ index, numQuestions }) => {
  <header className="progress">
    <p>
      Question <strong>{index +1}</strong> / {numQuestions}
    </p>
  </header>
}

export dafault Progress;
```

## 2. Add `Progress` component inside `Main` component:
```js
<Main>
  {status === "loading" && <Loader />}
  {status === "error" && <Error />}
  {status === "ready" && (
    <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
  )}
  {status === "active" && (
    <>
      <Progress
        index={index}
        numQuestions={numQuestions}
      /> {/* 👈🏽 */}
      <Question
        question={questions[index]}
        dispatch={dispatch}
        answer={answer}
      />
      <NextButton
        dispatch={dispatch}
        answer={answer}
      />
    </>
  )}
</Main>
```

## 3. Add `points` as a prop in `Progress` component:
```js
const Progress = ({ index, numQuestions, points }) => {
  <header className="progress">
    <p>
      Question <strong>{index +1}</strong> / {numQuestions}
    </p>
    <p>
      <strong>{points}</strong> / X
    </p> {/* 👈🏽 */}
  </header>
}

export dafault Progress;
```
### added as props in `Main` component:
```js
<>
  <Progress
    index={index}
    numQuestions={numQuestions}
    points={points} {/* 👈🏽 */}
  /> 
  <Question
    question={questions[index]}
    dispatch={dispatch}
    answer={answer}
  />
  <NextButton
    dispatch={dispatch}
    answer={answer}
  />
</>
```

### Destructuring in `useReducer`, adding `points` in `InitialState` and create the `maxPossiblePoints` applying reduce method:
```js
//destructuring the initial state:
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,   // 👈🏽  
};

//adding points in this destructuring "state":
const [{ questions, status, index, answer, points* }, dispatch] = useReducer(reducer, initialState);

const maxPossiblePoints = questions.reduce((prev, curr) => prev + curr.points, 0)
```

### send `maxPossiblePoints` as props:
1. In `Main` component:
```js
<>
  <Progress
    index={index}
    numQuestions={numQuestions}
    points={points} 
    maxPossiblePoints={maxPossiblePoints} {/* 👈🏽 */}
  /> 
  <Question
    question={questions[index]}
    dispatch={dispatch}
    answer={answer}
  />
  <NextButton
    dispatch={dispatch}
    answer={answer}
  />
</>
```

2. In `Progress` component:
```js
const Progress = ({ index, numQuestions, points, maxPossiblePoints }) => {
  <header className="progress">
    <p>
      Question <strong>{index +1}</strong> / {numQuestions}
    </p>
    <p>
      <strong>{points}</strong> / {maxPossiblePoints}
    </p> {/* 👈🏽 */}
  </header>
}

export dafault Progress;
```

## Add `<progress>` HTML tag:
```js
const Progress = ({ index, numQuestions, points, maxPossiblePoints }) => {
  <header className="progress">
    <progress max={numQuestions} value={index} />  {/* 👈🏽 */}
    <p>
      Question <strong>{index + 1}</strong> / {numQuestions}
    </p>
    <p>
      <strong>{points}</strong> / {maxPossiblePoints}
    </p>
  </header>
}

export dafault Progress;
```
### Issue:
- Progress tag bar increases when `Next` button is clicked.

### Expected Result:
- Progress tab bar increases right after an answer is selected.

> Remember: When user clicks on any option/answer, right after that action, each option is disabled or blocked.

### Add `answer` as props in `Progress` component in order `progress` HTML tag can use it:
```js
const Progress = ({ index, numQuestions, points, maxPossiblePoints, answer }) => {
  <header className="progress">
    <progress max={numQuestions} value={index} />  {/* 👈🏽 */}
    <p>
      Question <strong>{index + 1}</strong> / {numQuestions}
    </p>
    <p>
      <strong>{points}</strong> / {maxPossiblePoints}
    </p>
  </header>
}

export dafault Progress;
```

Special algorithm:
```js
<progress max={numQuestions} value={index + Number(answer !== null)} />  {/* 👈🏽 */}
```

1. User enters to 1st Question: `answer = null`.

    Number(answe !== null) => Number(false) => 0
    ```
    <progress max={numQuestions} value={index + 0} />
    <progress max={numQuestions} value={index} />" 
    ```
2. User select any option in 1st Question: `answer !== null`.

    Number(answe !== null) => Number(true) => 1

    so progress should be as Expected Result
    ```
    <progress max={numQuestions} value={index + 1} />
    ```


# Lecture 198: Finishing a Quiz
============================================

## Create `FinishScreen.jsx` component:
```js
// .src/components/FinishScreen.jsx
const FinishScreen = ({ points, maxPossiblePoints }) => {
  const percentage = (points / maxPossiblePoints) * 100;
  return (
    <p className="result">
      You scored <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)}%)
    </p>
  )
}

export default FinishScreen;
```

## Add `status === 'finished'` and `FinishScreen` component in `Main` component:
```js
<Main>
  {status === "loading" && <Loader />}
  {status === "error" && <Error />}
  {status === "ready" && (
    <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
  )}
  {status === "active" && (
    <>
      <Progress
        index={index}
        numQuestions={numQuestions}
        points={points} 
        maxPossiblePoints={maxPossiblePoints}
      /> 
      <Question
        question={questions[index]}
        dispatch={dispatch}
        answer={answer}
      />
      <NextButton
        dispatch={dispatch}
        answer={answer}
        index={index}
        numQuestion={numQuestion}
      />
    </>
  )}
  {status === 'finished' && 
    <FinishScreen 
      points={points} 
      maxPossiblePoints={maxPossiblePoints}
    >
  } {/* 👈🏽 */}
</Main>    
```
> Verify FinishScreen is imported.

##  Modify `NexButton` component - first and before last question have "Next" button:

1. Pass `index` and `numQuestions` as props:
2. use those props for a conditional

```js
const NextButton = ({ dispatch, answer, index, numQuestions }) => {
  if (answer === null) return null;
  if (index < numQuestions - 1)  {/* 👈🏽 */} 
    return (
      <button
        type="button"
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
};

export default NextButton;
```

## Modify `NexButton` component - last question has `"Finish"` button:
```js
const NextButton = ({ dispatch, answer, index, numQuestions }) => {
  if (answer === null) return null;
  if (index < numQuestions - 1)
    return (
      <button
        type="button"
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  if (index === numQuestions - 1)  {/* 👈🏽 */} 
    return (
      <button
        type="button"
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
};

export default NextButton;
```
### Modify the Reducer function - add `case: "finish"`:
```js
const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ... };
    case "dataFailed":
      return {...};
    case "start":
      return {...};
    case "newAnswer": {
      const question = state.questions.at(state.index); 
      return { ... };
    }
    case "nextQuestion":
      return { ... };
    case "finish":  // 👈🏽
      return {
        ...state,
        status: "finished"
      }  
    default:
      throw new Error("Action unknown");
  }
};
```

### Add emoji in `FinishScreen` component:
```js
const FinishScreen = ({ points, maxPossiblePoints }) => {
  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;

  if(percentage === 100) emoji = '🥇';
  if(percentage >=80 && percentage < 100) emoji = '🎉';
  if(percentage >= 50 && percentage <50) emoji = '🙃';
  if(percentage > 0 && percentage < 50) emoji = '🥴';
  if(percentage === 0) emoji = '🤦🏽‍♂️';

  return (
    <p className="result">
      <span>{emoji}</span> You scored <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)}%)
    </p>
  )
}

export default FinishScreen;
```

## Add `highscore` in `FinishScreen` component:
```js
const FinishScreen = ({ points, maxPossiblePoints }) => {
  const percentage = (points / maxPossiblePoints) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: X points)</p> {/*  👈🏽 */}
    </>
  )
}

export default FinishScreen;
```

### 1. Add `highscore` in `InitialState`:
```js
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0   // 👈🏽  
};

//adding "highscore" in this destructuring "state":
const [{ questions, status, index, answer, points, highscore* }, dispatch] = useReducer(reducer, initialState);
```

### 2. Adding `highscore` in `reducer` function for `case "finish":`
```js
const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ... };
    case "dataFailed":
      return {...};
    case "start":
      return {...};
    case "newAnswer": {
      const question = state.questions.at(state.index); 
      return { ... };
    }
    case "nextQuestion":
      return { ... };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:    // 👈🏽
          state.points > state.highscore ? state.points : state.highscore
      }  
    default:
      throw new Error("Action unknown");
  }
};
```
where:
- state.points: points after last question (current points)
- state.highscore: highscore for previous taking.

### 3. Send highscore in `FinishScreen` component:
1. In `Main` component `highscore` as props
```js
<Main>
  {status === "loading" && <Loader />}
  {status === "error" && <Error />}
  {status === "ready" && (
    <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
  )}
  {status === "active" && (
    <>
      <Progress
        index={index}
        numQuestions={numQuestions}
        points={points} 
        maxPossiblePoints={maxPossiblePoints}
      /> 
      <Question
        question={questions[index]}
        dispatch={dispatch}
        answer={answer}
      />
      <NextButton
        dispatch={dispatch}
        answer={answer}
        index={index}
        numQuestion={numQuestion}
      />
    </>
  )}
  {status === 'finished' && 
    <FinishScreen 
      points={points} 
      maxPossiblePoints={maxPossiblePoints}
      highscore={highscore} //* 👈🏽
    >
  } 
</Main>    
```

2. using `highscore` in `FinishScreen` component:
```js
const FinishScreen = ({ points, maxPossiblePoints, highscore }) => {
  const percentage = (points / maxPossiblePoints) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p> {/*  👈🏽 */}
    </>
  )
}

export default FinishScreen;
```

# Lecture 199: Restarting a Quiz

## Go to `NextButton` component and copy:
```js
  <button
    type="button"
    className="btn btn-ui"
    onClick={() => dispatch({ type: "finish" })}
  >
    Finish
  </button>
```

## Paste inside `FinishScreen` component:
```js
const FinishScreen = ({ points, maxPossiblePoints, highscore }) => {
  const percentage = (points / maxPossiblePoints) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p> {/*  👈🏽 */}
      <button       //  👈🏽 
        type="button"
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz!
      </button>
    </>
  )
}

export default FinishScreen;
```
## We need to add a `dispatch` as a new action `restart` and as a prop:
```js
const FinishScreen = ({ points, maxPossiblePoints, highscore, dispatch }) => {
  const percentage = (points / maxPossiblePoints) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p> {/*  👈🏽 */}
      <button       //  👈🏽 
        type="button"
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz!
      </button>
    </>
  )
}

export default FinishScreen;
```

### Add `dispatch` in `Main` component as props:
```js
<Main>
  {status === "loading" && <Loader />}
  {status === "error" && <Error />}
  {status === "ready" && (
    <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
  )}
  {status === "active" && (
    <>
      <Progress
        index={index}
        numQuestions={numQuestions}
        points={points} 
        maxPossiblePoints={maxPossiblePoints}
      /> 
      <Question
        question={questions[index]}
        dispatch={dispatch}
        answer={answer}
      />
      <NextButton
        dispatch={dispatch}
        answer={answer}
        index={index}
        numQuestion={numQuestion}
      />
    </>
  )}
  {status === 'finished' && 
    <FinishScreen 
      points={points} 
      maxPossiblePoints={maxPossiblePoints}
      highscore={highscore}
      dispatch={dispatch} //* 👈🏽
    >
  } 
</Main>    
```

## Add `case "restart":` inside reducer:

You have two ways:

> 1st Using InitialState:
```js
const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ... };
    case "dataFailed":
      return {...};
    case "start":
      return {...};
    case "newAnswer": {
      const question = state.questions.at(state.index); 
      return { ... };
    }
    case "nextQuestion":
      return { ... };
    case "finish":
      return {...}
    case "restart":
      return {
        ...initialState, 
        question: state.questions,
        status: "ready"
      }  
    default:
      throw new Error("Action unknown");
  }
};
```

> 2nd Using each state details:
```js
const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ... };
    case "dataFailed":
      return {...};
    case "start":
      return {...};
    case "newAnswer": {
      const question = state.questions.at(state.index); 
      return { ... };
    }
    case "nextQuestion":
      return { ... };
    case "finish":
      return {...}
    case "restart": 
      return {
        ...state,
        points: 0,
        index: 0,
        answer: null,
        status: "ready"
      }     
    default:
      throw new Error("Action unknown");
  }
};
```

# Lecture 200: Setting Up a Timer with useEffect

## Create `Footer` component which contains `Timer` and `NextButton` components:
```js
const Footer = ({ children }) => {
  return (
    <footer>
      {children}
    </footer>
  )
}

export default Footer;
```
> Then add `Footer` and `Timer` components in `Main` Component.

> Import them too!

```js
<Main>
  {status === "loading" && <Loader />}
  {status === "error" && <Error />}
  {status === "ready" && (
    <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
  )}
  {status === "active" && (
    <>
      <Progress
        index={index}
        numQuestions={numQuestions}
        points={points} 
        maxPossiblePoints={maxPossiblePoints}
      /> 
      <Question
        question={questions[index]}
        dispatch={dispatch}
        answer={answer}
      />
      <Footer> // 👈🏽
        <NextButton
          dispatch={dispatch}
          answer={answer}
          index={index}
          numQuestion={numQuestion}
        />
        {/* create Timer component*/}
        <Timer />  // 👈🏽
      </Footer>
    </>
  )}
  {status === 'finished' && 
    <FinishScreen 
      points={points} 
      maxPossiblePoints={maxPossiblePoints}
      highscore={highscore}
      dispatch={dispatch}
    >
  } 
</Main>    
```

## Create `Timer` component:
```js
const Timer = () => {
  return (
    <div className="timer">
      05:00
    </div>
  )
}

export default Timer;
```

### Add `useEffect` hook inside `Timer` component:
```js
const Timer = () => {

  // 👈🏽
  useEffect(() => {
    setInterval( () => {
      console.log('tick')
    }, 1000);
  }, [])

  return (
    <div className="timer">
      05:00
    </div>
  )
}

export default Timer;
```

### Add `secondsRemaining` with a testing value in Initial State:
```js
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 10   // 👈🏽  => 10 sec as example
};

//adding "secondsRemaining" in this destructuring "state":
const [{ questions, status, index, answer, points, highscore, secondsRemaining* }, dispatch] = useReducer(reducer, initialState);
```
### Add the new `case "tick":` in `reducer` function and the `dispatch` function action in `Timer`:

> in Main:
```js
const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ... };
    case "dataFailed":
      return {...};
    case "start":
      return {...};
    case "newAnswer": {
      const question = state.questions.at(state.index); 
      return { ... };
    }
    case "nextQuestion":
      return { ... };
    case "finish":
      return {...}
    case "restart": 
      return { ... }
    case "tick":   // 👈🏽
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1
      }       
    default:
      throw new Error("Action unknown");
  }
};
```
and 
```js
const Timer = ({ dispatch }) => {

  useEffect(() => {
    setInterval( () => {
      dispatch({type: 'tick'})
    }, 1000);
  }, [dispatch])   // 👈🏽

  return (
    <div className="timer">
      05:00
    </div>
  )
}

export default Timer;
```

### Send `dispatch` function and `secondsRemaining` in `Timer` component:
```js
<Main>
  {status === "loading" && <Loader />}
  {status === "error" && <Error />}
  {status === "ready" && (
    <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
  )}
  {status === "active" && (
    <>
      <Progress
        index={index}
        numQuestions={numQuestions}
        points={points} 
        maxPossiblePoints={maxPossiblePoints}
      /> 
      <Question
        question={questions[index]}
        dispatch={dispatch}
        answer={answer}
      />
      <Footer>
        <NextButton
          dispatch={dispatch}
          answer={answer}
          index={index}
          numQuestion={numQuestion}
        />
        <Timer      //*  👈🏽 
          dispatch={dispatch}
          secondsRemaining={secondsRemaining}
        />  
      </Footer>
    </>
  )}
  {status === 'finished' && 
    <FinishScreen 
      points={points} 
      maxPossiblePoints={maxPossiblePoints}
      highscore={highscore}
      dispatch={dispatch}
    >
  } 
</Main>    
```
and
```js
const Timer = ({ dispatch, secondsRemaining }) => {    // 👈🏽 

  useEffect(() => {
    setInterval( () => {
      dispatch({type: 'tick'})
    }, 1000);
  }, [dispatch])  

  return (
    <div className="timer">{secondsRemaining}</div> // 👈🏽 
  )
}

export default Timer;
```

Issue:
- Timer works however it continue decreasing beyond zero.


### Fixing the issue regarding the `secondsRemaining`:
```js
case "tick":
  return {
    ...state,
    secondsRemaining: state.secondsRemaining - 1,
    status: state.secondsRemaining === 0 ? "finished" : state.status,       // 👈🏽
  } 
```

Issue:
- time is still Zero even when user restart the quiz.

### Fixing the setInterval function:
```js
const Timer = ({ dispatch, secondsRemaining }) => {

  useEffect(() => {
    const id = setInterval( () => {    // 👈🏽   
      dispatch({type: 'tick'})
    }, 1000);

    return () => clearInterval(id)   // 👈🏽  
  }, [dispatch])  

  return (
    <div className="timer">{secondsRemaining}</div>
  )
}

export default Timer;
```

Issue: 
- Computing the amount of seconds according the amount of questions.

### Calculating the total secondsRemaining:

1. set `secondsRemaining` to `null`:
```js
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null   // 👈🏽
};

const [{ questions, status, index, answer, points, highscore, secondsRemaining* }, dispatch] = useReducer(reducer, initialState);
```

2. Calculate as user starts the game:
```js
const SECS_PER_QUESTION = 30;   // 👈🏽

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

const [{ questions, status, index, answer, points, highscore, secondsRemaining* }, dispatch] = useReducer(reducer, initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ... };
    case "dataFailed":
      return {...};
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,    // 👈🏽
      };
    case "newAnswer": {
      const question = state.questions.at(state.index); 
      return { ... };
    }
    case "nextQuestion":
      return { ... };
    case "finish":
      return {...}
    case "restart": 
      return { ... }
    case "tick": 
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      }       
    default:
      throw new Error("Action unknown");
  }
};
```

Issue:
- Enhace the timer format.

3. Enhance time format in `Timer` component:
```js
const Timer = ({ dispatch, secondsRemaining }) => {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const id = setInterval( () => {    // 👈🏽   
      dispatch({type: 'tick'})
    }, 1000);

    return () => clearInterval(id)   // 👈🏽  
  }, [dispatch])  

  return (
    <div className="timer">{mins < 10 && "0"}{mins}:{seconds < 10 && "0"}{seconds}</div>
  )
}

export default Timer;
```
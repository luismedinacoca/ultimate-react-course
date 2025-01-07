# React + Vite

since this array:

```javascript
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
```

Replace this code

```Javascript
<p className="message">
    Step {step}: {messages[step - 1]}
</p>
```

with this code

```javascript
<StepMessage step={step}>{messages[step - 1]}</StepMessage>
```

which the component code is:

```javascript
import PropTypes from "prop-types";

function StepMessage({ step, children }) {
  return (
    <p className="message">
      <h3>Step {step}:</h3>
      {children}
    </p>
  );
}

StepMessage.propTypes = {
  step: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};
```

```js
/*
INSTRUCTIONS / CONSIDERATIONS:

1. Let's implement a simple bank account! It's similar to the example that I used as an analogy to explain how useReducer works, but it's simplified (we're not using account numbers here)

2. Use a reducer to model the following state transitions: 

- openAccount, 
- deposit, 
- withdraw, 
- requestLoan, 
- payLoan, 
- closeAccount. 
Use the `initialState` below to get started.

3. All operations (expect for opening account) can only be performed if isActive is true. If it's not, just return the original state object. You can check this right at the beginning of the reducer

4. When the account is opened, isActive is set to true. There is also a minimum deposit amount of 500 to open an account (which means that the balance will start at 500)

5. Customer can only request a loan if there is no loan yet. If that condition is met, the requested amount will be registered in the 'loan' state, and it will be added to the balance. If the condition is not met, just return the current state

6. When the customer pays the loan, the opposite happens: the money is taken from the balance, and the 'loan' will get back to 0. This can lead to negative balances, but that's no problem, because the customer can't close their account now (see next point)

7. Customer can only close an account if there is no loan, AND if the balance is zero. If this condition is not met, just return the state. If the condition is met, the account is deactivated and all money is withdrawn. The account basically gets back to the initial state
*/
```

## Verify the `initialState`:
```js
const initialState = {
    balance: 0,
    loan: 0,
    isActive: false,
}
```

```js
// ******************** INTRUCTIONS ********************
/*
1. Let's implement a simple bank account! It's similar to the example that I used as an analogy to explain how useReducer works, but it's simplified (we're not using account numbers here)
*/
```

## Create `useReducer()` hook:
```js
const [state, dispatch] = useReducer(reducer, initialState);
```
> Destructure the `state`:
```js
const [{balance, loan, isActive}, dispatch] = useReducer(reducer, initialState);
```

## Create the `reducer` function:
```js
const reducer = (state, action) => {
    switch(action.type){
        ...
    }
}
```

```js
// ******************** INTRUCTIONS ********************
/*
2. Use a reducer to model the following state transitions: 
- openAccount, 
- deposit, 
- withdraw, 
- requestLoan, 
- payLoan, 
- closeAccount. 
Use the `initialState` above to get started.
*/
```


## Create the `reducer` function:
```js
const reducer = (state, action) => {
  switch(action.type){
    case "OPEN_ACCOUNT":
      return{...}
    case "DEPOSIT":
      return{...}
    case "WITHDRAW":
      return{...}
    case "REQUEST_LOAN":
      return{...}
    case "PAY_LOAN":
      return{...}
    case "CLOSE_ACCOUNT":
      return{...}
    default:
      throw new Error("Error");    
  }
}
```
## Replace `balance` and `loan` values in  JSX:
```js
export default function App() {
  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      ...
    <div>
  )
} 
```


```js
// ******************** INTRUCTIONS ********************
/*
3. All operations (expect for opening account) can only be performed if isActive is true. If it's not, just return the original state object. You can check this right at the beginning of the reducer
*/
```
## Replace the `disabled={false}` by `disabled={!isActive}`:
```js
return (
  <div className="App">
    <h1>useReducer Bank Account</h1>
    <p>Balance: X</p>
    <p>Loan: X</p>

    <p>
      <button onClick={() => {}} disabled={isActive}>
        Open account
      </button>
    </p>
    <p>
      <button onClick={() => {}} disabled={!isActive}>
        Deposit 150
      </button>
    </p>
    <p>
      <button onClick={() => {}} disabled={!isActive}>
        Withdraw 50
      </button>
    </p>
    <p>
      <button onClick={() => {}} disabled={!isActive}>
        Request a loan of 5000
      </button>
    </p>
    <p>
      <button onClick={() => {}} disabled={!isActive}>
        Pay loan
      </button>
    </p>
    <p>
      <button onClick={() => {}} disabled={!isActive}>
        Close account
      </button>
    </p>
  </div>
);
```
> Except "Open Account" which it keeps in `disabled={isActive}`

## Replace each `<button onClick={() => {}}>` by its correspondence dispatch action.
```js
return (
  <div className="App">
    <h1>useReducer Bank Account</h1>
    <p>Balance: X</p>
    <p>Loan: X</p>

    <p>
      <button onClick={() => dispatch({type: "OPEN_ACCOUNT"})} disabled={isActive}>
        Open account
      </button>
    </p>
    <p>
      <button onClick={() => dispatch({type: "DEPOSIT"})} disabled={!isActive}>
        Deposit 150
      </button>
    </p>
    <p>
      <button onClick={() => dispatch({type: "WITHDRAW"})} disabled={!isActive}>
        Withdraw 50
      </button>
    </p>
    <p>
      <button onClick={() => dispatch({type: "REQUEST_LOAN"})} disabled={!isActive}>
        Request a loan of 5000
      </button>
    </p>
    <p>
      <button onClick={() => dispatch({type: "PAY_LOAN"})} disabled={!isActive}>
        Pay loan
      </button>
    </p>
    <p>
      <button onClick={() => dispatch({type: "CLOSE_ACCOUNT"})} disabled={!isActive}>
        Close account
      </button>
    </p>
  </div>
);
```

```js
// ******************** INTRUCTIONS ********************
/*
4. When the account is opened, isActive is set to true. There is also a minimum deposit amount of 500 to open an account (which means that the balance will start at 500)
*/
```
## Add logic in `case "OPEN_ACCOUNT":` action.type:
```js
const reducer = (state, action) => {
  switch(action.type){
    case "OPEN_ACCOUNT":
      return{
        ...state,
        isActive: true,
        balance: 500,
      }
    case "DEPOSIT":
      return{...}
    case "WITHDRAW":
      return{...}
    case "REQUEST_LOAN":
      return{...}
    case "PAY_LOAN":
      return{...}
    case "CLOSE_ACCOUNT":
      return{...}
    default:
      throw new Error("Error");    
  }
}
```
> Visit [app URL](http://localhost:5173)

## Complete the same basic logic for `case "DEPOSIT"` and `case "WITHDRAW":`
```js
const reducer = (state, action) => {
  switch(action.type){
    case "OPEN_ACCOUNT":
      return{
        ...state,
        isActive: true,
        balance: 500,
      }
    case "DEPOSIT":
      return{
        ...state,
        balance: state.balance + action.payload,
      }
    case "WITHDRAW":
      return{
        ...state,
        balance: state.balance - action.payload,
      }
    case "REQUEST_LOAN":
      return{...}
    case "PAY_LOAN":
      return{...}
    case "CLOSE_ACCOUNT":
      return{...}
    default:
      throw new Error("Error");    
  }
}
```
## Complete same logic for each button:
```js
return (
  <div className="App">
    <h1>useReducer Bank Account</h1>
    <p>Balance: X</p>
    <p>Loan: X</p>

    <p>
      <button onClick={() => dispatch({type: "OPEN_ACCOUNT"})} disabled={isActive}>
        Open account
      </button>
    </p>
    <p>
      <button onClick={() => dispatch({type: "DEPOSIT", payload: 150})} disabled={!isActive}>
        Deposit 150
      </button>
    </p>
    <p>
      <button onClick={() => dispatch({type: "WITHDRAW", payload: 50})} disabled={!isActive}>
        Withdraw 50
      </button>
    </p>
    <p>
      <button onClick={() => dispatch({type: "REQUEST_LOAN"})} disabled={!isActive}>
        Request a loan of 5000
      </button>
    </p>
    <p>
      <button onClick={() => dispatch({type: "PAY_LOAN"})} disabled={!isActive}>
        Pay loan
      </button>
    </p>
    <p>
      <button onClick={() => dispatch({type: "CLOSE_ACCOUNT"})} disabled={!isActive}>
        Close account
      </button>
    </p>
  </div>
);
```

## Security messures:
```js
const reducer = (state, action) => {
  if(!state.isActive && action.type !== "OPEN_ACCOUNT") return state;
  switch(action.type){
    case "OPEN_ACCOUNT":
      return{
        ...state,
        isActive: true,
        balance: 500,
      }
    case "DEPOSIT":
      return{
        ...state,
        balance: state.balance + action.payload,
      }
    case "WITHDRAW":
      return{
        ...state,
        balance: state.balance - action.payload,
      }
    case "REQUEST_LOAN":
      return{...}
    case "PAY_LOAN":
      return{...}
    case "CLOSE_ACCOUNT":
      return{...}
    default:
      throw new Error("Error");    
  }
}
```
> Test: changing `disabled={!isActive}` by `disabled={false}`:
```js
<p>
  <button onClick={() => dispatch({type: "DEPOSIT", payload: 150})} disabled={false}>
    Deposit 150
  </button>
</p>
```

```js
// ******************** INTRUCTIONS ********************
/*
5. Customer can only request a loan if there is no loan yet. If that condition is met, the requested amount will be registered in the 'loan' state, and it will be added to the balance. If the condition is not met, just return the current state
*/
```
## Loan situation:
```js
const reducer = (state, action) => {
  if(!state.isActive && action.type !== "OPEN_ACCOUNT") return state;
  switch(action.type){
    case "OPEN_ACCOUNT":
      return{
        ...state,
        isActive: true,
        balance: 500,
      }
    case "DEPOSIT":
      return{
        ...state,
        balance: state.balance + action.payload,
      }
    case "WITHDRAW":
      return{
        ...state,
        balance: state.balance - action.payload,
      }
    case "REQUEST_LOAN":
      //if(state.loan > 0) return null; // it always returns "state".
      if(state.loan > 0) return state;
      return{
        ...state,
        loan: state.loan + action.payload,
        balance: state.balance + action.payload,
      }
    case "PAY_LOAN":
      return{...}
    case "CLOSE_ACCOUNT":
      return{...}
    default:
      throw new Error("Error");    
  }
}
```

```js
// ******************** INTRUCTIONS ********************
/*
6. When the customer pays the loan, the opposite happens: the money is taken from the balance, and the 'loan' will get back to 0. This can lead to negative balances, but that's no problem, because the customer can't close their account now (see next point)
*/
```

## Paying a Loan:
```js
const reducer = (state, action) => {
  if(!state.isActive && action.type !== "OPEN_ACCOUNT") return state;
  switch(action.type){
    case "OPEN_ACCOUNT":
      return{
        ...state,
        isActive: true,
        balance: 500,
      }
    case "DEPOSIT":
      return{
        ...state,
        balance: state.balance + action.payload,
      }
    case "WITHDRAW":
      return{
        ...state,
        balance: state.balance - action.payload,
      }
    case "REQUEST_LOAN":
      //if(state.loan > 0) return null; // it always returns "state".
      if(state.loan > 0) return state;
      return{
        ...state,
        loan: state.loan + action.payload,
        balance: state.balance + action.payload,
      }
    case "PAY_LOAN":
      return{
        ...state,
        balanace: state.balance - state.loan,
        loan: 0,
      }
    case "CLOSE_ACCOUNT":
      return{...}
    default:
      throw new Error("Error");    
  }
}
```

```js
// ******************** INTRUCTIONS ********************
/*
7. Customer can only close an account if there is no loan, AND if the balance is zero. If this condition is not met, just return the state. If the condition is met, the account is deactivated and all money is withdrawn. The account basically gets back to the initial state
*/
```

## Closing the account:
```js
const reducer = (state, action) => {
  if(!state.isActive && action.type !== "OPEN_ACCOUNT") return state;
  switch(action.type){
    case "OPEN_ACCOUNT":
      return{
        ...state,
        isActive: true,
        balance: 500,
      }
    case "DEPOSIT":
      return{
        ...state,
        balance: state.balance + action.payload,
      }
    case "WITHDRAW":
      return{
        ...state,
        balance: state.balance - action.payload,
      }
    case "REQUEST_LOAN":
      //if(state.loan > 0) return null; // it always returns "state".
      if(state.loan > 0) return state;
      return{
        ...state,
        loan: state.loan + action.payload,
        balance: state.balance + action.payload,
      }
    case "PAY_LOAN":
      return{
        ...state,
        balanace: state.balance - state.loan,
        loan: 0,
      }
    case "CLOSE_ACCOUNT":
      if(state.loan > 0 || state.balance !== 0) return state,
      return initialState,
    default:
      throw new Error("Error");    
  }
}
```
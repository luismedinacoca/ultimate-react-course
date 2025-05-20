import { useReducer } from "react";
import "./styles.css";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false
};

export default function App() {

  const reducer = (state, action) => {
    if(!state.isActive && action.type !== "OPEN_ACCOUNT") return state;
    switch (action.type) {
      case 'OPEN_ACCOUNT':
        return {
          ...state,
          balance: 500,
          isActive: true,
        };
      case 'DEPOSIT':
        return {
          ...state,
          balance: state.balance + action.payload,
        };
      case 'WITHDRAW':
        return {
          ...state,
          balance: state.balance - action.payload,
        }; 
      case 'REQUEST_LOAN':
        if(state.loan > 0)  return state;
        return {
          ...state,
          loan: state.loan + action.payload,
          balance: state.balance + action.payload,
        }; 
      case 'PAY_LOAN':
        if(state.loan > state.balance) return state;
        return {
          ...state,
          loan: 0,
          balance: state.balance - state.loan
        }; 
      case 'CLOSE_ACCOUNT':
        if(state.loan > 0 || state.balance !== 0) return state;
        return initialState; 
      default:
        throw new Error("Error");
    }
  };

  const [{balance, loan, isActive}, dispatch] = useReducer(reducer, initialState);

  
  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

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
        <button onClick={() => dispatch({type:"REQUEST_LOAN", payload: 5000})} disabled={!isActive}>
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
}
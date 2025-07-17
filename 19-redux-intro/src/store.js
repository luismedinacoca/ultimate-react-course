import {createStore} from "redux";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      }
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      }
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance:  state.balance + action.payload.amount,
      }
    case "account/payLoan":
      return {
        ...state,
        loanPurpose: "",
        loan: 0,
        balance: state.balance - state.loan,
      }
    default:
      return state;
  }
}

const store = createStore(reducer);
console.log("hey Redux!");
/*
console.log("Type: Account/deposit");
store.dispatch({ type: "account/deposit", payload: 500 });
console.log(store.getState());
console.log("Type: Account/withdraw");
store.dispatch({ type: "account/withdraw", payload: 200 });
console.log(store.getState());
console.log("Type: Account/requestLoan");
store.dispatch({ 
  type: "account/requestLoan", 
  payload: {
    amount: 1500,
    purpose: "Buy a car"
  } 
});
console.log(store.getState());
console.log("Type: Account/payLoan");
store.dispatch({ type: "account/payLoan" });
console.log(store.getState());
*/


/*********** 1. Deposit US$500 ***********/
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
store.dispatch(deposit(500));
console.log(store.getState());


/*********** 2. Withdraw US$200 ***********/
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
store.dispatch(withdraw(200));
console.log(store.getState());


/*********** 3. Request a Loan US$1500 ***********/
function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}
store.dispatch(requestLoan(1500, "Buy a car"));
console.log(store.getState());



/*********** 3. Request a Loan US$1500 ***********/
function payLoan() {
  return { type: "account/payLoan" };
}
store.dispatch(payLoan());
console.log(store.getState());


import store from "../../store.js";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

export default function accountReducer(state = initialStateAccount, action) {
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

/*********** 1. Deposit US$500 ***********/
export function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
//store.dispatch(deposit(500));
//console.log(store.getState());


/*********** 2. Withdraw US$200 ***********/
export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
//store.dispatch(withdraw(200));
//console.log(store.getState());


/*********** 3. Request a Loan US$1500 ***********/
export function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}
//store.dispatch(requestLoan(1500, "Buy a car"));
//console.log(store.getState());



/*********** 4. Pay back a Loan US$1500 ***********/
export function payLoan() {
  return { type: "account/payLoan" };
}
//store.dispatch(payLoan());
//console.log(store.getState());
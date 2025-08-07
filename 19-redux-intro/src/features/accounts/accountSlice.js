import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
    },
    withdraw(state, action) {
      state.balance = state.balance - action.payload;
    },
    requestLoan: {
      //prepare is a function that returns an object with the payload 👈🏽 👀 👀
      prepare(amount, purpose) {
        return { 
          payload: { amount, purpose } 
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return; //if already have a loan, don't request another one 👀
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state, action) {
      /*
      👉🏽 Try  this commented code first: you will see  payLoan()is not working, due to state.loan = 0 is first one!
      state.loan = 0;
      state.balance = state.balance - state.loan;
      state.loanPurpose = "";
       */
      state.balance = state.balance - state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
  }
})

console.log(accountSlice);
//console.log(requestLoan(15000, "protesis"));

export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;
export default accountSlice.reducer;

/*
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export default function accountReducer(state = initialStateAccount, action) {
  switch(action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
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
    case "account/convertingCurrency":
      return {
        ...state,
        isLoading: true,
      }
    default:
      return state;
  }
}

/*********** 1. Deposit US$500 *********** /
export function deposit(amount, currency) {
  if(currency === "USD") return { type: "account/deposit", payload: amount };

  //function for thunk middleware:
  return async function(dispatch, getState){
    dispatch({type: "account/convertingCurrency"});
    console.log("getState:",getState());
    //API call
    const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
    const data = await res.json();
    const converted = data.rates.USD;
    console.log("converted:", converted);
    //return action
    dispatch({type: "account/deposit", payload: converted});
  }
}

/*********** 2. Withdraw US$200 *********** 
export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

/*********** 3. Request a Loan US$1500 *********** /
export function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}


/*********** 4. Pay back a Loan US$1500 *********** /
export function payLoan() {
  return { type: "account/payLoan" };
}*/

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

/*********** 1. Deposit US$500 ***********/
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
    //return action
    dispatch({type: "account/deposit", payload: converted});
  }
}

/*********** 2. Withdraw US$200 ***********/
export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

/*********** 3. Request a Loan US$1500 ***********/
export function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}


/*********** 4. Pay back a Loan US$1500 ***********/
export function payLoan() {
  return { type: "account/payLoan" };
}
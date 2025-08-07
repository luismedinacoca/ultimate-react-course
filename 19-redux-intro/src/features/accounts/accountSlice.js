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
      //  due to  added convertingCurrency action 👀
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance = state.balance - action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { 
          payload: { amount, purpose } 
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance = state.balance - state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state){
      state.isLoading = true;
    },
  }
})

// ✅ ******* Do not export deposit, because it is a thunk function *******
// export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

/*********** ✅ Thunk function ***********/
export function deposit(amount, currency) {
  // Verify the action type is "account/deposit" as expected:
  if(currency === "USD") return { type: "account/deposit", payload: amount };

  // ✅ function for thunk middleware: ==> Need to add the convertingCurrency action to the state
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

export default accountSlice.reducer;
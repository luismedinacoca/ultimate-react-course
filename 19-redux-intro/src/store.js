import {combineReducers, createStore} from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
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

function customerReducer(state = initialStateCustomer, action) {
  switch(action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      }
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      }
    default: return state;  
  }
}

//const store = createStore(accountReducer);
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);

console.log("hey Redux!");

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



/*********** 4. Pay back a Loan US$1500 ***********/
function payLoan() {
  return { type: "account/payLoan" };
}
store.dispatch(payLoan());
console.log(store.getState());


/*********** 5. Create a Customer ***********/
function createCustomer(fullName, nationalID){
  return {
    type: "customer/createCustomer", 
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  };
}
store.dispatch(createCustomer("John Doe", "1234567890"));
console.log(store.getState());

/*********** 6. Update Customer ***********/
function updateName(fullName){
  return {type: "customer/updateName", payload: fullName}
}
store.dispatch(updateName("Jonas schmedtmann"));
console.log(store.getState());
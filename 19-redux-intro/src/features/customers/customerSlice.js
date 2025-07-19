
import store from "../../store.js";

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};


export default function customerReducer(state = initialStateCustomer, action) {
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

/*********** 5. Create a Customer ***********/
export function createCustomer(fullName, nationalID){
  return {
    type: "customer/createCustomer", 
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  };
}
//store.dispatch(createCustomer("John Doe", "1234567890"));
//console.log(store.getState());

/*********** 6. Update Customer ***********/
export function updateName(fullName){
  return {type: "customer/updateName", payload: fullName}
}
//store.dispatch(updateName("Jonas schmedtmann"));
//console.log(store.getState());
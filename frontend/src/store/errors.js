import { combineReducers } from "redux";
import { sessionErrorsReducer } from "./session"
import { suggestionErrorsReducer } from "./suggestions";
import { reviewErrorsReducer } from "./reviews";
import { productErrorsReducer } from "./products";

export default combineReducers({
  session: sessionErrorsReducer,
  suggestions: suggestionErrorsReducer,
  reviews: reviewErrorsReducer,
  products: productErrorsReducer
})
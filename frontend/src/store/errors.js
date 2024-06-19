import { combineReducers } from "redux";
import { sessionErrorsReducer } from "./session"
import { suggestionErrorsReducer } from "./suggestions";
import { reviewErrorsReducer } from "./reviews";

export default combineReducers({
  session: sessionErrorsReducer,
  suggestions: suggestionErrorsReducer,
  reviews: reviewErrorsReducer
})
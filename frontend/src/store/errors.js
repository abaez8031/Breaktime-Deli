import { combineReducers } from "redux";
import { sessionErrorsReducer } from "./session"
import { suggestionsErrorsReducer } from "./suggestions";
import { reviewsErrorReducer } from "./reviews";

export default combineReducers({
  session: sessionErrorsReducer,
  suggestions: suggestionsErrorsReducer,
  reviews: reviewsErrorReducer
})
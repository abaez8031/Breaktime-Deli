import { combineReducers } from "redux";
import { sessionErrorsReducer } from "./session"
import { suggestionsErrorsReducer } from "./suggestions";

export default combineReducers({
  session: sessionErrorsReducer,
  suggestions: suggestionsErrorsReducer
})
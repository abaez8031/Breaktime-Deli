import jwtFetch from "./jwt"

const RECEIVE_SUGGESTIONS = "suggestions/RECEIVE_SUGGESTIONS"
const RECEIVE_SUGGESTION = "suggestions/RECEIVE_SUGGESTION"
const REMOVE_SUGGESTION = "suggestions/REMOVE_SUGGESTION"
const RECEIVE_SUGGESTION_ERRORS = "suggestions/RECEIVE_SUGGESTION_ERRORS"
const CLEAR_SUGGESTION_ERRORS = "suggestions/CLEAR_SUGGESTION_ERRORS"

const receiveSuggestionErrors = errors => ({
  type: RECEIVE_SUGGESTION_ERRORS,
  errors
});

export const clearSuggestionErrors = () => ({
  type: CLEAR_SUGGESTION_ERRORS
})

const receiveSuggestions = suggestions => ({
  type: RECEIVE_SUGGESTIONS,
  suggestions
})

const receiveSuggestion = suggestion => ({
  type: RECEIVE_SUGGESTION,
  suggestion
})

const removeSuggestion = id => ({
  type: REMOVE_SUGGESTION,
  id
})

export const fetchAllSuggestions = () => async dispatch => {
  try {
    const res = await jwtFetch("/api/suggestions")
    const suggestions = await res.json();
    dispatch(receiveSuggestions(suggestions))
  } catch(err) {
    const res = await err.json();
    dispatch(receiveSuggestionErrors(res.errors))
  }
}

export const createSuggestion = suggestion => async dispatch => {
  try {
    const res = await jwtFetch("/api/suggestions", {
      method: "POST",
      body: JSON.stringify(suggestion),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json();
    dispatch(receiveSuggestion(data))
  } catch(err) {
    const res = await err.json();
    dispatch(receiveSuggestionErrors(res.errors))
  }
}


export const deleteSuggestion = id => async dispatch => {
  try {
    const res = await jwtFetch(`/api/suggestions/${id}`, {
      method: "DELETE"
    });
    if (res.ok) {
      dispatch(removeSuggestion(id))
    } else {
      const err = await res.json();
      dispatch(receiveSuggestionErrors(err.errors))
    }
  } catch (err) {
  const res = await err.json()
  dispatch(receiveSuggestionErrors(res))
  }
}

// export const updateSuggestion = suggestion => async dispatch => {
//   try{
//     const res = await jwtFetch(`/api/suggestions/${suggestion._id}`, {
//       method: "POST",
//       body: JSON.stringify(suggestion),
//       headers: {
//         "Content-Type": "application/json"
//       }
//     });
    
//   } catch(err) {
//     // handle error
//   }
// }

const suggestionsReducer = (initialState = {}, action) => {
  switch(action.type) {
    case RECEIVE_SUGGESTIONS:
      return {...initialState, ...action.suggestions}
    case RECEIVE_SUGGESTION:
      return {...initialState, [action.suggestion._id]: action.suggestion}
    case REMOVE_SUGGESTION:
      const newState = {...initialState};
      delete newState[action.id];
      return newState;
    default:
      return initialState;
  }
}

export const suggestionErrorsReducer = (initialState = null, action) => {
  switch (action.type) {
    case RECEIVE_SUGGESTION_ERRORS:
      return action.errors;
    case RECEIVE_SUGGESTION:
    case CLEAR_SUGGESTION_ERRORS:
      return null
    default:
      return initialState;
  }
}

export default suggestionsReducer;
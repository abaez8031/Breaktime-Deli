import jwtFetch from "./jwt";

const RECEIVE_USER = "session/RECEIVE_USER";
const RECEIVE_SESSION_ERRORS = "session/RECEIVE_SESSION_ERRORS";
const CLEAR_SESSION_ERRORS = "session/CLEAR_SESSION_ERRORS";
const REMOVE_USER = "session/REMOVE_USER";

const receiveUser = user => ({
  type: RECEIVE_USER,
  user
})

const removeUser = () => ({
  type: REMOVE_USER
})

const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
})

export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS
})

const startSession = (userInfo,route) => async dispatch => {
  try {
    const res = await jwtFetch(route, {
      method: "POST",
      body: JSON.stringify(userInfo)
    })
    const { user,token } = await res.json()
    localStorage.setItem("jwtToken", token)
    return dispatch(receiveUser(user))
  } catch(err) {
    const res = await err.json();
    if(res.statusCode === 400) {
      return dispatch(receiveErrors(res.errors))
    }
  }
}

export const signup = user => startSession(user, "api/users/register");
export const login = user => startSession(user, "api/users/login");
export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  dispatch(removeUser())
}

const initialState = { user: null }
const sessionReducer = (state = initialState, action) => {
  switch(action.type) {
    case RECEIVE_USER:
      return {...state, user: action.user}
    case REMOVE_USER:
      return initialState;
    default:
      return state;
  }
}
export const sessionErrorsReducer = (state = null, action) => {
  switch(action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors
    case RECEIVE_USER:
    case CLEAR_SESSION_ERRORS:
      return null
    default:
      return state
  }
}
export default sessionReducer;
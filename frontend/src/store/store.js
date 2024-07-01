import {createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import session from "./session";
import suggestions from "./suggestions"
import errors from "./errors";
import reviews from "./reviews"
import products from "./products"
import cart from "./cart"
import orders from "./orders";

const rootReducer = combineReducers({
  session,
  suggestions,
  reviews,
  products,
  errors,
  cart,
  orders
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;
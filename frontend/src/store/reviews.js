// Create Reviews slice of state, reducers, thunk action creators
import jwtFetch from "./jwt"

const RECEIVE_REVIEWS = "reviews/RECEIVE_REVIEWS" // FETCH ALL REVIEWS
const RECEIVE_REVIEW = "reviews/RECEIVE_REVIEW" // CREATE/UPDATE REVIEW
const REMOVE_REVIEW = "reviews/REMOVE_REVIEW" // DELETE REVIEW

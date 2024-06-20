// Create Reviews slice of state, reducers, thunk action creators
import jwtFetch from "./jwt"

const RECEIVE_REVIEWS = "reviews/RECEIVE_REVIEWS" // FETCH ALL REVIEWS
const RECEIVE_REVIEW = "reviews/RECEIVE_REVIEW" // CREATE/UPDATE REVIEW
const REMOVE_REVIEW = "reviews/REMOVE_REVIEW" // DELETE REVIEW
const RECEIVE_REVIEW_ERRORS = "reviews/RECEIVE_REVIEW_ERRORS"
const CLEAR_REVIEW_ERRORS = "reviews/CLEAR_REVIEW_ERRORS"

const receiveReview = review => ({
  type: RECEIVE_REVIEW,
  review
})

const receiveReviews = reviews => ({
  type: RECEIVE_REVIEWS,
  reviews
})

const removeReview = id => ({
  type: REMOVE_REVIEW,
  id
})

const receiveReviewErrors = errors => ({
  type: RECEIVE_REVIEW_ERRORS,
  errors
})

export const clearReviewErrors = () => ({
  type: CLEAR_REVIEW_ERRORS
})

export const updateReview = review => async dispatch => {
  try {
    const res = await jwtFetch(`/api/reviews/${review._id}`, {
      method: "PATCH",
      body: JSON.stringify(review),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = res.json();
    dispatch(receiveReview(data))
  } catch(err) {
    const res = await err.json();
    dispatch(receiveReviewErrors(res.errors))
  }
}

export const createReview = review => async dispatch => {
  try {
    const res = await jwtFetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify(review),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json();
    dispatch(receiveReview(data))
  } catch (err) {
    const res = await err.json();
    dispatch(receiveReviewErrors(res.errors))
  }
}

export const fetchAllReviews = () => async dispatch => {
  try {
    const res = await jwtFetch('/api/reviews');
    const data = await res.json();
    dispatch(receiveReviews(data))
  } catch(err) {
    const res = await err.json();
    dispatch(receiveReviewErrors(res.errors))
  }
}

export const deleteReview = id => async dispatch => {
  try {
    const res = await jwtFetch(`/api/reviews/${id}`, {
      method: "DELETE"
    })
    if (res.ok) dispatch(removeReview(id))
  } catch(err) {
    const res = await err.json();
    dispatch(receiveReviewErrors(res.errors))
  }
}


const reviewsReducer = (initialState = {}, action) => {
  switch(action.type) {
    case RECEIVE_REVIEWS:
      const reviews = {};
      action.reviews.forEach(review => {
        reviews[review._id] = review;
      });
      return {...initialState, ...reviews}
    case RECEIVE_REVIEW:
      return {...initialState, [action.review._id]: action.review}
    case REMOVE_REVIEW:
      const newState = {...initialState}
      delete newState[action.id]
      return newState
    default:
      return initialState
  }
}

export const reviewErrorsReducer = (initialState = null, action) => {
  switch(action.type) {
    case RECEIVE_REVIEW_ERRORS:
      return action.errors
    case CLEAR_REVIEW_ERRORS:
    case RECEIVE_REVIEW:
      return null
    default:
      return initialState
  }
}

export default reviewsReducer;
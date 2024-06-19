// Create Reviews slice of state, reducers, thunk action creators
// import jwtFetch from "./jwt"

// const RECEIVE_REVIEWS = "reviews/RECEIVE_REVIEWS" // FETCH ALL REVIEWS
// const RECEIVE_REVIEW = "reviews/RECEIVE_REVIEW" // CREATE/UPDATE REVIEW
// const REMOVE_REVIEW = "reviews/REMOVE_REVIEW" // DELETE REVIEW

// const receiveReview = review => ({
//   type: RECEIVE_REVIEW,
//   review
// })

// const receiveReviews = reviews => ({
//   type: RECEIVE_REVIEWS,
//   reviews
// })

// const removeReview = id => ({
//   type: REMOVE_REVIEW,
//   id
// })

// export const updateReview = review => async dispatch => {
//   try {
//     const res = await jwtFetch(`/api/reviews/${review._id}`, {
//       method: "PATCH",
//       body: JSON.stringify(review),
//       headers: {
//         "Content-Type": "application/json"
//       }
//     })
//     const data = res.json();
//     dispatch(receiveReview(data))
//   } catch(err) {
//     // handle error
//   }
// }

// export const createReview = review => async dispatch => {
//   try {
//     const res = await jwtFetch("/api/reviews", {
//       method: "POST",
//       body: JSON.stringify(review),
//       headers: {
//         "Content-Type": "application/json"
//       }
//     })
//     const data = await res.json();
//     dispatch(receiveReview(data))
//   } catch (err) {
//     // handle error
//   }
// }

// export const fetchAllReviews = () => async dispatch => {
//   try {
//     const res = await jwtFetch('/api/reviews');
//     const data = await res.json();
//     dispatch(receiveReviews(data))
//   } catch(err) {
//     //handle errors
//   }
// }

// export const deleteReview = id => async dispatch => {
//   try {
//     const res = await jwtFetch(`/api/reviews/${id}`, {
//       method: "DELETE"
//     })
//     if (res.ok) dispatch(removeReview(id))
//   } catch(err) {
//     // handle errors
//   }
// }

// create reviewsReducer
// create reviewsErrorReducer
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearReviewErrors, updateReview } from "../../../store/reviews";

const EditReviewForm = ({reviewBeingUpdated}) => {
  const [text, setText] = useState(reviewBeingUpdated.text);
  const [rating, setRating] = useState(reviewBeingUpdated.rating);
  const [errorsCleared, setErrorsCleared] = useState(false);
  const errors = useSelector(state => state.errors.reviews)
  const dispatch = useDispatch();

  const clearErrorsOnce = () => {
    if (!errorsCleared) {
      dispatch(clearReviewErrors());
      setErrorsCleared(true);
    }
  };

  const handleStarClick = (rating) => {
    setRating(rating)
    clearErrorsOnce();
  }

  const handleTextChange = (e) => {
      setText(e.target.value)
      clearErrorsOnce();
  }

  const handleSubmit = () => {
    dispatch(updateReview({
      ...reviewBeingUpdated,
      text,
      rating
    }))
  }

  return (
    <>
    <div className="review-form-container">
      <form className="review-form" onSubmit={handleSubmit}>
      <div className="errors">{errors?.rating}</div>
      <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= rating ? "gold" : ""}`}
                onClick={() => handleStarClick(star)}
              >
                &#9733;
              </span>
            ))}
          </div>
      <div className="errors">{errors?.text}</div>
      <textarea value={text} onChange={handleTextChange}className="review-form-text"/>
        <div className="errors">{errors?.userId}</div>
      <button className="submit-review-btn" type="submit">Update Review</button>
      </form>
    </div>
    </>
  )
}

export default EditReviewForm;
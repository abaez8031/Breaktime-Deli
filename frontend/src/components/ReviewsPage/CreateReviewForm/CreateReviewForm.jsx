import { useState, useEffect } from "react";
import "./CreateReviewForm.css"
import { useDispatch, useSelector } from "react-redux";
import { clearReviewErrors, createReview } from "../../../store/reviews";

const CreateReviewForm = ({userId}) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const errors = useSelector(state => state.errors.reviews)
  const dispatch = useDispatch();


  const handleStarClick = (rating) => {
    setRating(rating)
    dispatch(clearReviewErrors())
  }

  const handleTextChange = (e) => {
      setText(e.target.value)
      dispatch(clearReviewErrors())
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReview({userId, text, rating}))
  }

  useEffect(() => {
    return () => {
      dispatch(clearReviewErrors())
    }
  }, [dispatch])

  return (
    // add logic to dispatch createReview when button is clicked
    <>
    <div className="create-review-header-container">
    <h2 className="create-review-header">Give us your honest opinion!</h2>
    </div>
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
      <button className="submit-review-btn" type="submit">Create Review</button>
      </form>
    </div>
    </>
  )
}

export default CreateReviewForm;
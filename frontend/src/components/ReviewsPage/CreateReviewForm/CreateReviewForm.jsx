import { useState } from "react";
import "./CreateReviewForm.css"

const CreateReviewForm = () => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);

  const handleStarClick = (rating) => {
    setRating(rating)
  }

  return (
    // style button
    // add logic to dispatch createReview when button is clicked
    <>
    <div className="create-review-header-container">
    <h2 className="create-review-header">Give us your honest opinion!</h2>
    </div>
    <div className="review-form-container">
      <form className="review-form">
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
      <textarea value={text} onChange={(e) => {
        setText(e.target.value)
      }}className="review-form-text"/>
      <button type="submit">Create Review</button>
      </form>
    </div>
    </>
  )
}

export default CreateReviewForm;
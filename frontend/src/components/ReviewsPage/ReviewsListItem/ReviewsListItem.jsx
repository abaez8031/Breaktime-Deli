import "./ReviewsListItem.css"
import { formatTime } from "../../../utils/utils";
import { useDispatch } from "react-redux";
import { deleteReview } from "../../../store/reviews";

const ReviewsListItem = ({userId, review, setIsUpdatingReview, setReviewBeingUpdated}) => {
  const dispatch = useDispatch();
  const handleDeleteBtnClick = () => {
    dispatch(deleteReview(review._id))
  }
  const handleUpdateBtnClick = () => {
    setIsUpdatingReview(true);
    setReviewBeingUpdated(review)
  }
  return (
    <div className="reviews-list-item-container">
      <li className="review-list-stars">{[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`review-list-star ${star <= review.rating ? "gold" : ""}`}
              >
                &#9733;
              </span>
            ))}</li>
      <li className="reviews-item-username">{review.userId.username} says:</li>
      <li className="reviews-item-text"><p>"{review.text}"</p>{review.userId._id === userId && <button className="review-btn" onClick={handleUpdateBtnClick}>Update Review</button>}</li>
      <li className="reviews-item-created"><p>{formatTime(review.createdAt)}</p>{review.userId._id === userId && <button className="review-btn" onClick={handleDeleteBtnClick}>Delete Review</button>}</li>
    </div>
  )
}

export default ReviewsListItem;
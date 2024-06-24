import "./ReviewsListItem.css"
import { formatTime } from "../../../utils/utils";
import { useDispatch } from "react-redux";
import { deleteReview } from "../../../store/reviews";

const ReviewsListItem = ({userId, review, setIsUpdatingReview}) => {
  const dispatch = useDispatch();
  const handleDeleteBtnClick = () => {
    dispatch(deleteReview(review._id))
  }
  const handleUpdateBtnClick = () => {
    setIsUpdatingReview(true)
  }
  return (
    <div className="reviews-list-item-container">
      <li className="reviews-item-username">{review.userId.username} says:</li>
      <li className="reviews-item-text"><p>"{review.text}"</p>{review.userId._id === userId && <button className="review-btn" onClick={handleUpdateBtnClick}>Update Review</button>}</li>
      <li className="reviews-item-created"><p>{formatTime(review.createdAt)}</p>{review.userId._id === userId && <button className="review-btn" onClick={handleDeleteBtnClick}>Delete Review</button>}</li>
    </div>
  )
}

export default ReviewsListItem;
import "./ReviewsListItem.css"
import { formatTime } from "../../../utils/utils";
import { useDispatch } from "react-redux";
import { deleteReview } from "../../../store/reviews";

const ReviewsListItem = ({userId, review}) => {
  const dispatch = useDispatch();
  const handleDeleteBtnClick = () => {
    dispatch(deleteReview(review._id))
  }
  return (
    <div className="reviews-list-item-container">
      <li className="reviews-item-username">{review.userId.username} says:</li>
      <li className="reviews-item-text"><p>"{review.text}"</p></li>
      <li className="reviews-item-created"><p>{formatTime(review.createdAt)}</p>{review.userId._id === userId && <button className="delete-review-btn" onClick={handleDeleteBtnClick}>Delete Review</button>}</li>
    </div>
  )
}

export default ReviewsListItem;
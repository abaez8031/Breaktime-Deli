import "./ReviewsListItem.css"
import { formatTime } from "../../../utils/utils";

const ReviewsListItem = ({review}) => {
  return (
    <div className="reviews-list-item-container">
      <li className="reviews-item-username">{review.userId.username} says:</li>
      <li className="reviews-item-text"><p>"{review.text}"</p></li>
      <li className="reviews-item-created"><p>{formatTime(review.createdAt)}</p><button className="delete-review-btn">Delete Review</button></li>
    </div>
  )
}

export default ReviewsListItem;
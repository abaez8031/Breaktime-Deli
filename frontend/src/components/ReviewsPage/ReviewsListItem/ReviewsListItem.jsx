import "./ReviewsListItem.css"
import { formatTime } from "../../../utils/utils";

const ReviewsListItem = ({review}) => {
  return (
    <div className="reviews-list-item-container">
      <li className="reviews-item-username">{review.userId.username} says:</li>
      <li className="reviews-item-text">"{review.text}"</li>
      <li className="reviews-item-created">{formatTime(review.createdAt)}</li>
    </div>
  )
}

export default ReviewsListItem;
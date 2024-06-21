import "./ReviewsListItem.css"
import { formatTime } from "../../../utils/utils";

const ReviewsListItem = ({review}) => {
  return (
    <div className="reviews-list-item-container">
      <li>{review.userId.username} says:</li>
      <li>"{review.text}"</li>
      <li>{formatTime(review.createdAt)}</li>
    </div>
  )
}

export default ReviewsListItem;
import "./ReviewsListItem.css"

const ReviewsListItem = ({review}) => {
  return (
    <div className="reviews-list-item-container">
      <p>{review.text}</p>
    </div>
  )
}

export default ReviewsListItem;
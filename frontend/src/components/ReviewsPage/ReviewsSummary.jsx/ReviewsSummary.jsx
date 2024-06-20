import "./ReviewsSummary.css"
import { calcReviewAvg, calculateReviewsDistribution } from "../../../utils/utils";

const ReviewsSummary = ({reviews}) => {

const distribution = calculateReviewsDistribution(reviews)
const overallAvg = calcReviewAvg(reviews)

  return (
    <div className="reviews-summary-container">
      <p>Overall Rating: {overallAvg}</p>
      <p>5: {distribution[5]}</p>
      <p>4: {distribution[4]}</p>
      <p>3: {distribution[3]}</p>
      <p>2: {distribution[2]}</p>
      <p>1: {distribution[1]}</p>
      <p>{reviews.length} reviews</p>
    </div>
  )
}

export default ReviewsSummary;
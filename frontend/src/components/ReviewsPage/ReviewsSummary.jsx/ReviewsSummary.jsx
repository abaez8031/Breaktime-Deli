import "./ReviewsSummary.css"
import { calcReviewAvg, calculateReviewsDistribution } from "../../../utils/utils";
import starImg from "../../../assets/icons8-star-48.png"

const ReviewsSummary = ({reviews}) => {

const {5: noOfFives, 4: noOfFours, 3: noOfThrees, 2: noOfTwos, 1: noOfOnes} = calculateReviewsDistribution(reviews)
const overallAvg = calcReviewAvg(reviews).toFixed(1)
const totalReviews = reviews.length

  return (
    <div className="summary-container">
      <p>Overall Rating: {overallAvg}</p>
      <div className="summary-rating-container">
        <img className="star-img"src={starImg} alt="starImg"/>
        <img className="star-img"src={starImg} alt="starImg"/>
        <img className="star-img"src={starImg} alt="starImg"/>
        <img className="star-img"src={starImg} alt="starImg"/>
        <img className="star-img"src={starImg} alt="starImg"/>
        <p>{noOfFives} reviews</p>
      </div>
      <div className="summary-rating-container">
        <img className="star-img"src={starImg} alt="starImg"/>
        <img className="star-img"src={starImg} alt="starImg"/>
        <img className="star-img"src={starImg} alt="starImg"/>
        <img className="star-img"src={starImg} alt="starImg"/>
        <p>{noOfFours} reviews</p>
      </div>
      <div className="summary-rating-container">
        <img className="star-img"src={starImg} alt="starImg"/>
        <img className="star-img"src={starImg} alt="starImg"/>
        <img className="star-img"src={starImg} alt="starImg"/>
        <p>{noOfThrees} reviews</p>
      </div>
      <div className="summary-rating-container">
        <img className="star-img"src={starImg} alt="starImg"/>
        <img className="star-img"src={starImg} alt="starImg"/>
        <p>{noOfTwos} reviews</p>
      </div>
      <div className="summary-rating-container">
        <img className="star-img"src={starImg} alt="starImg"/>
        <p>{noOfOnes} reviews</p>
      </div>
      <div className="summary-footer">
        <p>{totalReviews} total reviews</p>
      </div>
    </div>
  )
}

export default ReviewsSummary;
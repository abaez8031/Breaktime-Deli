import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllReviews } from "../../../store/reviews";
import ReviewsSummary from "../ReviewsSummary.jsx/ReviewsSummary";
import CreateReviewForm from "../CreateReviewForm/CreateReviewForm";
import ReviewsList from "../ReviewsList/ReviewsList";
import EditReviewForm from "../EditReviewForm/EditReviewForm";
import "./ReviewsPage.css"

const ReviewsPage = () => {
  const dispatch = useDispatch();
  const reviews = useSelector(state => Object.values(state.reviews));
  const userId = useSelector(state => state.session.user?._id);
  const hasReview = reviews.some(review => review.userId._id === userId);
  const [isUpdatingReview, setIsUpdatingReview] = useState(false);
  const [reviewBeingUpdated, setReviewBeingUpdated] = useState({});

  useEffect(() => {
    dispatch(fetchAllReviews());
  }, [dispatch]);

  return (
      <div className="reviews-page-container">
      {userId && !hasReview && (<CreateReviewForm userId={userId}/>)}
      <ReviewsSummary reviews={reviews}/>
      {!isUpdatingReview && <ReviewsList setReviewBeingUpdated= {setReviewBeingUpdated} setIsUpdatingReview={setIsUpdatingReview} userId={userId} reviews={reviews}/>}
      {isUpdatingReview && <EditReviewForm reviewBeingUpdated={reviewBeingUpdated} setIsUpdatingReview={setIsUpdatingReview}/>}
      </div>
  );
};

export default ReviewsPage;

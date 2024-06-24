import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllReviews } from "../../../store/reviews";
import ReviewsSummary from "../ReviewsSummary.jsx/ReviewsSummary";
import CreateReviewForm from "../CreateReviewForm/CreateReviewForm";
import ReviewsList from "../ReviewsList/ReviewsList";
import EditReviewForm from "../EditReviewForm/EditReviewForm";

const ReviewsPage = () => {
  const dispatch = useDispatch();
  const reviews = useSelector(state => Object.values(state.reviews));
  const userId = useSelector(state => state.session.user?._id);
  const hasReview = reviews.some(review => review.userId._id === userId);
  const [isUpdatingReview, setIsUpdatingReview] = useState(false);

  useEffect(() => {
    dispatch(fetchAllReviews());
  }, [dispatch]);

  return (
    <>
      {userId && !hasReview && (<CreateReviewForm userId={userId}/>)}
      <ReviewsSummary reviews={reviews}/>
      {!isUpdatingReview && <ReviewsList setIsUpdatingReview={setIsUpdatingReview} userId={userId} reviews={reviews}/>}
      {isUpdatingReview && <EditReviewForm/>}
    </>
  );
};

export default ReviewsPage;

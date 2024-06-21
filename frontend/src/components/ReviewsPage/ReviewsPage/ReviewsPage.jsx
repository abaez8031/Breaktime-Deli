import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllReviews } from "../../../store/reviews";
import ReviewsSummary from "../ReviewsSummary.jsx/ReviewsSummary";
import CreateReviewForm from "../CreateReviewForm/CreateReviewForm";
import ReviewsList from "../ReviewsList/ReviewsList";

const ReviewsPage = () => {
  const dispatch = useDispatch();
  const reviews = useSelector(state => Object.values(state.reviews));
  const userId = useSelector(state => state.session.user?._id);
  const hasReview = reviews.some(review => review.userId._id === userId)

  useEffect(() => {
    dispatch(fetchAllReviews());
  }, [dispatch]);

  return (
    <>
      {userId && !hasReview && (<CreateReviewForm/>)}
      <ReviewsSummary reviews={reviews}/>
      <ReviewsList reviews={reviews}/>
    </>
  );
};

export default ReviewsPage;

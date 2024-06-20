import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllReviews } from "../../../store/reviews";
import ReviewsSummary from "../ReviewsSummary.jsx/ReviewsSummary";
import CreateReviewForm from "../CreateReviewForm/CreateReviewForm";

const ReviewsPage = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => Object.values(state.reviews));

  useEffect(() => {
    dispatch(fetchAllReviews());
  }, [dispatch]);

  return (
    <>
      <CreateReviewForm/>
      <ReviewsSummary reviews={reviews}/>
    </>
  );
};

export default ReviewsPage;

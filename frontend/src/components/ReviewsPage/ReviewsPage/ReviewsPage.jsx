import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllReviews } from "../../../store/reviews";
import ReviewsSummary from "../ReviewsSummary.jsx/ReviewsSummary";

const ReviewsPage = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => Object.values(state.reviews));

  useEffect(() => {
    dispatch(fetchAllReviews());
  }, [dispatch]);

  return (
    <>
      <h1>Reviews Page</h1>
      <ReviewsSummary reviews={reviews}/>
    </>
  );
};

export default ReviewsPage;

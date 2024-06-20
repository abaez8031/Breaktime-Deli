import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllReviews } from "../../store/reviews";

const ReviewsPage = () => {
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.reviews);
  console.log(reviews)

  useEffect(() => {
    dispatch(fetchAllReviews())
  }, [dispatch])

  return (
    <>
    <h1>Reviews Page</h1>
    </>
  )
}

export default ReviewsPage;
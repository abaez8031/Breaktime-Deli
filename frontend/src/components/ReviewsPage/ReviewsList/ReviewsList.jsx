import "./ReviewsList.css"
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllReviews } from "../../../store/reviews";
import ReviewsListItem from "../ReviewsListItem/ReviewsListItem";
import ReactPaginate from "react-paginate";

const ReviewsList = () => {
  const dispatch = useDispatch();
  const reviews = useSelector(state => Object.values(state.reviews));
  // React Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const offset = currentPage * itemsPerPage;
  const currentItems = reviews.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(reviews.length / itemsPerPage);

  const handlePageClick = (e) => {
    setCurrentPage(e.selected);
  };

  useEffect(() => {
    dispatch(fetchAllReviews())
  }, [dispatch])

  return (
    <div className="reviews-list-container">
      <ul>
        {reviews && currentItems.map(review => 
          <ReviewsListItem review={review} />
        )}
      </ul>

      <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
    </div>
  )
}

export default ReviewsList;
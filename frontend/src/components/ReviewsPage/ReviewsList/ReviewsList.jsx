import "./ReviewsList.css"
import { useState } from "react";
import ReviewsListItem from "../ReviewsListItem/ReviewsListItem";
import ReactPaginate from "react-paginate";

const ReviewsList = ({reviews, userId, setIsUpdatingReview}) => {
  // React Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 1;
  const offset = currentPage * itemsPerPage;
  const currentItems = reviews.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(reviews.length / itemsPerPage);

  const handlePageClick = (e) => {
    setCurrentPage(e.selected);
  };

  return (
    <div className="reviews-list-container">
      <ul>
        {reviews && currentItems.map(review => 
          <ReviewsListItem review={review} userId={userId} setIsUpdatingReview={setIsUpdatingReview}/>
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
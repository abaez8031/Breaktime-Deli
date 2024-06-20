import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSuggestions } from "../../../store/suggestions";
import SuggestionPageItem from "../SuggestionsPageItem/SuggestionPageItem";
import ReactPaginate from "react-paginate";
import CreateSuggestionsForm from "../CreateSuggestionsForm.jsx/CreateSuggestionsForm";
import "./SuggestionsPage.css"

const SuggestionsPage = () => {
  const dispatch = useDispatch();
  const suggestions = useSelector(state => Object.values(state.suggestions));
  const currentUser = useSelector(state => state.session.user)
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 5;

  const handlePageClick = (e) => {
    setCurrentPage(e.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = suggestions.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(suggestions.length / itemsPerPage);

  useEffect(() => {
    dispatch(fetchAllSuggestions())
  }, [dispatch])

  return (<>
  <div className="suggestions-page-container">
    <h1 className="suggestions-page-heading">Tell us what we can do better!</h1>
    {currentUser && <CreateSuggestionsForm/>}
    <div className="suggestions-container">
      {suggestions && (
        <ul className="suggestions-list">
          {currentItems.map(suggestion => 
            <SuggestionPageItem suggestion={suggestion}/>
          )}
        </ul>
      )}
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
  </div>
  </>)
}

export default SuggestionsPage;
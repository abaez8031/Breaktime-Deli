import "./SuggestionsListItem.css"
import { formatTime } from "../../../utils/utils";
import { deleteSuggestion } from "../../../store/suggestions";
import { useDispatch } from "react-redux";

const SuggestionsListItem = ({userId, suggestion}) => {
  const dispatch = useDispatch();

  const handleDeleteBtnClick = () => {
    dispatch(deleteSuggestion(suggestion._id))
  }

  return (
    <div className="suggestions-list-item-container">
      <li className="suggestions-item-username">{suggestion.userId.username} says:</li>
      <li className="suggestions-item-text">{suggestion.text}</li>
      <li className="suggestions-item-created">{formatTime(suggestion.createdAt)}{userId === suggestion.userId._id && <button className="delete-suggestion-btn" onClick={handleDeleteBtnClick}>Delete Suggestion</button>}</li>
    </div>
  )
}

export default SuggestionsListItem;
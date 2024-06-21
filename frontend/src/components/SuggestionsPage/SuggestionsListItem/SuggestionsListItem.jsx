import "./SuggestionsListItem.css"
import { formatTime } from "../../../utils/utils";

const SuggestionsListItem = ({suggestion}) => {
  return (
    <>
      <div className="suggestions-list-item-container">
        <li className="suggestions-item-username">{suggestion.userId.username} says:</li>
        <li className="suggestions-item-text">{suggestion.text}</li>
        <li className="suggestions-created-at">{formatTime(suggestion.createdAt)}</li>
      </div>
    </>
  )
}

export default SuggestionsListItem;
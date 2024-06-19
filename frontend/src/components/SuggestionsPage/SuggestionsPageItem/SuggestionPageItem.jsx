import "./SuggestionPageItem.css"

const SuggestionPageItem = ({suggestion}) => {
  console.log(suggestion)
  return (
    <>
      <div className="suggestions-page-item-container">
        <li className="suggestions-item-username">{suggestion.userId.username} says:</li>
        <li className="suggestions-item-text">{suggestion.text}</li>
      </div>
    </>
  )
}

export default SuggestionPageItem;
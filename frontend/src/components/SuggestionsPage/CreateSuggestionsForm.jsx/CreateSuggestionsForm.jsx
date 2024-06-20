import { createSuggestion } from "../../../store/suggestions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "./CreateSuggestionsForm.css"

const CreateSuggestionsForm = () => {
  const dispatch = useDispatch();
  const [text,setText] = useState("")
  const userId = useSelector(state => state.session.user?._id)
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createSuggestion({userId ,text}))
  }
  return (
    <>
    <form onSubmit={handleSubmit}>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter your suggestion"required/>
      <button type="submit">Create Suggestion</button>
    </form>
    </>
  )
  // error handling & rendering
}

export default CreateSuggestionsForm;
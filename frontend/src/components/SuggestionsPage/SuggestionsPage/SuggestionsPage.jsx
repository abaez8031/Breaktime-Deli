import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSuggestions } from "../../../store/suggestions";

const SuggestionsPage = () => {
  const dispatch = useDispatch();
  const suggestions = useSelector(state => state.suggestions);

  useEffect(() => {
    dispatch(fetchAllSuggestions())
  }, [dispatch])

  return (<>
  <h1>Suggestions Page</h1>
  </>)
}

export default SuggestionsPage;
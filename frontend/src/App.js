import LoginForm from "./components/SessionForms/LoginForm/LoginForm";
import SignupForm from "./components/SessionForms//SignupForm/SignupForm";
import NavBar from "./components/NavBar/NavBar";
import { Route, Switch } from "react-router-dom";
import "./reset.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./store/session";
import ReviewsPage from "./components/ReviewsPage/ReviewsPage/ReviewsPage";
import SuggestionsPage from "./components/SuggestionsPage/SuggestionsPage/SuggestionsPage";
import Homepage from "./components/Homepage/Homepage";

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/login">
            <LoginForm />
          </Route>
          <Route exact path="/register">
            <SignupForm />
          </Route>
          <Route exact path="/reviews">
            <ReviewsPage />
          </Route>
          <Route exact path="/suggestions">
            <SuggestionsPage />
          </Route>
        </Switch>
      </>
    )
  );
};

export default App;

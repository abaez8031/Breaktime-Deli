import LoginForm from "./components/SessionForms/LoginForm";
import SignupForm from "./components/SessionForms/SignupForm";
import NavBar from "./components/NavBar/NavBar";
import { Route, Switch } from "react-router-dom"
import "./reset.css"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./store/session";

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true) )
  }, [dispatch])

  return loaded && (
    <>
    <NavBar/>
    <Switch>
      <Route exact path="/login">
        <LoginForm/>
      </Route>
      <Route exact path="/register">
        <SignupForm/>
      </Route>
    </Switch>
    </>
  )
}

export default App;

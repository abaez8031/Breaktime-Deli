import LoginForm from "./components/SessionForms/LoginForm";
import SignupForm from "./components/SessionForms/SignupForm";
import NavBar from "./components/NavBar/NavBar";
import { Route, Switch } from "react-router-dom"
import "./reset.css"
const App = () => {
  return (
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

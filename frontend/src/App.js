import LoginForm from "./components/SessionForms/LoginForm";
import SignupForm from "./components/SessionForms/SignupForm";
import NavBar from "./components/NavBar/NavBar";
const App = () => {
  return (
    <>
    <h1>Hello from App</h1>
    <NavBar/>
    <LoginForm/>
    <SignupForm/>
    </>
  )
}

export default App;

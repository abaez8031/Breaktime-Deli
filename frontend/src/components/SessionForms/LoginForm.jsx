import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { clearSessionErrors, login } from "../../store/session";
import { Link } from "react-router-dom"
import "./LoginForm.css"
import { Redirect } from "react-router-dom";

const LoginForm = () => {
  const [username,setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector(state => state.errors.session);
  const currentUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    dispatch(clearSessionErrors())
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    dispatch(clearSessionErrors())
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password}))
    setUsername("");
    setPassword("");
  }

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  return (
    <>
    {currentUser && <Redirect to="/"/>}
    <div className="login-form-container">
      <h2 className="login-form-header">Login</h2>
      <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange}>
        </input>
        <div className="errors">{errors?.username}</div>
        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange}>
        </input>
        <div className="errors">{errors?.password}</div>
        <button className="login-btn">Login</button>
      </form>
    </div>
    </>
  )
}

export default LoginForm;
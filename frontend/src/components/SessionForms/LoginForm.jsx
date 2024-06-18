import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { clearSessionErrors, login } from "../../store/session";
import { Link } from "react-router-dom"
import "./LoginForm.css"

const LoginForm = () => {
  const [username,setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password}))
  }

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  return (
    <>
    <div className="login-form-container">
      <h2 className="login-form-header">Login</h2>
      <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}>
        </input>
        <div className="errors">{errors?.username}</div>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}>
        </input>
        <div className="errors">{errors?.password}</div>
        <button className="login-btn">Login</button>
      </form>
    </div>
    </>
  )
}

export default LoginForm;
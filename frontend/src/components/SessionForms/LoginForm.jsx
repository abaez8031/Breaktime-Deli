import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { clearSessionErrors, login } from "../../store/session";
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
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="errors">{errors?.username}</div>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}>
        </input>
        <div className="errors">{errors?.password}</div>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}>
        </input>
        <button>Submit</button>
      </form>
    </div>
    </>
  )
}

export default LoginForm;
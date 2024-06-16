import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { clearSessionErrors, login } from "../../store/session";

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
    <h2>Login Form</h2>
    <form onSubmit={handleSubmit}>
      <div className="errors">{errors?.username}</div>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}>
      </input>
      <div className="errors">{errors?.password}</div>
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}>
      </input>
      <button>Submit</button>
    </form>
    </>
  )
}

export default LoginForm;
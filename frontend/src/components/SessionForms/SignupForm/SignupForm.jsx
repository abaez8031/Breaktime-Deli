import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signup, clearSessionErrors } from "../../../store/session"
import { Link, Redirect } from "react-router-dom";
import "./SignupForm.css";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const errors = useSelector((state) => state.errors.session);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup({ username, password }));
  };

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  return (
    <>
      {currentUser && <Redirect to="/" />}
      <div className="register-form-container">
        <h2 className="register-form-header">Register</h2>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <div className="errors">{errors?.username}</div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <div className="errors">{errors?.password}</div>
          <button className="register-btn">Register</button>
        </form>
      </div>
    </>
  );
};

export default SignupForm;

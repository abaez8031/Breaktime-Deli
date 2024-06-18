import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signup, clearSessionErrors } from '../../store/session';

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const errors = useSelector(state => state.errors.session)
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup({ username, password }))
  }

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors())
    }
  }, [dispatch])

  return(
    <>
    <h2>Register</h2>
    <form onSubmit={handleSubmit}>
      <div>{errors?.username}</div>
      <input type='text' placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
      <div>{errors?.password}</div>
      <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
      <button>Create Account</button>
    </form>
    </>
  )
}

export default SignupForm;
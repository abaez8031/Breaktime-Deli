import "./NavBar.css"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../store/session";

const NavBar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user)
  console.log(currentUser)
  return (
    <ul className="nav-bar">
      {!currentUser &&
      (<><li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li></>)
      }
      <li>Products</li>
      <li><Link to="/suggestions">Suggestions</Link></li>
      <li><Link to="/reviews">Reviews</Link></li>
      {currentUser && <li><p onClick={() => {
        dispatch(logout())
      }} className="logout" >Logout</p></li>}
    </ul>
  )
}

export default NavBar;
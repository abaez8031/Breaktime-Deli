import "./NavBar.css"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../store/session";
import sandwichlogo from "../../assets/sandwichlogo.png"

const NavBar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user)
  return (
    <ul className="nav-bar">
      <li><Link to="/"><img className="sandwich-logo"src={sandwichlogo} alt="sandwichlogo"/></Link></li>
      {!currentUser &&
      (<><li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li></>)
      }
      <li><Link to="/products">Products</Link></li>
      <li><Link to="/suggestions">Suggestions</Link></li>
      <li><Link to="/reviews">Reviews</Link></li>
      {currentUser && <li><p onClick={() => {
        dispatch(logout())
      }} className="logout" >Logout</p></li>}
    </ul>
  )
}

export default NavBar;
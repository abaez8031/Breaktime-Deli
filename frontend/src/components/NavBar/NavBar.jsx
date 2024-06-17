import "./NavBar.css"
import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <ul className="nav-bar">
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li>Products</li>
      <li>Suggestions</li>
      <li>Logout</li>
    </ul>
  )
}

export default NavBar;
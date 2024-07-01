import "./Homepage.css"
import { Link } from "react-router-dom"

const Homepage = () => {
  return (
    <div className="homepage">

      <div className="hero">
        <h1>Welcome to Breaktime Deli</h1>
        <p>We offer the best sandwiches in town, made with fresh ingredients and lots of love.</p>
        <Link to="/products">Order Now</Link>
      </div>

    </div>
  );
}

export default Homepage;
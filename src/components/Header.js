import { useState, useEffect } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

const Header = () => {
  const [btn, setBtn] = useState("Login"); // Default to "Login" button
  const [cartItems, setCartItems] = useState([]); // Cart items from localStorage
  const navigate = useNavigate(); // useNavigate for navigation

  // Load cart items from localStorage when the component mounts
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);

    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      setBtn("Logout"); // Set button to "Logout" if user is logged in
    }
  }, []);

  // Handle login/logout button functionality
  const handleLoginLogout = () => {
    if (btn === "Login") {
      setBtn("Logout");
      navigate("/login"); // Redirect to login page
    } else {
      setBtn("Login");
      localStorage.removeItem("isLoggedIn"); // Clear login status
      navigate("/"); // Redirect to home page
    }
  };

  return (
    <div className="header">
      <div className="logo-container">
        {/* Wrap the logo in a Link component to make it clickable */}
        <Link to="/">
          <img className="logo" src={LOGO_URL} alt="logo" />
        </Link>
        <div className="slogan">
          <span>Craving something? We've got you!</span>
        </div>
      </div>

      <div className="nav-items">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/cart">
              Cart {cartItems.length > 0 && `(${cartItems.length})`} {/* Show cart count */}
            </Link>
          </li>
          <button
            className="login-btn"
            onClick={handleLoginLogout} // Toggle login/logout on click
          >
            {btn} {/* Show Login or Logout based on the state */}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate for navigation

const Login = () => {
  const [email, setEmail] = useState(""); // Email for both Login and Sign-Up
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // For Sign-up confirmation
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Login and Sign-Up
  const navigate = useNavigate();

  // Check if the user is logged in and get their info (email)
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const storedEmail = localStorage.getItem("email");

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();

    // Check if the credentials match (email and password)
    const storedPassword = localStorage.getItem("password");

    if (email === storedEmail && password === storedPassword) {
      // Successfully logged in
      localStorage.setItem("isLoggedIn", "true");
      navigate("/"); // Redirect to home page
    } else {
      alert("Invalid email or password.");
    }
  };

  // Handle sign-up
  const handleSignUp = (e) => {
    e.preventDefault();

    // Validate sign-up form
    if (email && password && password === confirmPassword) {
      // Save email and password in localStorage
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      localStorage.setItem("isLoggedIn", "true");

      alert("Sign-up successful! You are now logged in.");
      navigate("/"); // Redirect to home page after sign-up
    } else {
      alert("Please make sure all fields are filled correctly and passwords match.");
    }
  };

  // Display the first letter of the email (or part of it) if logged in
  const loginButtonText = isLoggedIn ? storedEmail.charAt(0).toUpperCase() : "Login";

  return (
    <div className="login-container">
      <h2>{isSignUp ? "Sign Up" : "Login"}</h2>

      <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {isSignUp && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        )}
        <button type="submit">{isSignUp ? "Sign Up" : loginButtonText}</button>
      </form>

      <div className="toggle-form">
        {isSignUp ? (
          <p>
            Already have an account? <span onClick={() => setIsSignUp(false)}>Login</span>
          </p>
        ) : (
          <p>
            Don't have an account? <span onClick={() => setIsSignUp(true)}>Sign Up</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;

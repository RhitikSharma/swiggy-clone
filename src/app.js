import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css"; // Import external CSS for styling
import Header from "./components/Header"; // Import Header Component
import Body from "./components/Body";
import { createBrowserRouter, Outlet, RouterProvider, useLocation } from "react-router-dom"; // Import useLocation here
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import Restaurantmenu from "./components/Restaurantmenu";
import Cart from "./components/Cart"; // Import Cart Component
import Login from "./components/Login"; // Import Login Component
import LiveChat from "./components/LiveChat"; // Import LiveChat Component
import HeroSection from "./components/HeroSection"; // Import HeroSection Component

// Footer Component
const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2025 Your Restaurant. All rights reserved.</p>
      <div className="social-links">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          Facebook
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
      </div>
    </footer>
  );
};

// Main App Layout
const AppLayout = () => {
  const location = useLocation(); // Get the current route location

  return (
    <div className="app">
      <Header />
      {location.pathname === "/" && <HeroSection />} {/* Render HeroSection only on Home screen */}
      <Outlet /> {/* Render child routes here */}
      <Footer />
      <LiveChat /> {/* Add live chat at the bottom */}
    </div>
  );
};

// Define Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // Render AppLayout with HeroSection and Footer
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Body />, // Body component will be rendered here
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/restaurantmenu/:resId",
        element: <Restaurantmenu />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

// React component
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

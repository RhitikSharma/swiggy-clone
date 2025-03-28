import React from 'react';
import './Contact.css'; // Import the CSS file for styling

const Contact = () => {
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <p>
        Have any questions or feedback? We'd love to hear from you! Reach out to us for any inquiries regarding your orders, restaurant partnerships, or general feedback.
      </p>
      <div className="contact-details">
        <div className="contact-info">
          <h2>Phone</h2>
          <p>+91 123 456 7890</p>
        </div>
        <div className="contact-info">
          <h2>Email</h2>
          <p>support@swiggyrestaurant.com</p>
        </div>
        <div className="contact-info">
          <h2>Address</h2>
          <p>123 Swiggy Street, Foodie City, India</p>
        </div>
      </div>
      <div className="social-media">
        <h2>Follow Us</h2>
        <div className="social-icons">
          <a href="https://facebook.com/swiggy" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://twitter.com/swiggy" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com/swiggy" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
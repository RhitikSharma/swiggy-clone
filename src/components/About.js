import React from "react";
import "../styles.css";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>Welcome to Our Restaurant</h1>
        <p>Bringing deliciousness to your doorstep with love and care!</p>
      </div>

      <div className="about-section">
        <h2>Our Story</h2>
        <p>
          We began with a mission to serve delicious meals with exceptional
          service. Whether you're craving a quick snack or a hearty meal, we
          ensure every bite is crafted with the finest ingredients and a passion
          for food.
        </p>
      </div>

      <div className="about-section">
        <h2>Our Values</h2>
        <ul className="values-list">
          <li><strong>Quality:</strong> Only the best ingredients go into our food.</li>
          <li><strong>Customer First:</strong> We always put our customers at the heart of everything we do.</li>
          <li><strong>Freshness:</strong> Every meal is made fresh, ensuring the highest quality.</li>
          <li><strong>Innovation:</strong> We're constantly experimenting with flavors and dishes.</li>
        </ul>
      </div>

      <div className="about-section">
        <h2>Meet Our Team</h2>
        <div className="team-container">
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="John Doe" />
            <h3>John Doe</h3>
            <p>Chef & Founder</p>
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Jane Smith" />
            <h3>Jane Smith</h3>
            <p>Head of Operations</p>
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Mike Johnson" />
            <h3>Mike Johnson</h3>
            <p>Customer Relations</p>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h2>Why Choose Us?</h2>
        <p>
          We combine delicious food, fast delivery, and exceptional customer
          service. Whether it's a casual meal, a celebration, or a midnight snack,
          we're always here to serve you.
        </p>
      </div>

      {/* Footer component will be included globally, no need for a separate footer here */}
    </div>
  );
};

export default About;

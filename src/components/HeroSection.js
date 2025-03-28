import React from 'react';
import "./HeroSection.css"
const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Craving? We've Got You Covered!</h1>
        <p>From late-night munchies to your fave meals, we bring the flavor right to your doorstep, fast and fresh. No fuss, just food!</p>

        <button className="order-now-btn">
          Order Now
        </button>
      </div>
    </section>
  );
};

export default HeroSection;

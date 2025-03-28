import React, { useState, useEffect } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from localStorage when the component mounts
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);
  }, []);

  // Update localStorage whenever cart items change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Remove item from the cart
  const handleRemoveItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  // Handle quantity increase
  const handleIncreaseQuantity = (index) => {
    const updatedCart = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  // Handle quantity decrease
  const handleDecreaseQuantity = (index) => {
    const updatedCart = cartItems.map((item, i) =>
      i === index && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCart);
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Clear all items from the cart
  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart"); // Also clear from localStorage
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p>Price: ₹{(item.price / 100).toFixed(2)}</p>
                </div>

                <div className="item-actions">
                  <button onClick={() => handleDecreaseQuantity(index)}>-</button>
                  <span>Quantity: {item.quantity}</span>
                  <button onClick={() => handleIncreaseQuantity(index)}>+</button>
                  <button onClick={() => handleRemoveItem(index)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="total-price">
            <h3>Total: ₹{(calculateTotal() / 100).toFixed(2)}</h3>
          </div>
          <button className="checkout-btn" onClick={() => alert("Proceeding to checkout!")}>
            Checkout
          </button>
          <button className="clear-cart-btn" onClick={handleClearCart}>
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

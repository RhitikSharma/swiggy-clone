import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import "./menu.css";

const RestaurantMenu = () => {
  const [resinfo, setResinfo] = useState(null);
  const [cart, setCart] = useState([]); // Local state to store cart items
  const { resId } = useParams(); // Get Restaurant ID from URL

  console.log("Restaurant ID from URL:", resId);

  useEffect(() => {
    if (resId) {
      fetchMenu(resId);
    }
  }, [resId]); // Run useEffect when resId changes

  // Load cart items from localStorage on initial load
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Update cart in localStorage whenever cart items change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const fetchMenu = async (id) => {
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9351929&lng=77.6244807&restaurantId=${id}`
      );
      const data = await response.json();
      setResinfo(data.data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  const { name, cuisines, costForTwoMessage } = resinfo?.cards?.[2]?.card?.card?.info || {};
  const itemCard = resinfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card?.card;

  // Handle adding item to the cart
  const handleAddToCart = (item) => {
    // Check if item already exists in the cart
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.name === item.card.info.name);

    if (existingItemIndex !== -1) {
      // If item exists, update its quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // If item doesn't exist, add it with quantity 1
      const newItem = {
        name: item.card.info.name,
        description: item.card.info.description || "No description available",
        price: item.card.info.price || 0,
        quantity: 1, // Initialize quantity to 1
      };
      setCart([...cart, newItem]);
    }
  };

  // Get the quantity of the item from the cart
  const getItemQuantity = (itemName) => {
    const itemInCart = cart.find((cartItem) => cartItem.name === itemName);
    return itemInCart ? itemInCart.quantity : 0;
  };

  return resinfo === null ? (
    <Shimmer />
  ) : (
    <div className="menu-container">
      <div className="restaurant-info">
        <h1>{name || "Restaurant Name Not Available"}</h1>
        <p className="cuisines">Cuisines: {cuisines ? cuisines.join(", ") : "N/A"}</p>
        <p className="cost">Cost for Two: {costForTwoMessage || "N/A"}</p>
      </div>

      <h2 className="menu-heading">Menu</h2>
      <ul className="menu-list">
        {itemCard?.itemCards?.map((item) => (
          <li key={item.card.info.name} className="menu-item">
            <h3>{item.card.info.name}</h3>
            <p className="description">{item.card.info.description || "No description available"}</p>
            <p className="price">Price: ₹{(item.card.info.price || 0) / 100}</p>
            
           {/* Display quantity if item is in the cart */}
            <div className="add-to-cart-container">
              <button onClick={() => handleAddToCart(item)}>
                {getItemQuantity(item.card.info.name) > 0
                  ? `Added: ${getItemQuantity(item.card.info.name)}`
                  : "Add to Cart"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;

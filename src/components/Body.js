import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Body = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [cuisineFilter, setCuisineFilter] = useState("");
  const [costFilter, setCostFilter] = useState("");
  const [vegFilter, setVegFilter] = useState(false);
  const [deliveryTimeFilter, setDeliveryTimeFilter] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch Restaurant Data
  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      const restaurants =
        data?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];

      setRestaurantList(restaurants);
      setFilteredList(restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to filter restaurants
  const applyFilters = () => {
    let filteredRestaurants = [...restaurantList];

    // Search Filter
    if (searchText) {
      filteredRestaurants = filteredRestaurants.filter((restaurant) =>
        restaurant.info.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Top Rated Filter
    if (costFilter === "highRated") {
      filteredRestaurants = filteredRestaurants.filter(
        (restaurant) => restaurant.info.avgRating >= 4.6
      );
    }

    // Cuisine Filter
    if (cuisineFilter) {
      filteredRestaurants = filteredRestaurants.filter((restaurant) =>
        restaurant.info.cuisines.includes(cuisineFilter)
      );
    }

    // Cost Filter
    if (costFilter === "low") {
      filteredRestaurants = filteredRestaurants.filter(
        (restaurant) => restaurant.info.costForTwo < 30000
      );
    } else if (costFilter === "medium") {
      filteredRestaurants = filteredRestaurants.filter(
        (restaurant) =>
          restaurant.info.costForTwo >= 30000 && restaurant.info.costForTwo < 60000
      );
    } else if (costFilter === "high") {
      filteredRestaurants = filteredRestaurants.filter(
        (restaurant) => restaurant.info.costForTwo >= 60000
      );
    }

    // Veg Filter
    if (vegFilter) {
      filteredRestaurants = filteredRestaurants.filter(
        (restaurant) => restaurant.info.veg
      );
    }

    // Delivery Time Filter
    if (deliveryTimeFilter) {
      filteredRestaurants = filteredRestaurants.filter(
        (restaurant) =>
          restaurant.info.sla.deliveryTime <= parseInt(deliveryTimeFilter, 10)
      );
    }

    setFilteredList(filteredRestaurants);
  };

  useEffect(() => {
    applyFilters();
  }, [searchText, cuisineFilter, costFilter, vegFilter, deliveryTimeFilter]);

  return restaurantList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <h1>Welcome to Food Paradise!</h1>
      <p>Your next bite of deliciousness is just a click away. From comfort food to food adventures, we've got it all!</p>

      {/* Search Bar */}
      <div className="search">
        <input
          type="text"
          placeholder="Search restaurants..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={applyFilters}>Search</button>
      </div>

      {/* Filters Section */}
      <div className="filters">
        {/* Cuisine Filter */}
        <select onChange={(e) => setCuisineFilter(e.target.value)}>
          <option value="">All Cuisines</option>
          <option value="Chinese">Chinese</option>
          <option value="Indian">Indian</option>
          <option value="Italian">Italian</option>
          <option value="Mexican">Mexican</option>
        </select>

        {/* Cost Filter */}
        <select onChange={(e) => setCostFilter(e.target.value)}>
          <option value="">All Prices</option>
          <option value="low">₹ (Budget)</option>
          <option value="medium">₹₹ (Mid-Range)</option>
          <option value="high">₹₹₹ (Expensive)</option>
          <option value="highRated">Top Rated</option>
        </select>

        {/* Veg Filter */}
        <label>
          <input
            type="checkbox"
            checked={vegFilter}
            onChange={(e) => setVegFilter(e.target.checked)}
          />
          Vegetarian Only
        </label>

        {/* Delivery Time Filter */}
        <select onChange={(e) => setDeliveryTimeFilter(e.target.value)}>
          <option value="">Any Delivery Time</option>
          <option value="20">Within 20 mins</option>
          <option value="30">Within 30 mins</option>
          <option value="45">Within 45 mins</option>
        </select>

        <button onClick={applyFilters}>Apply Filters</button>
      </div>

      {/* Restaurant List */}
      <div className="res-container">
        {filteredList.length > 0 ? (
          filteredList.map((restaurant) => (
            <Link key={restaurant.info.id} to={"/restaurantmenu/" + restaurant.info.id}>
              <RestaurantCard {...restaurant.info} />
            </Link>
          ))
        ) : (
          <p>No restaurants found</p>
        )}
      </div>
    </div>
  );
};

export default Body;

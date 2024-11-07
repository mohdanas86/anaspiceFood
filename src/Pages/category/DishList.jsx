import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryFilter from "./CategoryFilter"; // Import the CategoryFilter component
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const DishList = () => {
    const navigate = useNavigate();
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6); // Controls the number of visible dishes

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 6); // Increase the visible count by 4
  };

  const handleClick = (id) => {
    navigate(`/dishes/${id}`); // Assuming your DishInfo route is set up to handle this
  };

  // Function to fetch dishes based on the selected category
  const fetchDishes = async (category) => {
    setLoading(true);
    try {
      const url = category
        ? `${process.env.REACT_APP_BACKEND_URL}/api/category?category=${category}`
        : `${process.env.REACT_APP_BACKEND_URL}/api/category`; // If no category, fetch all
      const response = await axios.get(url);

      // Check if dishes are returned
      if (response.data.length === 0) {
        setError("No dishes found for this category.");
      } else {
        setDishes(response.data);
      }
      setError(null); // Reset error state
    } catch (err) {
      console.error("Error fetching dishes:", err);
      setError("Failed to fetch dishes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDishes(""); // Initially, fetch all dishes
  }, []);

  return (
    <div className="container mx-auto bg-white">
      <div className="flex space-x-6 w-full">
        {/* Category Filter Component */}
        <div className="flex w-[20%] py-9 pl-10 bg-base-200">
        <CategoryFilter onFilter={fetchDishes} />
        </div>

        {/* Display Dishes or Loading/Error */}
        <div className="flex-1 w-[80%] py-8">
          {loading && <p className="text-center text-gray-500">Loading...</p>}
          {error && (
            <p className="text-center text-red-500 capitalize">
              No Dish Like this.
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-6">
            {dishes.slice(0, visibleCount).map((dish, index) => (
              <div
                key={index}
                onClick={() => handleClick(dish._id)} // Trigger the click handler to navigate
                className="bg-white p-4 rounded-lg shadow-lg hover:scale-105 transition-all"
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="text-lg font-semibold text-gray-800 mt-4">
                  {dish.name}
                </h3>

                {/* description */}
                <p className="text-gray-600 mt-2">
                  {dish.description.length > 60 ? (
                    <>{dish.description.slice(0, 60)}...</>
                  ) : (
                    dish.description
                  )}
                </p>

                {/* Price and Star Rating */}
                <div className="flex justify-between items-center space-x-1 mt-4">
                  <p className="text-gray-700 font-bold mt-2">₹{dish.price}</p>

                  <span className="flex justify-center items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-xl ${
                          dish.rating >= star
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Show More Button */}
          {visibleCount < dishes.length && (
            <div className="flex w-full justify-center mt-12">
              <button
                onClick={handleShowMore}
                className="flex items-center gap-2 px-6 py-3 text-lg font-semibold text-gray-700 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <span>Show more</span>
                <MdKeyboardArrowDown className="text-gray-500 text-2xl transition-transform transform group-hover:rotate-180" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DishList;

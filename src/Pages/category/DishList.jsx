import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryFilter from "./CategoryFilter"; // Import the CategoryFilter component
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../../context/useContext";
import ShowMoreBtn from "../../components/ShowMoreBtn";
import RowSkelton from "../../components/skeltons/RowSkelton";

const DishList = () => {
  const navigate = useNavigate();
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { visibleCount } = useMyContext();

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
        localStorage.setItem("Category", JSON.stringify(response.data));
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
      <div className="flex flex-col lg:flex-row lg:space-x-6 w-full">
        {/* Category Filter Component */}
        <div className="flex lg:w-[20%] pt-8 lg:pl-10 px-4 lg:bg-base-200">
          <CategoryFilter onFilter={fetchDishes} />
        </div>

        {/* Display Dishes or Loading/Error */}
        <div className="lg:flex-1 lg:w-[80%] w-full pb-8">
          {loading && (
            <>
              <RowSkelton />
              <RowSkelton />
              <RowSkelton />
            </>
          )}
          {error && (
            <p className="text-center text-red-500 capitalize">
              No Dish Like this.
            </p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 lg:p-6">
            {dishes.slice(0, visibleCount).map((dish, index) => (
              <div
                key={index}
                onClick={() => handleClick(dish._id)}
                className="bg-white lg:p-4 rounded-xl lg:shadow-md hover:shadow-lg hover:scale-[1.02] transition-all transform cursor-pointer flex flex-col justify-between"
              >
                {/* Dish Image */}
                <div className="relative">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-40 md:h-48 object-cover rounded-lg"
                  />
                </div>

                {/* Dish Details */}
                <div className="mt-3 flex flex-col space-y-1">
                  {/* Name */}
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {dish.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600">
                    {dish.description.length > 50
                      ? `${dish.description.slice(0, 50)}...`
                      : dish.description}
                  </p>
                </div>

                {/* Price and Rating */}
                <div className="mt-4 flex justify-between items-center text-gray-700">
                  {/* Price */}
                  {/* <p className="text-base font-bold text-green-600">
                    ₹{dish.price}
                  </p> */}

                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    <span className="bg-green-600 text-white w-[20px] h-[20px] rounded-full flex items-center justify-center text-lg">
                      ★
                    </span>
                    <span className="text-sm font-semibold">{dish.rating}</span>
                  </div>

                  {/* Preparation Time */}
                  <div className=" text-gray-500 text-sm">
                    {dish.preparation_time.replace("minutes", "mins")}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More Button */}
          {visibleCount < dishes.length && <ShowMoreBtn />}
        </div>
      </div>
    </div>
  );
};

export default DishList;

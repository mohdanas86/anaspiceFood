import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FeaturedItem = () => {
  const [dish, setDish] = useState([]);

  const fetchDishes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/dishes`);
      setDish(response.data.data);
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  return (
    <div className="mx-auto lg:px-10 px-4">
      <h2 className="text-2xl font-bold mb-2">Featured Items</h2>
      <div className="grid lg:grid-cols-2 gap-6 lg:py-8 py-4">
  {dish.slice(3, 5).map((item, index) => (
    <div
      key={index}
      className="flex bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer lg:h-52 h-44 overflow-hidden"
    >
      {/* Image Section */}
      <figure className="w-[40%] lg:w-[50%] h-full overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
        />
      </figure>

      {/* Content Section */}
      <div className="flex flex-col justify-between p-4 w-full">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {item.name}
          </h2>

          {/* Description with responsive length */}
          <p className="text-sm text-gray-700 mt-2 hidden lg:block">
            {item.description.length > 100
              ? `${item.description.slice(0, 100)}...`
              : item.description}
          </p>
          <p className="text-sm text-gray-700 mt-2 lg:hidden">
            {item.description.length > 60
              ? `${item.description.slice(0, 60)}...`
              : item.description}
          </p>
        </div>

        {/* Button */}
        <Link to={`/dishes/${item._id}`} className="mt-4">
          <button className="w-full bg-[--primary-color] hover:bg-[--secondary-color] text-white font-semibold py-2 rounded-full flex justify-center items-center gap-2 transition-transform duration-300 transform hover:-translate-y-1">
            More
          </button>
        </Link>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default FeaturedItem;

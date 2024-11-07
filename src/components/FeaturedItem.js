import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FeaturedItem = () => {
  const [dish, setDish] = useState([]);

  const fetchDishes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/dishes");
      setDish(response.data.data);
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  return (
    <div className="container mx-auto px-8">
      <h2 className="text-2xl font-bold mb-2">Featured Items</h2>
      <div className="grid grid-cols-2 gap-4 py-8">
        {dish.slice(3, 5).map((item, index) => (
          <div key={index} className="card card-side bg-base-100 shadow-md h-52">
            <figure className="w-1/2">
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-full h-full"
              />
            </figure>
            <div className="card-body w-1/2 flex flex-col justify-between">
              <h2 className="card-title text-lg font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-700">
                {item.description.length > 100 ? item.description.slice(0, 100) + "..." : item.description}
              </p>

              <Link to={`/dishes/${item._id}`} className="w-full">
                <button className="btn bg-[--primary-color] hover:bg-[--secondary-color] text-white flex justify-center items-center gap-2 hover:translate-x-[-2px] duration-300 rounded-full capitalize px-6 py-2 w-full mt-2">
                  more
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

import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const CategoryFilter = ({ onFilter, onFilterTag }) => {
  const [menu, setMenu] = useState(true);

  const toggleMenu = () => {
    setMenu((prevMenu) => !prevMenu);
  };

  // To stop propagation when clicking inside the menu
  const toggleMenuCon = (e) => {
    e.stopPropagation();
  };

  // Use effect to handle background scroll lock
  useEffect(() => {
    if (!menu) {
      // Lock background scroll when the menu is open
      document.body.style.overflow = "hidden";
    } else {
      // Restore background scroll when the menu is closed
      document.body.style.overflow = "auto";
    }

    // Cleanup the scroll lock when the component is unmounted or when menu state changes
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menu]);

  const categories = ["All", "Salad", "Appetizer", "Wraps", "Burgers", "Chicken", "Pizza", "Sides", "Main Course"];
  const tags = ["beef", "classic", "fast food", "crispy", "savory", "cheesy", "salty", "spicy", "vegetarian", "seafood"];

  return (
    <div className="mb-4 w-full">
      {/* Desktop view */}
      <div className="space-y-2 hidden lg:block">
        <h3 className="text-xl font-semibold mb-2">Filter by Category</h3>
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((category, index) => (
            <li
              key={index}
              className="border bg-white rounded-lg hover:bg-gray-100 py-2 px-4 list-none"
            >
              <button
                onClick={() => onFilter(category)} // Pass selected category to onFilter
                className="text-slate-900"
              >
                {category}
              </button>
            </li>
          ))}
        </div>
        <h3 className="text-xl font-semibold mt-4">Filter by Tag</h3>
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag, index) => (
            <li
              key={index + categories.length} // Ensure unique keys
              className="border bg-white rounded-lg hover:bg-gray-100 py-2 px-4 list-none"
            >
              <button
                onClick={() => { onFilterTag(tag); toggleMenu(); }} // Pass selected tag to onFilter
                className="text-slate-900"
              >
                {tag}
              </button>
            </li>
          ))}
        </div>
      </div>

      {/* Mobile view */}
      <div className="lg:hidden z-50">
        {/* header icons and button */}
      <div className="w-full">
      <div className="w-full overflow-scroll flex justify-start items-center gap-2 p-0">
       <button
          onClick={toggleMenu}
          className="text-lg font-semibold border shadow-sm rounded-lg py-2 px-4 flex justify-between items-center gap-2"
        >
          <div>Filter</div>
          <img src="./filterICON.png" alt="filter" width={20} height={20} />
        </button>

        {categories && categories.slice(1,6).map((category, index) => (
  <button
    onClick={() => onFilter(category)}
    key={index}
    className="text-lg font-semibold border shadow-sm rounded-lg py-2 px-4 flex justify-between items-center gap-2"
  >
    {category}  {/* This will display the category name */}
    {/* <img src="./filterICON.png" alt="filter" width={20} height={20} /> */}
  </button>
))}



       </div>
      </div>


        {!menu && (
          <div
            className="fixed w-full h-screen bg-black bg-opacity-50 top-0 left-0 z-50"
            onClick={toggleMenu}
          >
            <div
              className="transform translate-x-0 transition-transform duration-300 ease-in-out fixed w-[70%] h-screen bg-white left-0 py-10 px-6 z-50"
              onClick={toggleMenuCon}
            >
              {/* <div className="flex items-center justify-between mb-6">
                <Link to="/" className="text-xl font-semibold text-gray-800" onClick={toggleMenu}>
                  AnaSpice
                </Link>
                <button
                  className="text-gray-800 p-2 rounded-full hover:bg-gray-100"
                  onClick={toggleMenu}
                >
                  <AiOutlineClose className="text-2xl" />
                </button>
              </div> */}
              <h3 className="text-xl font-semibold mb-2">Filter by Category</h3>
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((category, index) => (
                  <li
                    key={index}
                    className="border shadow-sm bg-white rounded-lg hover:bg-gray-100 py-2 px-4 list-none"
                  >
                    <button
                      onClick={() => { onFilter(category); toggleMenu(); }} // Pass selected category to onFilter
                      className="text-slate-900"
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </div>
              <h3 className="text-xl font-semibold mt-6 mb-2">Filter by Tag</h3>
              <div className="flex flex-wrap items-center gap-2">
                {tags.map((tag, index) => (
                  <li
                    key={index + categories.length} // Ensure unique keys
                    className="border shadow-sm bg-white rounded-lg hover:bg-gray-100 py-2 px-4 list-none"
                  >
                    <button
                      onClick={() => { onFilterTag(tag); toggleMenu(); }} // Pass selected tag to onFilter
                      className="text-slate-900"
                    >
                      {tag}
                    </button>
                  </li>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;

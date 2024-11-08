import React from "react";

const CategoryFilter = ({ onFilter }) => {
  const categories = ["All", "Salad", "Appetizer", "Main Course"];

  return (
    <div className="mb-4">
      <h3 className="text-xl font-semibold mb-2">Filter by Category</h3>
      <ul className="space-y-2 hidden lg:block">
        {categories.map((category, index) => (
          <li key={index}>
            <button
              onClick={() => onFilter(category)} // Pass selected category to onFilter
              className="text-[--primary-color] hover:text-[--secondary-color]"
            >
              {category}
            </button>
          </li>
        ))}
      </ul>

      <ul className="menu-horizontal lg:hidden rounded-box flex flex-wrap gap-2">
        {categories.map((category, index) => (
          <li key={index} className="border bg-white rounded-lg hover:bg-gray-100 py-2 px-4">
            <button
              onClick={() => onFilter(category)} // Pass selected category to onFilter
              className="text-slate-900"
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;

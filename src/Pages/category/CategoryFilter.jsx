import React from "react";

const CategoryFilter = ({ onFilter }) => {
  const categories = [
    "All",
    "Salad",
    "Appetizer",
    "Main Course",
  ];

  return (
    <div className="mb-4">
      <h3 className="text-xl font-semibold mb-2">Filter by Category</h3>
      <ul className="space-y-2">
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
    </div>
  );
};

export default CategoryFilter;

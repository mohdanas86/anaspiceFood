import React, { useState } from "react";
import axios from "axios";

import {
  AiOutlinePlus,
  AiOutlineDollarCircle,
  AiOutlineTag,
} from "react-icons/ai";
import { BiDish } from "react-icons/bi";
import { GiCookingPot } from "react-icons/gi";
import { FaInfoCircle } from "react-icons/fa";
import { FaLeaf } from "react-icons/fa";

const NewDish = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    image: "",
    ingredients: [],
    preparation_time: "",
    allergens: [],
    tags: [],
    nutritional_info: {
      calories: 0,
      protein: 0,
      fat: 0,
      carbohydrates: 0,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleIngredientChange = (e, index) => {
    const ingredients = [...form.ingredients];
    ingredients[index] = e.target.value;
    setForm((prevData) => ({ ...prevData, ingredients }));
  };

  const handleAllergenChange = (e, index) => {
    const allergens = [...form.allergens];
    allergens[index] = e.target.value;
    setForm((prevData) => ({ ...prevData, allergens }));
  };

  const handleTagChange = (e, index) => {
    const tags = [...form.tags];
    tags[index] = e.target.value;
    setForm((prevData) => ({ ...prevData, tags }));
  };

  const addIngredient = () =>
    setForm((prevData) => ({
      ...prevData,
      ingredients: [...prevData.ingredients, ""],
    }));

  const addAllergen = () =>
    setForm((prevData) => ({
      ...prevData,
      allergens: [...prevData.allergens, ""],
    }));

  const addTag = () =>
    setForm((prevData) => ({
      ...prevData,
      tags: [...prevData.tags, ""],
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/newdish`;
      const response = await axios.post(url, form);
      alert(`New dish added: ${response.data.name}`);
      setForm({
        name: "",
        description: "",
        price: 0,
        category: "",
        imageUrl: "",
        ingredients: [],
        preparation_time: "",
        allergens: [],
        tags: [],
        nutritional_info: {
          calories: 0,
          protein: 0,
          fat: 0,
          carbohydrates: 0,
        },
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add new dish</h2>

      <form onSubmit={handleSubmit} className="w-[60%] mx-auto p-8 space-y-6">
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-800">
            <BiDish className="mr-2 text-[--primary-color]" /> Dish Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter dish name"
            required
            className="w-full px-4 py-3 rounded-md border border-gray-300  outline-0"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-800">
            <AiOutlineTag className="mr-2 text-[--primary-color]" /> Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the dish"
            className="w-full px-4 py-3 rounded-md border border-gray-300 outline-0"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-800">
              <AiOutlineDollarCircle className="mr-2 text-[--primary-color]" /> Price in
              INR
            </label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
              className="w-full px-4 py-3 rounded-md border border-gray-300  outline-0"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-800">
              <AiOutlineTag className="mr-2 text-[--primary-color]" /> Category
            </label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="e.g., Wraps"
              className="w-full px-4 py-3 rounded-md border border-gray-300 outline-0"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-800">
            <FaInfoCircle className="mr-2 text-[--primary-color]" /> Image URL
          </label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Link to an image"
            className="w-full px-4 py-3 rounded-md border border-gray-300 outline-0"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">Ingredients</h3>
          {form.ingredients.map((ingredient, index) => (
            <input
              key={index}
              value={ingredient}
              onChange={(e) => handleIngredientChange(e, index)}
              placeholder="Ingredient"
              className="w-full mb-2 px-4 py-3 rounded-md border border-gray-300 outline-0"
            />
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="text-sm text-[--primary-color] font-semibold flex items-center  transition"
          >
            <AiOutlinePlus className="h-5 w-5 mr-1" /> Add Ingredient
          </button>
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-800">
            <GiCookingPot className="mr-2 text-[--primary-color]" /> Preparation Time
          </label>
          <input
            name="preparation_time"
            value={form.preparation_time}
            onChange={handleChange}
            placeholder="e.g., 15 minutes"
            className="w-full px-4 py-3 rounded-md border border-gray-300 outline-0"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">Allergens</h3>
          {form.allergens.map((allergen, index) => (
            <input
              key={index}
              value={allergen}
              onChange={(e) => handleAllergenChange(e, index)}
              placeholder="Allergen"
              className="w-full mb-2 px-4 py-3 rounded-md border border-gray-300 outline-0"
            />
          ))}
          <button
            type="button"
            onClick={addAllergen}
            className="text-sm text-[--primary-color] font-semibold flex items-center  transition"
          >
            <AiOutlinePlus className="h-5 w-5 mr-1" /> Add Allergen
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">Tags</h3>
          {form.tags.map((tag, index) => (
            <input
              key={index}
              value={tag}
              onChange={(e) => handleTagChange(e, index)}
              placeholder="Tag"
              className="w-full mb-2 px-4 py-3 rounded-md border border-gray-300 outline-0"
            />
          ))}
          <button
            type="button"
            onClick={addTag}
            className="text-sm text-[--primary-color] font-semibold flex items-center  transition"
          >
            <AiOutlinePlus className="h-5 w-5 mr-1" /> Add Tag
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">
            Nutritional Info
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center text-sm font-medium text-gray-800">
              <FaLeaf className="mr-2 text-[--primary-color]" /> Calories
            </label>
            <label className="flex items-center text-sm font-medium text-gray-800">
              <FaLeaf className="mr-2 text-[--primary-color]" /> Protein (g)
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="calories"
              type="number"
              value={form.nutritional_info.calories}
              onChange={(e) =>
                setForm((prevData) => ({
                  ...prevData,
                  nutritional_info: {
                    ...prevData.nutritional_info,
                    calories: e.target.value,
                  },
                }))
              }
              placeholder="Calories"
              className="w-full mb-2 px-4 py-3 rounded-md border border-gray-300 outline-0"
            />
            <input
              name="protein"
              type="number"
              value={form.nutritional_info.protein}
              onChange={(e) =>
                setForm((prevData) => ({
                  ...prevData,
                  nutritional_info: {
                    ...prevData.nutritional_info,
                    protein: e.target.value,
                  },
                }))
              }
              placeholder="Protein (g)"
              className="w-full mb-2 px-4 py-3 rounded-md border border-gray-300 outline-0"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center text-sm font-medium text-gray-800">
              <FaLeaf className="mr-2 text-[--primary-color]" /> Fat (g)
            </label>
            <label className="flex items-center text-sm font-medium text-gray-800">
              <FaLeaf className="mr-2 text-[--primary-color]" /> Carbohydrates (g)
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="fat"
              type="number"
              value={form.nutritional_info.fat}
              onChange={(e) =>
                setForm((prevData) => ({
                  ...prevData,
                  nutritional_info: {
                    ...prevData.nutritional_info,
                    fat: e.target.value,
                  },
                }))
              }
              placeholder="Fat (g)"
              className="w-full mb-2 px-4 py-3 rounded-md border border-gray-300 outline-0"
            />
            <input
              name="carbohydrates"
              type="number"
              value={form.nutritional_info.carbohydrates}
              onChange={(e) =>
                setForm((prevData) => ({
                  ...prevData,
                  nutritional_info: {
                    ...prevData.nutritional_info,
                    carbohydrates: e.target.value,
                  },
                }))
              }
              placeholder="Carbohydrates (g)"
              className="w-full mb-2 px-4 py-3 rounded-md border border-gray-300 outline-0"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[--primary-color] hover:bg-[--secondary-color] text-white font-semibold py-3 rounded-md transition"
        >
          Add Dish
        </button>
      </form>
    </div>
  );
};

export default NewDish;

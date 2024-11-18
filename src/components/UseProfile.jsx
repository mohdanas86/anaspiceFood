import React, { useState } from "react";
import axios from "axios";
import { FaEdit, FaSignOutAlt } from "react-icons/fa";
import { useMyContext } from "../context/useContext";

const ProfilePage = () => {
  const { logoutUser } = useMyContext();
  // Get user from localStorage or context
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });

  const [error, setError] = useState("");

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle the edit form
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  // Handle Save and send PATCH request to update user
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const { username, email } = formData; // Destructure formData here
      const userId = user._id; // Get the userId from the state

      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/api/update-profile`,
        { username, email, userId }, // Send individual fields
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the headers for authentication
          },
        }
      );

      // If the request is successful, update localStorage and user state
      localStorage.setItem("user", JSON.stringify(response.data.data));
      setUser(response.data.data);
      console.log(response.data);
      setIsEditing(false); // Close the edit form
    } catch (err) {
      console.log(err);
      setError("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen flex  items-start lg:items-center justify-center">
      <div className="bg-white lg:rounded-xl lg:shadow-xl w-full max-w-lg p-8">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="relative">
            <img
              src={user?.profilePic || "https://via.placeholder.com/150"}
              alt="User Profile"
              className="w-36 h-36 rounded-full mx-auto border-4 border-gradient-to-r from-blue-500 to-teal-500"
            />
            <div className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md">
              <FaEdit
                onClick={toggleEdit}
                className="text-[--primary-color] text-xl cursor-pointer hover:text-[--secondary-color]"
              />
            </div>
          </div>
          <h2 className="text-3xl font-semibold text-gray-800 mt-4">
            {user?.username}
          </h2>
          <p className="text-gray-600 mt-2">{user?.email}</p>
        </div>

        {/* Editable Info or View */}
        <div className="mb-6">
          {isEditing ? (
            <div>
              {/* Editable Form */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg outline-none transition duration-200"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg outline-none transition duration-200"
                />
              </div>

              <button
                onClick={handleSave}
                className="w-full py-3 bg-[--primary-color] text-white rounded-lg hover:bg-gradient-to-l hover:bg-[--secondary-color] transition duration-300"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <div>
              {/* View Info */}
              <div className="mb-4">
                <p className="text-gray-700 font-semibold">Username:</p>
                <p className="text-gray-800">{user?.username}</p>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 font-semibold">Email:</p>
                <p className="text-gray-800">{user?.email}</p>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => logoutUser()} // Replace with actual logout functionality
                  className="flex items-center text-red-500 hover:text-red-700 transition duration-200"
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
      </div>
    </div>
  );
};

export default ProfilePage;

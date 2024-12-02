import React, { useState } from "react";
import axios from "axios";

const RateDish = ({ id, orderId, isRated }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState(""); // Review state
  const [username, setUsername] = useState(""); // Username state

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const url = `${process.env.REACT_APP_BACKEND_URL}/api/dishes/${id}/rate`;
  //     const orderUrl = `${process.env.REACT_APP_BACKEND_URL}/api/order/israted`;

  //     const response = await axios.post(url, { rating, review, username });
  //     const orderRatedStatus = await axios.patch(orderUrl, { orderId }, { isRated: isRated === true ? true : true }, { new: true });

  //     console.log("Rating : ", response);
  //     console.log("isRated : ", orderRatedStatus);

  //     setRating(0);      // Reset rating
  //     setReview("");      // Reset review
  //     setUsername("");    // Reset username
  //   } catch (error) {
  //     console.error(error);
  //     alert("Error submitting rating and review");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const url = `${process.env.REACT_APP_BACKEND_URL}/api/dishes/${id}/rate`;
        const orderUrl = `${process.env.REACT_APP_BACKEND_URL}/api/order/israted`;

        // Submit rating and review
        const response = await axios.post(url, { rating, review, username });

        // Update the order's rated status
        const orderRatedStatus = await axios.patch(orderUrl, {
            orderId,
            isRated: true // Explicitly set to true
        });

        console.log("Rating submitted:", response.data);
        console.log("Order rated status updated:", orderRatedStatus.data);

        // Reset form inputs
        setRating(0);
        setReview("");
        setUsername("");
    } catch (error) {
        console.error("Error submitting rating or updating order:", error);
        alert("Error submitting rating and review.");
    }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-6 pt-6 max-w-sm">
      <h2 className="text-2xl font-semibold text-center text-gray-800">Rate & Review This Dish</h2>

      {/* Star Rating */}
      <div className="flex justify-center space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={`text-3xl ${rating >= star ? 'text-yellow-500' : 'text-gray-300'} transition-colors duration-300 ease-in-out transform hover:scale-110`}
            aria-label={`Rate ${star} stars`}
          >
            ★
          </button>
        ))}
      </div>

      {/* Username Input */}
      <div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none transition-all duration-200"
          required
        />
      </div>

      {/* Review Textarea */}
      <div>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here..."
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500 transition-all duration-200"
          rows="4"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full bg-[--primary-color] hover:bg-[--secondary-color] text-white font-semibold py-3 rounded-md transition-all duration-300 transform hover:scale-105"
        >
          Submit Review
        </button>
      </div>

      {/* Display Submitted Rating */}
      {rating > 0 && (
        <p className="text-center text-gray-600 mt-4">
          You rated this dish {rating} {rating === 1 ? 'star' : 'stars'}.
        </p>
      )}
    </form>
  );
};

export default RateDish;

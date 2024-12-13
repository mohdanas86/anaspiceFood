import React, { useCallback, useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { toast } from "react-hot-toast";
import axios from "axios";

// Component for individual order details
const OrderCard = ({ order }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(order.status);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const updateOrderStatus = async (newStatus) => {
    setLoading(true);
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/order/status`;
      const response = await axios.patch(
        url,
        { status: newStatus, id: order._id },
        { new: true }
      );
      console.log(response);
      console.log(`Order ID: ${order._id} - Status updated to: ${newStatus}`);
      toast.success(`Order ID: ${order._id} - Status updated to: ${newStatus}`);
    } catch (error) {
      toast.error(`Failed to update order status`);
      console.error("Failed to update order status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStatus = async (newStatus) => {
    setStatus(newStatus);
    setIsDropdownOpen(false);
    await updateOrderStatus(newStatus);
  };

  return (
    <div
      key={order._id}
      className="border border-gray-200 rounded-xl p-6 shadow-lg bg-gradient-to-b from-white to-gray-50 space-y-4 flex-col flex justify-between"
    >
      <div className="flex flex-col w-full justify-center items-start">
        <div className="font-bold text-xl text-gray-800 mb-2 tracking-wide">
          Order ID:{" "}
          <span className="text-blue-600">
            {order._id.length > 0 ? order._id.substring(0, 15) : ""}
          </span>
        </div>

        <div className="text-gray-700 space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Name </span>
            <span className="font-semibold text-gray-800 ml-1">
              {order.name}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Status </span>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                id="dropdownDefaultButton"
                className="text-black font-medium rounded-lg text-sm px-0 py-2.5 text-center inline-flex items-center"
                type="button"
              >
                <span
                  className={`${status === "pending"
                    ? "text-[--primary-color]"
                    : status === "completed"
                      ? "text-[--price-color]"
                      : "text-red-500"
                    }`}
                >
                  {status}
                </span>
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div
                  id="dropdown"
                  className="z-10 bg-white divide-y divide-gray-100 rounded-lg text-black shadow w-44 absolute top-12"
                >
                  <ul
                    className="py-2 text-sm text-black shadow-lg"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    {["pending", "completed", "cancelled"].map(
                      (statusOption) => (
                        <li key={statusOption}>
                          <button
                            onClick={() => handleChangeStatus(statusOption)}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            {statusOption.charAt(0).toUpperCase() +
                              statusOption.slice(1)}
                          </button>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <span className="text-gray-600">Payment Method </span>
            <span className="font-semibold text-gray-800 ml-1">
              {order.shippingInfo.paymentMethod}
            </span>
          </div>

          <div className="flex justify-start items-start">
            <span className="text-gray-600">Address </span>
            <span className="font-semibold text-gray-800 ml-1">
              <span>{order.shippingInfo.address} </span>
              <span>{order.shippingInfo.city} </span>
              <span>{order.shippingInfo.zipCode}</span>
            </span>
          </div>
        </div>

        <h6 className="font-semibold text-gray-800 mt-6">Dishes Ordered</h6>
        <div className="space-y-4 w-full">
          {order.dishes.map((dish, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 bg-gray-100 rounded-lg shadow-sm"
            >
              {dish.image && (
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-16 h-16 object-cover rounded-md border border-gray-300"
                />
              )}
              <div>
                <p className="font-semibold text-gray-800">{dish.name}</p>
                <p className="text-gray-600">Quantity: {dish.quantity}</p>
                <p className="text-gray-600">Price: ₹{dish.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-xl">
        <span className="text-gray-600">Total Amount </span>
        <span className="font-bold ml-1">₹{order.totalAmount}</span>
      </div>
    </div>
  );
};

// Manage Order component
const ManageOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getOrders = useCallback(async () => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/all/orders`;
      const response = await axios.get(url);
      setOrders(response.data.data); // Adjust based on API response structure
      setLoading(false);
    } catch (err) {
      setError("Error fetching orders. Please try again.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <div className="w-full flex flex-col items-center py-6 min-h-screen relative">
      {loading && <Loader />}
      <div className="flex lg:pl-14 pl-4 w-full pb-4">
        <h1 className="text-2xl font-bold">Manage Orders</h1>
      </div>

      {orders.length > 0 ? (
        <div className="w-full lg:w-[80%] grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-6">No orders found.</p>
      )}
    </div>
  );
};

export default ManageOrder;

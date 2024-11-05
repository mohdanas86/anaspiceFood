import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMyContext } from "../context/useContext";

const Orders = () => {
  // const { user } = useMyContext();
  const [orders, setOrders] = useState(() => {
    const storedOrder = localStorage.getItem("orders");
    return storedOrder ? JSON.parse(storedOrder) : [];
  });

  const user = JSON.parse(localStorage.getItem("user"));
  
  const handleOrder = async () => {
    try {
      // const url = `http://localhost:3001/api/order/6723902ca32fa8c1026b0172`;
      const url = `http://localhost:3001/api/order/${user._id}`;
      console.log(url)
      const response = await axios.get(url);
      console.log("formattedOrders", response.data.data);
      setOrders(response.data.data); // Update the state with fetched orders
    } catch (err) {
      console.log("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    handleOrder();
  }, []);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  console.log("orders : ", orders);

  return (
    <div className="w-full flex flex-col items-center py-6 min-h-[59.5vh]">
      <h2 className="text-3xl font-semibold mb-6">Your Orders</h2>

      {orders.length > 0 ? (
        <div className="w-full max-w-[80%] grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4">
          {orders.map((order) => (
            // <div
            //   key={order._id}
            //   className="border rounded-lg p-4 shadow-md bg-white"
            // >
            //   <h5 className="font-semibold text-lg mb-2">Order ID: {order._id}</h5>

            //   <div className="text-gray-600 mb-2">
            //     <span>Name: </span>
            //     <span className="font-bold">{order.name}</span>
            //   </div>

            //   <div className="text-gray-600 mb-2">
            //     <span>Total Amount: </span>
            //     <span className="text-green-600 font-bold">₹{order.totalAmount}</span>
            //   </div>
            //   <div className="text-gray-600 mb-4">
            //     <span>Status: </span>
            //     <span
            //       className={`${order.status === "Delivered"
            //         ? "text-green-500"
            //         : "text-yellow-500"
            //         } font-medium`}
            //     >
            //       {order.status}
            //     </span>

            //     <div className="text-gray-600 mb-2">
            //       <span>Address: </span>
            //       <span className="font-bold">{order.shippingInfo.address}</span>
            //     </div>
            //     <div className="text-gray-600 mb-2">
            //       <span>payment Method: </span>
            //       <span className="font-bold">{order.shippingInfo.paymentMethod}</span>
            //     </div>
            //   </div>

            //   <h6 className="font-semibold mb-3">Dishes:</h6>
            //   <div className="space-y-4">
            //     {order.dishes.map((dish, index) => (
            //       <div
            //         key={index}
            //         className="flex items-start gap-4 bg-gray-50 p-3 rounded-lg"
            //       >
            //         {dish.image && (
            //           <img
            //             src={dish.image}
            //             alt={dish.name}
            //             className="w-16 h-16 object-cover rounded-lg"
            //           />
            //         )}
            //         <div>
            //           <p className="font-semibold text-gray-800">
            //             {dish.name}
            //           </p>
            //           <p className="text-gray-600">
            //             Quantity: {dish.quantity}
            //           </p>
            //           <p className="text-gray-600">Price: ₹{dish.price}</p>
            //         </div>
            //       </div>
            //     ))}
            //   </div>
            // </div>
            <div
              key={order._id}
              className="border border-gray-200 rounded-xl p-6 shadow-lg bg-gradient-to-b from-white to-gray-50 space-y-4 flex-col flex justify-between"
            >
              <div className="flex flex-col w-full justify-center items-start">
                <div
                  className="font-bold text-xl text-gray-800 mb-2 tracking-wide tooltip"
                  data-tip={order._id}
                >
                  Order ID:{" "}
                  <span className="text-blue-600">
                    {order._id.length > 0 ? order._id.substring(0, 15) : ""}
                  </span>
                </div>

                <div className="text-gray-700 space-y-1">
                  <div className="flex items-center">
                    <span className="text-gray-600">Name </span>
                    <span className="font-semibold text-gray-800 ml-1">
                      {order.name}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-gray-600">Status </span>
                    <span
                      className={`${
                        order.status === "Delivered"
                          ? "text-green-500"
                          : "text-[#ff7f50]"
                      } font-medium ml-1`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-gray-600">Payment Method </span>
                    <span className="font-semibold text-gray-800 ml-1">
                      {order.shippingInfo.paymentMethod}
                    </span>
                  </div>

                  <div className="flex  justify-start items-start">
                    <span className="text-gray-600">Address </span>
                    <span className="font-semibold text-gray-800 ml-1">
                      {order.shippingInfo.address}
                    </span>
                  </div>
                </div>

                <h6 className="font-semibold text-gray-800 mt-6">
                  Dishes Ordered
                </h6>
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
                        <p className="font-semibold text-gray-800">
                          {dish.name}
                        </p>
                        <p className="text-gray-600">
                          Quantity: {dish.quantity}
                        </p>
                        <p className="text-gray-600">Price: ₹{dish.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xl">
                <span className="text-gray-600">Total Amount </span>
                <span className=" font-bold ml-1">₹{order.totalAmount}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-6">No orders found.</p>
      )}
    </div>
  );
};

export default Orders;

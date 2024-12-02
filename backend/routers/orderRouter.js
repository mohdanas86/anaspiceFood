import express from "express";
import orderModel from "../models/orderModel.js";
import dishModel from "../models/dishModel.js";

const orderRouter = express.Router();

// ==== POST NEW ORDER ONLY FOR AMIN ====
orderRouter.post("/order", async (req, res) => {
    try {
        const data = req.body;
        const order = await orderModel.create(data);
        return res.status(200).json({
            message: "order created successful",
            data: order
        })
    } catch (err) {
        console.log(err)
    }
})

// ==== GET ORDER BY USER ID ====
orderRouter.get("/order/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find orders for the given userId and populate the dishes' details
        const orders = await orderModel.find({ userId: userId }).populate({
            path: "dishes.dishId",  // Path to populate
            model: dishModel,       // Name of the model as a string
            select: "name price image"  // Fields to include
        });

        // Log the fetched orders for debugging
        console.log("Fetched Orders:", JSON.stringify(orders, null, 2));

        // Format the orders to include dish details, name, and shippingInfo
        const formattedOrders = orders.map(order => ({
            _id: order._id,
            isRated: order.isRated,
            name: order.name,  // Customer's name
            shippingInfo: order.shippingInfo,  // Include shipping information
            totalAmount: order.totalAmount,
            status: order.status,
            dishes: order.dishes.map(dish => {
                if (dish.dishId) {
                    return {
                        dishId: dish.dishId._id,  // Fetch the dishId
                        quantity: dish.quantity,
                        name: dish.dishId.name,
                        price: dish.dishId.price,
                        image: dish.dishId.image
                    };
                } else {
                    // Handle the case where dishId is null
                    console.warn("Dish ID is null for quantity:", dish.quantity);
                    return {
                        dishId: null,
                        quantity: dish.quantity,
                        name: "Unknown",
                        price: 0,
                        image: null
                    };
                }
            })
        }));

        return res.status(200).json({
            message: "Orders fetched successfully",
            data: formattedOrders
        });
    } catch (err) {
        console.log("Error fetching orders:", err);
        return res.status(500).json({
            message: "Error fetching orders",
            error: err
        });
    }
});

// ==== GET ALL ORDER FOR ADMIN ONLY ====
orderRouter.get("/all/orders", async (req, res) => {
    try {
        // Note: `userId` is not used here. Remove or use it if necessary.
        const { userId } = req.params;

        // Fetch all orders
        const orders = await orderModel.find().populate("dishes.dishId");

        // Log the number of fetched orders
        console.log(`Fetched ${orders.length} orders.`);

        // Format orders to include the required details
        const formattedOrders = orders.map(order => ({
            _id: order._id,
            name: order.name, // Customer's name
            shippingInfo: order.shippingInfo, // Shipping details
            totalAmount: order.totalAmount,
            status: order.status,
            dishes: Array.isArray(order.dishes) ? order.dishes.map(dish => {
                if (dish.dishId) {
                    return {
                        dishId: dish.dishId._id,
                        quantity: dish.quantity,
                        name: dish.dishId.name,
                        price: dish.dishId.price,
                        image: dish.dishId.image
                    };
                } else {
                    // Handle null dishId
                    console.warn(`Dish ID is null for order ${order._id}, quantity: ${dish.quantity}`);
                    return {
                        dishId: null,
                        quantity: dish.quantity,
                        name: "Unknown",
                        price: 0,
                        image: null
                    };
                }
            }) : [] // Default to empty array if dishes is undefined
        }));

        // Respond with formatted orders
        return res.status(200).json({
            message: "Orders fetched successfully",
            data: formattedOrders
        });
    } catch (err) {
        // Log the error
        console.error("Error fetching orders:", err);

        // Respond with error message
        return res.status(500).json({
            message: "Error fetching orders",
            error: err.message || "Internal Server Error"
        });
    }
});

// ==== UPDATE ORDER STATUS ONLY FOR ADMIN
orderRouter.patch("/order/status", async (req, res) => {
    try {
        const { status, id } = req.body;
        const updateOrderStatus = await orderModel.findByIdAndUpdate(id, { status }, { new: true });
        console.log(updateOrderStatus);
        return res.status(200).json({
            message: "order status updated successfuly",
            data: updateOrderStatus
        })
    } catch (err) {
        console.log("UPDATE ORDER STATUS ERROR", err);
        // Respond with error message
        return res.status(500).json({
            message: "Error fetching orders",
            error: err.message || "Internal Server Error"
        });
    }
})

// ==== UPDATE ORDER ISRATED OR NOT ====
orderRouter.patch("/order/israted", async (req, res) => {
    try {
        const { isRated, orderId } = req.body; // Destructure request body
        if (typeof isRated !== "boolean" || !orderId) {
            return res.status(400).json({
                message: "Invalid input. 'isRated' must be a boolean and 'orderId' is required."
            });
        }

        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            { isRated },
            { new: true } // Return the updated document
        );

        if (!updatedOrder) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        console.log("Order updated successfully:", updatedOrder);
        return res.status(200).json({
            message: "Order rated status updated successfully",
            data: updatedOrder
        });
    } catch (err) {
        console.error("UPDATE RATED ORDER STATUS ERROR", err);
        return res.status(500).json({
            message: "Error updating order rated status",
            error: err.message || "Internal Server Error"
        });
    }
});



export default orderRouter

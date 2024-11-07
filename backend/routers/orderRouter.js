import express from "express";
import orderModel from "../models/orderModel.js";
import dishModel from "../models/dishModel.js";

const orderRouter = express.Router();

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



export default orderRouter

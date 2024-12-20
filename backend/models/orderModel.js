import mongoose from "mongoose";
import userModel from "./userModel.js";
import dishModel from "./dishModel.js";

// ORDER SCHEMA
const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel, // Reference to the User model
        required: true
    },
    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        },
        paymentMethod: {
            type: String,
            enum: ["Credit Card", "PayPal"],  // Example payment methods
            required: true
        }
    },
    dishes: [{
        dishId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: dishModel, // Reference to the Dish model
        },
        quantity: {
            type: Number,
            min: 1 // Ensure minimum quantity is 1
        }
    }],
    totalAmount: {
        type: Number,
        required: true,
        min: 0 // Ensure total amount is non-negative
    },
    isRated: {
        type: Boolean,
        enum: [true, false],
        default: false
    },
    status: {
        type: String,
        enum: ["pending", "completed", "cancelled"], // Limit to specific statuses
        default: "pending"
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt timestamps
});

// ORDER MODEL
const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;

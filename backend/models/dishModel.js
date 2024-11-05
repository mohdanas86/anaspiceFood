import mongoose from "mongoose";

// DISH SCHEMA
const dishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    image: {
        type: String
    },
    ingredients: [{
        type: String
    }],
    rating: {
        type: Number,
        default: 0
    },
    ratingsCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// DISH MODEL
const dishModel = mongoose.model("dish", dishSchema);
export default dishModel;
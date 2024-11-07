import mongoose from "mongoose";

// Nutritional Information Schema
const nutritionalInfoSchema = new mongoose.Schema({
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    fat: { type: Number, required: true },
    carbohydrates: { type: Number, required: true }
});

// Review Schema
const reviewSchema = new mongoose.Schema({
    user: { type: String, required: true },  // e.g., user ID or username
    rating: { type: Number, required: true, min: 0, max: 5 },  // Rating for the review
    comment: { type: String, required: true },  // The actual review text
    createdAt: { type: Date, default: Date.now }  // Timestamp for the review
});

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
        type: Number, // Changed to Number for better price handling
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
    preparation_time: {
        type: String // e.g., "15 minutes"
    },
    allergens: [{
        type: String // e.g., ["gluten", "sesame"]
    }],
    tags: [{
        type: String // e.g., ["vegetarian", "healthy"]
    }],
    nutritional_info: nutritionalInfoSchema, // Embedding nutritional information
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5 // Adding constraints for rating
    },
    ratingsCount: {
        type: Number,
        default: 0
    },
    reviews: [reviewSchema],  // Adding reviews as an array of review objects
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// DISH MODEL
const dishModel = mongoose.model("dish", dishSchema);
export default dishModel;

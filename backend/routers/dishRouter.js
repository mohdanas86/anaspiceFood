import express from "express";
import dishModel from "../models/dishModel.js";

const dishRouter = express.Router();

dishRouter.get("/dishes", async (req, res) => {
    try {
        // const data = req.body;
        const dish = await dishModel.find()
        return res.status(200).json({
            message: "dishes",
            data: dish
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "geting dish error",
            error: err
        });
    }
})

// GET specific dish by ID
dishRouter.get("/dishes/:id", async (req, res) => {
    try {
        const { id } = req.params; // Destructure the id from params
        console.log("dish id", id);

        // Find the dish by ID
        const dish = await dishModel.findById(id); // Use findById for searching by ID

        if (!dish) {
            return res.status(404).json({
                message: "Dish not found"
            });
        }

        return res.status(200).json({
            message: "Dish retrieved successfully",
            data: dish
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Error retrieving dish",
            error: err.message // Return a more user-friendly error message
        });
    }
});

dishRouter.post("/newdish", async (req, res) => {
    try {
        const data = req.body;
        const dish = await dishModel.create(data);
        return res.status(200).json({
            message: "new dish added",
            dish: dish
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "dish adding error",
            error: err
        });
    }
})

// The route for rating a dish
dishRouter.post('/dishes/:id/rate', async (req, res) => {
    const { id } = req.params;
    const { rating, review, username } = req.body;

    console.log("Rating Dish:", id, rating, review);

    try {
        // Validate rating
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: 'Rating must be between 1 and 5' });
        }

        // Validate review
        if (!review || review.trim() === "") {
            return res.status(400).json({ error: 'Review text is required' });
        }

        // Find the dish by its ID
        const dish = await dishModel.findById(id);
        if (!dish) {
            return res.status(404).json({ error: 'Dish not found' });
        }

        // Initialize ratingsCount if it's not already set
        if (!dish.ratingsCount) {
            dish.ratingsCount = 0;
        }

        // Calculate the new average rating
        const totalRating = dish.rating * dish.ratingsCount + rating;
        dish.ratingsCount += 1;
        dish.rating = totalRating / dish.ratingsCount;

        // Add the new review to the reviews array
        dish.reviews.push({
            rating,
            comment: review,
            user: username || 'Anonymous' // Set a default user or use a user ID if available
        });

        // Save the updated dish
        await dish.save();

        return res.status(200).json({
            message: 'Rating and review added successfully',
            dish: dish // Return the updated dish with new rating and review
        });

    } catch (error) {
        console.error("Error while rating dish:", error); // Log the error for better debugging
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// catogery
dishRouter.get("/category", async (req, res) => {
    const category = req.query.category;  // Access the category query parameter

    try {
        // If category is provided, filter dishes by category
        const query = category && category !== "All" ? { category } : {};
        // Use the category in the query object

        const dishes = await dishModel.find(query);  // Fetch the dishes using the query

        if (!dishes || dishes.length === 0) {
            return res.status(404).json({ message: 'No dishes found' });
        }

        return res.json(dishes);  // Return the dishes if found
    } catch (error) {
        console.error('Error retrieving dishes:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});


export default dishRouter;